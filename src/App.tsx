import { useEffect, useMemo, useState } from 'react';
import { Note, WatchedStock } from './types/types';
import StockList from './components/StockList';
import axios, { AxiosResponse } from 'axios';

function getStocksListFromNotes(notes: Note[]) {
  const stocks: WatchedStock[] = [];
  const map = new Map<string, number>();
  notes = notes.sort((a, b) => Number(b.date) - Number(a.date));

  notes.forEach((note) => {
    const i = map.get(note.symbol);
    if (i) {
      stocks[i].notes.push(note);
    } else {
      const l = stocks.length;
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
      map.set(note.symbol, l);
    }
  });

  return stocks;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    axios.get('/notes').then((res: AxiosResponse<Note[]>) => {
      setNotes(res.data);
    });
  }, []);

  const watchedStocks = useMemo(() => {
    return getStocksListFromNotes(notes);
  }, [notes]);

  console.log(notes);

  return (
    <main className='flex flex-row space-x-4 bg-blue-50 p-4'>
      <StockList stocks={watchedStocks} />
      <div className='flex-1 rounded-md bg-white'>'add stock...'</div>
    </main>
  );
}

export default App;
