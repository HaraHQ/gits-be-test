import { Router } from "express";
import { AppDataSource } from "../lib/datasource";
import { Practitioner } from "../models";

const r = Router();

/**
 * maen nya gini:
 * database oracle itu simpan data pribadi <=> api SS buat integrasi data pasien dan tindakan dan setelahnya
 */

r.get("/", async (req, res) => {
  /**
   * dapetin list dokter, filter nya adalah module=jenis_layanan
   */
  const data = await AppDataSource.getRepository(Practitioner)
    .createQueryBuilder("practitioner")
    .getMany();

  res.status(200).json({ data })
});

r.get("/:id", (req, res) => {
  /**
   * ini untuk dapetin detail dari dokter
   */
  res.send("Config page get detail value");
});

r.post("/", (req, res) => {
  /**
   * ini untuk ngebuat dokter baru
   */
  res.send("Config page get detail value");
});

r.put("/:id", (req, res) => {
  /**
   * ini untuk update dokter
   */
  res.send("Config page get detail value");
});

export default r;