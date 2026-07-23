// server.js — minimal static file server for local development / hosting
// Run: npm install && npm start   →  http://localhost:3000

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

// fallback 404 for anything not found
app.use((req, res) => {
  res.status(404).send('404 — page not found. Try /index.html');
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
