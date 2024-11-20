import { useState } from 'react';
import { Stock, Symbol } from './types/types';
import StockList from './components/StockList';

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [symbol, setSymbol] = useState<Symbol>('AAPL');

  // useEffect(() => {
  //   axios.get('/stocks').then((res: AxiosResponse<Stock[]>) => {
  //     setStocks(res.data);
  //   });
  // }, []);

  return (
    <>
      <h1>Fundamentals</h1>
      <StockList stocks={stocks} />
    </>
  );
}

export default App;
