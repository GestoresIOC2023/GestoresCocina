import model from "../models/userModel.js";

//Recupera usuario base de datos
const getUser = async (req, res) => {
  try {
    const users = await model.getUser(req.params.user_id);
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

//Actuliza datos del usuario
const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const users = await model.updateUser(data);
    return res.status(200).json({ users });
  } catch (err) {
    res.status(500).send("Error al actualizar datos del usuario");
  }
};

export default {
  getUser,
  createUser,
  updateUser
};
