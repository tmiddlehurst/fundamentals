import { useEffect, useState } from 'react';
import { WatchedStock } from '../types/types';
import axios from 'axios';

export default function StockListItem({
  stock,
  setSelectedStock,
}: {
  stock: WatchedStock;
  setSelectedStock: (symbol: string) => void;
}) {
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    axios
      .get('/market-data/price', { params: { symbol: stock.symbol } })
      .then((res) => {
        setPrice(res.data.price);
      });
  }, []);

  return (
    <tr
      role='button'
      className=''
      onClick={() => setSelectedStock(stock.symbol)}
    >
      <td>{stock.symbol}</td>
      <td>{stock.name}</td>
      <td>{price}</td>
      <td>{stock.priceTarget}</td>
      <td>{stock.confidence}</td>
      <td>{stock.followUpDate?.toString()}</td>
    </tr>
  );
}
