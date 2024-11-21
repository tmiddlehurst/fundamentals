import { useEffect, useState } from 'react';
import { WatchedStock } from '../types/types';
import axios from 'axios';

// function isInPast(date: Date | undefined): boolean {
//   return typeof date === 'string';
// }

export default function StockListItem({ stock }: { stock: WatchedStock }) {
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    axios
      .get('/market-data/price', { params: { symbol: stock.symbol } })
      .then((res) => {
        setPrice(res.data.price);
      });
  }, []);

  return (
    <tr className=''>
      <td>{stock.symbol}</td>
      <td>{stock.name}</td>
      <td>{price}</td>
      <td>{stock.priceTarget}</td>
      <td>{stock.confidence}</td>
      <td>{stock.followUpDate?.toString()}</td>
    </tr>
  );
}
