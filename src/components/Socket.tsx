import { useState } from 'react';
import useWebsocket from '../hooks/UseWebsocket';

export default function Socket() {
  const [symbol, setSymbol] = useState('msft');
  const [readyState, latestMessage, sendMessage] = useWebsocket(
    'ws://localhost:8080/ws/mock-data',
    true
  );

  function subscribe() {
    sendMessage(`SUBSCRIBE:${symbol}`);
    // socketRef.current?.send(`subscribe:${symbol}`);
  }

  function unsubscribeFrom(symbol: Symbol) {
    sendMessage(`UNSUBSCRIBE:${symbol}`);
  }

  return {
    /* <button disabled={wsConnectionError.length > 0} onClick={subscribe}>
      Subscribe
      </button> */
  };
}
