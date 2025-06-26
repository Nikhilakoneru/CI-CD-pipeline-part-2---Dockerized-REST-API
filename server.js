const express = require('express');
const app = express();

app.use(express.json());

let items = [];
let nextId = 1;

app.get('/items', (req, res) => {
  res.status(200).json(items);
});

app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'not found' });
  }
  res.status(200).json(item);
});

app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name required' });
  }
  
  const item = {
    id: nextId++,
    name
  };
  
  items.push(item);
  res.status(201).json(item);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  
  if (idx === -1) {
    return res.status(404).json({ error: 'not found' });
  }
  
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name required' });
  }
  
  items[idx] = { id, name };
  res.status(200).json(items[idx]);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  
  if (idx === -1) {
    return res.status(404).json({ error: 'not found' });
  }
  
  items.splice(idx, 1);
  res.status(200).json({ message: 'deleted' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('running on port ' + PORT);
  });
}

module.exports = app;