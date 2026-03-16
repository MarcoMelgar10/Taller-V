
const express = require("express");
const router = express.Router();

const pool = require("../db");


router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM task");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {title} = req.body;
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: "El nombre de la tarea no puede estar vacío" });
    }
    if (title.length > 40) {
      return res.status(400).json({ error: "El nombre de la tarea no puede superar los 40 caracteres" });
    }
    await pool.query("INSERT INTO task (name) VALUES ($1)", [title]);
    res.json({message: "Tarea Creada"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const {id, isComplete} = req.body;
    await pool.query("UPDATE task SET iscomplete = $1 WHERE id = $2", [isComplete, id]);
    res.json({message: "Tarea Actualizada"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const {id} = req.body;
    await pool.query("DELETE FROM task WHERE id = $1", [id]);
    res.json({message: "Tarea Eliminada"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
