import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt, { expressjwt } from "express-jwt";
import jwks from "jwks-rsa";
import "reflect-metadata"

import { AppDataSource } from "./lib/datasource";
import Routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['user_id', 'Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as jwt.GetVerificationKey,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
})

// app.get("/", async (req: Request, res: Response) => {
//   try {
//     const token = await getAuthToken();
  
//     const getPatient = async () => {
//       const url = process.env.SS_STAGING + '/Patient?identifier=https://fhir.kemkes.go.id/id/nik|3671091009860011';
//       const { data, status } = await axios.get(url, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + token
//         }
//       });
  
//       return data;
//     }
  
//     // const pasien = await getPatient();
  
//     const getPractitioner = async () => {
//       const url = process.env.SS_STAGING + '/Practitioner/10018452434';
//       const { data, status } = await axios.get(url, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + token
//         }
//       });
  
//       return data;
//     }
  
//     const praktisi = await getPractitioner();
  
//     res.json({
//       praktisi
//     });
  
//   } catch (error) {
//     res.json({
//       error
//     });
//   }
// });

app.use("/v1", Routes);

export const appDataSource = AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});