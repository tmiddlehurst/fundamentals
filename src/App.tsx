import { useEffect, useRef, useState } from 'react';
import { Stock } from './types/types';
import StockList from './components/StockList';

function App() {
  const [symbol, setSymbol] = useState('');
  // const [stocks, setStocks] = useState<Stock[]>([]);

  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws/mock-data');
    socketRef.current = socket;

    socket.onmessage = (event) => {
      console.log(event.data);
    };

    return () => socket.close();
  }, []);

  function subscribe() {
    socketRef.current?.send(`subscribe:${symbol}`);
  }

  // useEffect(() => {
  //   axios.get('/stocks').then((res: AxiosResponse<Stock[]>) => {
  //     setStocks(res.data);
  //   });
  // }, []);

  return (
    <>
      <h1>Fundamentals</h1>
      <input onChange={(e) => setSymbol(e.target.value)} />
      <button onClick={subscribe}>Subscribe</button>
      <StockList stocks={stocks} />
    </>
  );
}

export default App;
