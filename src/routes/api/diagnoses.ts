import express from 'express';
import { getDiagnoses } from '../../services/diagnoseService';

const Router = express.Router();

Router.get('/', (_req, res) => {
  const diagnoses = getDiagnoses();
  res.send(diagnoses);
});

export default Router;