import express from "express"; 
import {createClient} from "redis"

const client = createClient({
  url: 'redis://redis:6379',
  
});

client.on("error", err => console.log("Redis Client Error", err))
await client.connect();

const app = express();
app.use(express.json());

app.post('/todos', async (req, res) => {
  const { todo } = req.body;
  const id = await client.incr('id');
  await client.hSet(`todo:${id}`, 'text', todo, 'completed', false);
  res.status(201).send({ id, todo, completed: false });
});

// app.get('/todos', async (req, res) => {
//   const keys = await client.keys('todo:*');
//   const todos = await Promise.all(keys.map(key => client.hGetAll(key)));
//   res.status(200).send(todos);
// });
app.get('/todos', async (req, res) => {
    try {
      const keys = await client.keys('todo:*');
      const todos = await Promise.all(keys.map(async (key) => {
        const id = key.split(':')[1]; // Extract ID from key
        const todo = await client.hGetAll(key);
        return { id, ...todo }; // Combine ID with todo object
      }));
      res.status(200).send(todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });
  
app.put('/todos/:id', async (req, res) => {
  const { todo, completed } = req.body;
  await client.hSet(`todo:${req.params.id}`, 'text', todo, 'completed', completed);
  res.status(200).send({ id: req.params.id, todo, completed });
});

app.delete('/todos/:id', async (req, res) => {
  await client.del(`todo:${req.params.id}`);
  res.status(204).send();
});

app.get('/_health', (req, res) => {
    res.json({ message: 'ok' });
  });
  

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
