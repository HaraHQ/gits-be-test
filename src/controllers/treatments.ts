import { Router } from "express";

const r = Router();

/**
 * maen nya gini:
 * database oracle itu simpan data pribadi <=> api SS buat integrasi data pasien dan tindakan dan setelahnya
 */

r.get("/:patient_id", (req, res) => {
  /**
   * dapetin list perawatan dari pasien, bisa di filter module=jenis_layanan, sortby asc desc
   */
  res.send("Config page default value");
});

r.get("/:patient_id/diagnose", (req, res) => {
  /**
   * ini untuk dapetin list diagnosa dari pasien
   */
  res.send("Config page get detail value");
});

r.post("/:patient_id/diagnose", (req, res) => {
  /**
   * ini untuk buat diagnosa baru untuk pasien
   */
  res.send("Config page get detail value");
});

r.get("/:patient_id/treatment", (req, res) => {
  /**
   * ini untuk dapetin list perawatan dari pasien
   */
  res.send("Config page get detail value");
});

r.post("/:patient_id/treatment", (req, res) => {
  /**
   * ini untuk buat perawatan baru untuk pasien berdasarkan diagnosa diatas
   */
  res.send("Config page get detail value");
});

r.get("/:patient_id/treatment/:treatment_id/receipt", (req, res) => {
  /**
   * ini untuk mendapatkan resep obat perawatan pasien berdasarkan treatment_id
   */
  res.send("Config page get detail value");
});

r.post("/:patient_id/treatment/:treatment_id/receipt", (req, res) => {
  /**
   * ini untuk membuat resep obat perawatan pasien berdasarkan treatment_id
   */
  res.send("Config page get detail value");
});

r.get("/:patient_id/treatment/:treatment_id/receipt/:receipt_id", (req, res) => {
  /**
   * ini untuk mendapatkan detail resep obat perawatan pasien berdasarkan receipt_id
   */
  res.send("Config page get detail value");
});

r.get("/:patient_id/treatment/:treatment_id/certificate", (req, res) => {
  /**
   * ini untuk mendapatkan sertifikat perawatan pasien berdasarkan treatment_id
   */
  res.send("Config page get detail value");
});

r.post("/:patient_id/treatment/:treatment_id/certificate", (req, res) => {
  /**
   * ini untuk membuat sertifikat perawatan pasien berdasarkan treatment_id
   */
  res.send("Config page get detail value");
});

r.get("/:patient_id/treatment/:treatment_id/certificate/:certificate_id", (req, res) => {
  /**
   * ini untuk mendapatkan detail sertifikat perawatan pasien berdasarkan certificate_id
   */
  res.send("Config page get detail value");
});

export default r;