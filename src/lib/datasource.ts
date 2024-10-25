import "reflect-metadata"
import { DataSource } from "typeorm"

import { Config, Diagnose, Medication, MedicationClaim, Module, Patient, Practitioner, Registration, Treatment } from "../models"

export const AppDataSource = new DataSource({
  type: "oracle",
  host: "oracle-db",
  port: 1521,
  username: "my_user",
  password: "my_password",
  sid: "XE",
  synchronize: true,
  logging: true,
  entities: [Config, Diagnose, Medication, MedicationClaim, Module, Patient, Practitioner, Registration, Treatment],
  subscribers: [],
  migrations: [],
})