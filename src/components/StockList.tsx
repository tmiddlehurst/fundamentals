import { WatchedStock } from '../types/types';
import StockListItem from './StockListItem';

export default function StockList({
  stocks,
  setSelectedStock,
}: {
  stocks: WatchedStock[];
  setSelectedStock: (symbol: string) => void;
}) {
  return (
    <div className='rounded-md bg-white flex-1'>
      <div>filter controls</div>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Latest</th>
            <th>Target</th>
            <th>Confidence</th>
            <th>Follow-Up Date</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s: WatchedStock, i) => (
            <StockListItem
              key={i}
              stock={s}
              setSelectedStock={setSelectedStock}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
