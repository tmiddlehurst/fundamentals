import { useState } from 'react';
import { Note } from '../types/generated';
import { format } from '../utils/utils';

export default function Notes(props: { symbol: string; notes: Note[] }) {
  const [selectedNote, setSelectedNote] = useState(props.notes[0]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const visibleNotes = props.notes.slice(start, end);
  // const
  return (
    <div className='flex-1 overflow-hidden'>
      <h3>{props.notes[0].symbol}</h3>
      <div className='flex overflow-hidden'>
        {visibleNotes.map((n: Note) => (
          <button
            className='flex-grow-1 overflow-ellipsis overflow-hidden text-xs whitespace-nowrap p-2'
            onClick={() =>
              setSelectedNote(props.notes.find((n2) => n2.id == n.id))
            }
          >
            <span className=''>{format(n.date)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
