import { useCallback, useEffect, useRef, useState } from 'react';

// export type SocketMessage = { type: 'SUBSCRIBE' | 'UNSUBSCRIBE'; data: object };
const readyStates = ['UNKNOWN', 'OFFLINE', 'ONLINE', 'CONNECTING'] as const;
type ReadyState = (typeof readyStates)[number];

export default function useWebsocket(url: string, shouldReconnect: boolean) {
  const [readyState, setReadyState] = useState<ReadyState>('UNKNOWN');
  const [retryCount, setRetryCount] = useState(0);
  const [latestMessage, setLatestMessage] = useState('');
  const wsRef = useRef<WebSocket>();

  // TODO: do i need a dependency here... is the value of wsRef.current closed in here so would be stale if a new ws is instantiated?
  const sendMessage = useCallback(
    (data: string) => wsRef.current?.send(data),
    []
  );

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.addEventListener('open', () => console.log('OPEN'));
    ws.addEventListener('message', (e) => {
      console.log('MESSAGE');
      setReadyState('ONLINE');
      setLatestMessage(e.data);
    });
    ws.addEventListener('close', () => {
      console.log('CLOSE');
      setReadyState('OFFLINE');
    });
    ws.addEventListener('error', () => {
      console.log('ERROR');
      if (shouldReconnect) {
        setTimeout(() => {
          setReadyState('CONNECTING');
          setRetryCount((n) => n + 1);
        }, 5000);
      }
    });
    return () => ws.close();
  }, [url, retryCount]);

  return [readyState, latestMessage, sendMessage];
}
