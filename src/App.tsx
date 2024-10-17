import { useState } from 'react';

function App() {
  console.log('app rendered');

  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Fundamentals</h1>
    </>
  );
}

export default App;
