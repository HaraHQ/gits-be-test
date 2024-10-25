import { Router } from "express";

import { Config, Module } from "../models";
import { AppDataSource } from "../lib/datasource";

const r = Router();

/**
 * maen nya gini:
 * database oracle itu simpan data pribadi <=> api SS buat integrasi data pasien dan tindakan dan setelahnya
 */

r.get("/", async (req, res) => {
  /**
   * ceritanya nanti didatabase user ini belum punya RS
   * harus daftar dulu rumahsakit nya
   * kalo udah daftar dan validasi dari API ini baru bisa update bagian layanan
   */
  const data = await AppDataSource.getRepository(Config)
    .createQueryBuilder("config")
    .where(`config.user_id = '${req.headers.user_id}'`)
    .getOne();

  console.log("DATA", data);

  if (!data) {
    res.status(201).json({
      message: "User not found",
      code: "C0",
    });
  } else {
    res.status(200).json({
      message: "User found",
      code: "C1",
      data,
    });
  }
});

r.post("/", (req, res) => {
  /**
   * ini untuk daftar rumah sakit
   */
  const { name, address } = req.body;
  const { user_id } = req.headers;

  const create = AppDataSource.createQueryBuilder()
    .insert()
    .into(Config)
    .values({
      hospital_name: name as string,
      hospital_address: address,
      user_id: user_id as string,
    })
    .execute();

  console.log('CREATE', create);

  res.send("New merchant registered");
});

r.put("/", (req, res) => {
  /**
   * ini untuk update detail rumah sakit (dengan kondisi udah terdaftar di SS)
   */
  res.send("Config page after update value");
});

r.get("/modules", async (req, res) => {
  /**
   * ini untuk ngedapetin aktif module (misal module klinik gigi, klinik jantung)
   */
  const data = await AppDataSource.getRepository(Module)
    .createQueryBuilder("module")
    .getMany();

  console.log("DATA", data);

  if (!data.length) {
    res.status(201).json({
      message: "No module found or activated",
      code: "M0",
    });
  } else {
    res.status(200).json({
      message: "Module(s) found",
      code: "M1",
      data,
    });
  }
});

r.post("/modules", async (req, res) => {
  /**
   * ini untuk ngebuat module baru (misal mau buat layanan periksa gigi)
   */
  const { name, config_id } = req.body;

  const create = await AppDataSource.createQueryBuilder()
    .insert()
    .into(Module)
    .values({
      config_id,
      module_name: name as string,
      activated_at: new Date().getTime(),
    })
    .execute();

  console.log('CREATE', create);

  res.send("New module created");
});

r.get("/modules/:id", (req, res) => {
  /**
   * ini untuk ngedapetin detail module (misal module klinik gigi jadi modules/gigi)
   */
  res.send("Config page get detail value");
});

r.post("/modules/:id", (req, res) => {
  /**
   * ini untuk ngebuat module baru (misal module klinik gigi)
   */
  res.send("Config page get detail value");
});

r.delete("/modules/:id", (req, res) => {
  /**
   * ini untuk ngehapus module (misal module klinik gigi gak mau dijalankan lagi)
   */
  res.send("Config page get detail value");
});

export default r;
