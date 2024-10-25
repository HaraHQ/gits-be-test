import { Router } from "express";
import { AppDataSource } from "../lib/datasource";
import { Patient } from "../models";
import { getPatient } from "../lib/fns";

const r = Router();

/**
 * maen nya gini:
 * database oracle itu simpan data pribadi <=> api SS buat integrasi data pasien dan tindakan dan setelahnya
 */

r.get("/search", async (req, res) => {
  /**
   * ini untuk search data pasien, filter nya nik
   * kalo ada nik nya munculin data pasien
   * kalo gak ada kasih notif, pasien belum terdaftar
   */
  // ini panggil data dari ss
  const { nik } = req.query;

  const data = await getPatient(nik as string);

  res.status(200).json({ data });
});

r.get("/", async (req, res) => {
  /**
   * ini untuk dapetin list dari pasien yang terdaftar di rs berdasarkan konfig, bisa search name, nik, tanggal lahir; ada pagination
   */
  const data = await AppDataSource.getRepository(Patient)
    .createQueryBuilder("patient")
    .getMany();

  res.status(200).json({ data });
});

r.get("/:id", async (req, res) => {
  /**
   * ini untuk dapetin detail dari pasien
   */
  const data = await AppDataSource.getRepository(Patient)
    .createQueryBuilder("patient")
    .where(`patient.id = ${req.query.id}`)
    .getOne();

  if (!data) {
    res.status(201).json({ message: "Patient not found", code: "P0" });
  } else {
    res.status(200).json({ data, code: "P1" });
  }
});

r.post("/", async (req, res) => {
  /**
   * ini untuk ngebuat pasien baru
   */
  const {
    name,
    gender,
    birthdate,
    nik,
    photo_url,
    config_id,
    phone,
    address,
    address_city,
    address_postal,
    marital,
    relative,
    relative_phone,
    birthplace,
  } = req.body;

  const dob = new Date(birthdate).toISOString();

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Patient)
    .values({
      name,
      gender,
      birthdate: dob,
      nik: parseInt(nik),
      photo_url: "/dummy.png",
      config_id: `${config_id}`,
      ss_id: "1",
      phone,
      address,
      address_city,
      address_postal,
      marital,
      relative,
      relative_phone,
      birthplace,
    })
    .execute();

  res.status(200).json({ message: "Patient created" });
});

r.put("/:id", async (req, res) => {
  /**
   * ini untuk update pasien
   */
  const {
    name,
    gender,
    birthdate,
    nik,
    photo_url,
    config_id,
    phone,
    address,
    address_city,
    address_postal,
    marital,
    relative,
    relative_phone,
    birthplace,
  } = req.body;

  await AppDataSource.createQueryBuilder()
    .update(Patient)
    .where(`id = ${req.query.id}`)
    .where(`config_id = ${config_id}`)
    .set([
      {
        name,
        gender,
        birthdate,
        nik,
        photo_url,
        phone,
        address,
        address_city,
        address_postal,
        marital,
        relative,
        relative_phone,
        birthplace,
      },
    ])
    .execute();

  res.status(200).json({ message: "Patient updated" });
});

r.patch("/:id/sync", (req, res) => {
  /**
   * ini untuk sync pasien
   */
  res.send("Config page get detail value");
});

export default r;
