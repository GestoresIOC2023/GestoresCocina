import model from "../models/model.js";

//Recupera usuario base de datos
const getUser = async (req, res) => {
  try {
    const users = await model.getUser(req.query.id);
    return res.status(200).json({ users });
  } catch (err) {
    res.status(500).send("Error al obtener datos");
  }
};

//introduce usuario base de datos
const createUser= async (req, res) => {
  try {
    const data = req.body;
    const users = await model.createUser(data);
    return res.status(201).json({ users });
  } catch (err) {
    res.status(500).send("Error al insertar datos");
  }
};
export default {
  getUser,
  createUser,
};
