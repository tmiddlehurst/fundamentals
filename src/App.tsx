import { useEffect, useMemo, useState } from 'react';
import { Note, WatchedStock } from './types/types';
import StockList from './components/StockList';
import axios, { AxiosResponse } from 'axios';
import WatchedStockDetail from './components/WatchedStockDetail';

function getStocksListFromNotes(notes: Note[]) {
  if (notes.length == 0) {
    return [];
  }
  const stocks: WatchedStock[] = [];
  const map = new Map<string, number>();
  notes = notes.sort((a, b) => Number(b.date) - Number(a.date));
  notes.forEach((note) => {
    const i = map.get(note.symbol);
    if (i !== undefined) {
      stocks[i].notes.push(note);
    } else {
      const l = stocks.length;
      map.set(note.symbol, l);
      const watchedStock: WatchedStock = {
        name: note.name,
        symbol: note.symbol,
        followUpDate: note.followUpDate,
        notes: [note],
        lastUpdate: note.date,
        priceTarget: note.priceTarget,
        confidence: note.confidence,
      };
      stocks.push(watchedStock);
    }
  });

  return stocks;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>();

  useEffect(() => {
    axios.get('/notes').then((res: AxiosResponse<{ notes: Note[] }>) => {
      if (res.data.notes) {
        setNotes(res.data.notes);
      } else {
        setNotes([]);
      }
    });
  }, []);

  const watchedStocks = useMemo(() => {
    return getStocksListFromNotes(notes);
  }, [notes]);

  const watchedStock = watchedStocks.find(
    (stock: WatchedStock) => stock.symbol === selectedStock
  );

  return (
    <main className='grid grid-cols-2 space-x-4 bg-blue-50 p-4'>
      <StockList
        stocks={watchedStocks}
        setSelectedStock={(stock: string) => setSelectedStock(stock)}
      />
      {watchedStock ? (
        <WatchedStockDetail stock={watchedStock} />
      ) : (
        <div className='flex-1 rounded-md bg-white'>Select A stock...</div>
      )}
    </main>
  );
}

export default App;
