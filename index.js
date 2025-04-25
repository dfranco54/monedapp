import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.static('public'));
const PORT = 3000;

const API_KEY = process.env.EXCHANGE_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

app.get('/', (req, res) => {
  res.send('Bienvenido al conversor de monedas.');
});

app.get('/convert', async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'Faltan parámetros: from, to, amount' });
  }

  try {
    const url = `${BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.result === 'success') {
      return res.json({
        from,
        to,
        amount: Number(amount),
        result: data.conversion_result,
        rate: data.conversion_rate,
      });
    } else {
      return res.status(500).json({ error: 'Error en la conversión', details: data['error-type'] });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error en el servidor', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});