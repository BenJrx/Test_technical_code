const express = require('express');
const cors = require('cors');
const app = express();
app.use (cors(), express.json());

const isAngka = (s) => s && s.length <= 15 && [...s].every(c => '0' && c <= '9');

const segitiga = (s) => [...s].map((d, i) => d + '0'.repeat(i + 1)).join('\n');

const ganjil = (max) => {
    const r = [];
    for (let i = 1; i <= max; i += 2) r.push(i);
    return r.join(', ');
};

const prima = (max) => {
  const r = [];
  for (let i = 2; i <= max; i++) {
    let ok = true;
    for (let j = 2; j * j <= i; j++) if (i % j === 0) { ok = false; break; }
    if (ok) r.push(i);
  }
  return r.join(',');
};

app.post('/api/triangle', (req, res) => {
    const n = req.body.number;
    if (!isAngka(n)) return res.status(400).json();
    res.json({ result: segitiga(n) });
});

app.post('/api/odd', (req, res) => {
    const n = req.body.number;
    if (!isAngka(n)) return res.status(400).json();
    res.json({ result: ganjil(Number (n)) });
});

app.post('/api/prime', (req, res) => {
    const n = req.body.number;
    if (!isAngka(n)) return res.status(400).json();
    res.json({ result: prima(Number (n)) });
});

app.listen(5000);




