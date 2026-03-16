const express = require("express");
const cors = require("cors");

const app = express();
const port = 3500;

app.use(cors());
app.use(express.json()); //Que se entienda en JSON

const tasksRoutes = require("./routes/task");

app.use("/tasks", tasksRoutes);

app.listen(port, () => { //El servicio esta escuchando peticiones 
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
