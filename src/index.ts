import express from 'express';
import cors from 'cors';
import { getDiagnoses } from './models/Diagnose';
import { getPatientsNoSsn } from './models/Patient';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  const diagnoses = getDiagnoses();
  res.send(diagnoses);
});

app.get('/api/patients', (_req, res) => {
  const patients = getPatientsNoSsn();
  res.send(patients);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});