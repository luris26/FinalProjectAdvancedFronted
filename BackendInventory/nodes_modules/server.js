const express = require('express');
const app = express();
const port = 3001;
const ordersRouter = require('./routes/orders');

app.use(express.json());

app.use('/orders', ordersRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
