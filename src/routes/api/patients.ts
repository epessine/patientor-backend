import express from "express";
import {
  getPatientsNoSsn,
  addPatient,
  toPatientEntry,
  getSinglePatient,
  toEntryEntry,
  addEntry
} from "../../services/patientService";

const Router = express.Router();

Router.get("/", (_req, res) => {
  const patients = getPatientsNoSsn();
  res.send(patients);
});

Router.get("/:id", (req, res) => {
  const id = req.params.id;
  try {
    const patient = getSinglePatient(id);
    res.send(patient);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

Router.post("/", (req, res) => {
  try {
    const parsedEntry = toPatientEntry(req.body);
    const newPatient = addPatient(parsedEntry);
    res.json(newPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

Router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  try {
    const parsedEntry = toEntryEntry(req.body);
    const updatedPatient = addEntry(parsedEntry, id);
    res.json(updatedPatient);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default Router;
