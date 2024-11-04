import { Stock } from '../types/types';
import StockListItem from './StockListItem';

export default function StockList({ stocks }: { stocks: Stock[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Latest</th>
          <th>Target</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((s: Stock, i) => (
          <StockListItem key={i} stock={s} />
        ))}
      </tbody>
    </table>
  );
}
