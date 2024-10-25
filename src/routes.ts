import { Router } from "express";
import ConfigController from "../src/controllers/config";
import ServicesController from "../src/controllers/services";
import EncounterController from "../src/controllers/encounters";
import MedicationController from "../src/controllers/medications";
import PatientController from "../src/controllers/patients";
import PractitionerController from "../src/controllers/practitioners";
import TreatmentController from "../src/controllers/treatments";

const r = Router();

r.use('/config', ConfigController);
r.use('/services', ServicesController);
r.use('/encounters', EncounterController);
r.use('/medications', MedicationController);
r.use('/patients', PatientController);
r.use('/practitioners', PractitionerController);
r.use('/treatments', TreatmentController);

export default r;