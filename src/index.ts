import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import patientsRouter from './routes/api/patients';
import diagnosesRouter from './routes/api/diagnoses';

const result = dotenv.config();
if (result.error) throw result.error;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/patients', patientsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});