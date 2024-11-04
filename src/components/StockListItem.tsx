import { useContext, useEffect, useState } from 'react';
import { Price, Stock } from '../types/types';
import { AxiosApiContext } from '../context/AxiosApi';

function isInPast(date: Date | undefined): boolean {
  return typeof date === 'string';
  // TODO: how to compare Dates in javascript
}

export default function StockListItem({ stock }: { stock: Stock }) {
  // const axiosApi = useContext(AxiosApiContext);
  const [price, setPrice] = useState<string>();

  const lastestNote = stock.notes.length > 0 ? stock.notes[0] : undefined;
  const lastUpdate =
    lastestNote !== undefined ? stock.notes[0].date : undefined;
  const followUpDate =
    lastestNote !== undefined ? stock.notes[0].followUpDate : undefined;
  const target =
    lastestNote !== undefined ? stock.notes[0].priceTarget : undefined;
  const pastFollowUp = isInPast(followUpDate);

  // useEffect(() => {
  //   axiosApi.getStockPrice(stock.symbol, 'foo').then((res: Price) => {
  //     setPrice(res.price);
  //   });
  // }, []);

  return (
    <tr className=''>
      <td>{stock.symbol}</td>
      <td>{stock.name}</td>
      <td>{price ? price : '...'}</td>
      <td>{target}</td>
      {/* <td>{followUpDate && followUpDate}</td> */}
      {/* {stock.notes[0]} */}
      {/* <p>{stock}</p> */}
    </tr>
  );
}
