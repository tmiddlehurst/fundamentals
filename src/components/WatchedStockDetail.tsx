import { WatchedStock } from '../types/types';

export default function WatchedStockDetail({ stock }: { stock: WatchedStock }) {
  return <div className='flex-1 rounded-md bg-white'>{stock.name}</div>;
}
