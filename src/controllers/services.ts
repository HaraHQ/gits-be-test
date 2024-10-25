import { Router } from "express";

const r = Router();

/**
 * maen nya gini:
 * database oracle itu simpan data pribadi <=> api SS buat integrasi data pasien dan tindakan dan setelahnya
 */

r.get("/", (req, res) => {
  /**
   * layanan di tampilkan disini, filter nya adalah module=string|jenis_layanan,aktif=boolean|untuk_tahu_lagi_jam_kerja_atau_enggak
   */
  res.send("Config page default value");
});

r.get("/:id", (req, res) => {
  /**
   * ini untuk dapetin detail dari layanan
   */
  res.send("Config page get detail value");
});

r.get("/:id/self-register", (req, res) => {
  /**
   * ini untuk ngebuat pendaftaran
   * ini manggil data jam kerja layanan dari module
   * data dokter nya siapa aja
   */
  res.send("Config page get detail value");
});

r.post("/:id/self-register", (req, res) => {
  /**
   * ini untuk ngebuat pendaftaran
   */
  res.send("Config page get detail value");
});

export default r;