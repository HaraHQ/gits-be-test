import { Router } from "express";
import { v4 as uuidv4 } from 'uuid'; // Import UUID to generate unique SKU
import { AppDataSource } from "../lib/datasource";
import { Medication } from "../models";

const r = Router();

/**
 * maen nya gini:
 * database oracle itu simpan data pribadi <=> api SS buat integrasi data pasien dan tindakan dan setelahnya
 */

r.get("/", async (req, res) => {
  /**
   * dapetin list obat, bisa search name
   */
  const data = await AppDataSource.getRepository(Medication)
    .createQueryBuilder("medicines")
    .getMany();

  res.status(200).json({ data });
});

r.get("/:id", async (req, res) => {
  /**
   * ini untuk dapetin detail dari obat
   */
  const data = await AppDataSource.getRepository(Medication)
    .createQueryBuilder("medicines")
    .where("medicines.id = :id", { id: req.params.id })
    .getOne();

  res.status(200).json({ data });
});

r.post("/", async (req, res) => {
  /**
   * This creates a new medication
   */
  const { name, sku, stock, price, config_id } = req.body;

  // Generate a unique SKU if not provided
  const generatedSku = sku || uuidv4(); 

  try {
    // Check if the SKU already exists
    const existingSku = await AppDataSource.getRepository(Medication)
      .createQueryBuilder("medication")
      .where("medication.sku = :sku", { sku: generatedSku })
      .getOne();

    if (existingSku) {
      res.status(400).json({ message: "SKU already exists" });
      return;
    }

    // Proceed with the insert if the SKU is unique
    const create = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Medication)
      .values({
        medicine_name: name,
        sku: generatedSku,
        stock: parseInt(stock),
        price: parseInt(price),
        config_id,
      })
      .execute();

    res.status(200).json({ message: "Medicine created", sku: generatedSku });
  } catch (error) {
    console.error("Error creating medicine:", error);
    res.status(400).json({ message: "Medicine creation failed", error });
  }
});


r.put("/:id", async (req, res) => {
  /**
   * ini untuk update obat
   */
  const { name, sku, stock, price, config_id } = req.body;
  const create = await AppDataSource.createQueryBuilder()
    .update(Medication)
    .set({
      medicine_name: name,
      sku,
      stock: parseInt(stock),
      price: parseInt(price),
      config_id,
    })
    .where("id = :id", { id: req.params.id })
    .execute();

  if (create) {
    res.status(200).json({ message: "Medicine updated" });
  } else {
    res.status(400).json({ message: "Medicine failed to update" });
  }
});

r.delete("/:id", async (req, res) => {
  /**
   * ini untuk delete obat
   */
  const del = await AppDataSource.createQueryBuilder()
    .delete()
    .from(Medication)
    .where("id = :id", { id: req.params.id })
    .execute();

  if (del) {
    res.status(200).json({ message: "Medicine deleted" });
  } else {
    res.status(400).json({ message: "Medicine failed to delete" });
  }
});

r.post("/:id/in", (req, res) => {
  /**
   * ini untuk dapetin stock obat
   */
  res.send("Config page get detail value");
});

r.post("/:id/medicine-claim", (req, res) => {
  /**
   * ini untuk ngeluarin obat pasien, field nya treatment_id
   */
  res.send("Config page get detail value");
});

export default r;