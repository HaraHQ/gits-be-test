import { Router } from "express";

const r = Router();

/**
 * maen nya gini:
 * database oracle itu simpan data pribadi <=> api SS buat integrasi data pasien dan tindakan dan setelahnya
 */

r.post("/:treatment_id/exit-status", (req, res) => {
  /**
   * set status keluar, stabil atau enggak
   */
  res.send("Config page default value");
});

r.post("/:treatment_id/next-step", (req, res) => {
  /**
   * pasien selesai atau dijadwalkan kontrol
   */
  res.send("Config page get detail value");
});

export default r;