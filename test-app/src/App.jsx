import { useState } from 'react'
import './App.css'

function App() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  function validate(v) {
    if (v == '' || v.length > 15) return false;
    for (let i = 0; i < v.length; i++) {
      if (v[i] < '0' || v[i] > '9') return false;
    }
    return true;
  }

  async function generate(type) {
    setError('');
    setResult('');
    if (!validate(number)) {
      setError;
      return;
    }

    const res = await fetch('http://localhost:5000/api/' + type, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ number }),
    });

    const data = await res.json();
    if (res.ok) setResult(data.result);
    else setError(data.message);
  }

  return (
    <div style = {{margin: 40}}>
      <input placeholder='Input Angka' value={number} onChange={(e) => setNumber(e.target.value)} />
      <p style={{ color: 'red'}}>{error}</p>
      <button onClick={() => generate('triangle')}>Generate segitiga</button>
      <button onClick={() => generate('odd')}>Generate Bilangan Ganjil</button>
      <button onClick={() => generate('prime')}>Generate Bilangan Prima</button>
      <h2>Result:</h2>
      <pre style={{ whiteSpace: 'pre-wrap'}}>{result}</pre>
    </div>
  );
}

export default App
