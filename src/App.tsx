import { useEffect, useRef, useState } from 'react';
import { Stock, Symbol, symbols } from './types/types';
import StockList from './components/StockList';
import axios, { AxiosResponse } from 'axios';

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [symbol, setSymbol] = useState<Symbol>('AAPL');
  const [subscribedSymbols, setSubscribedSymbols] = useState<Symbol[]>([]);
  const socketRef = useRef<WebSocket>();
  const isSubscribed = useRef<boolean>();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws/mock-data');
    socketRef.current = socket;

    socket.onmessage = (event) => {
      if (event.data === 'heartbeat') {
        return;
      }
      if (event.data.startsWith('unsubscribe:')) {
        // unsubscribe
      }
      if (event.data.startsWith('subscribe:')) {
        // subscribe
      }
      console.log(event.data);
    };

    return () => socket.close();
  }, []);

  function subscribe() {
    socketRef.current?.send(`subscribe:${symbol}`);
  }

  function unsubscribeFrom(symbol: Symbol) {
    socketRef.current?.send(`unsubscribe:${symbol}`);
  }

  useEffect(() => {
    axios.get('/stocks').then((res: AxiosResponse<Stock[]>) => {
      setStocks(res.data);
    });
  }, []);

  return (
    <>
      <h1>Fundamentals</h1>
      {/* <input onChange={(e) => setSymbol(e.target.value)} /> */}
      <button onClick={subscribe}>Subscribe</button>
      <StockList stocks={stocks} />
    </>
  );
}

export default App;
