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
/*
  Falta guardar la foto en express y actualizar el nickname de la base de datos y la
  url de la foto en express en la base de datos.

  Si pudieras agregar un campo con la descripcion del usuario tambien se podria
  actualizar tambien. Si no lo quito.
*/
const updateUser = async (req, res) => {
  try {
    //El archivo de la foto
    const photo = req.files;
    // los datos del usuario
    const user_id = req.body.id;
    const nickname = req.body.nickname;
    const description = req.body.description;
    
    // Crear objeto "data" con lo datos del usuario 
    const data = {
      user_id,
      nickname,
      description
    };
    
    const users = await model.updateUser(data);
    return res.status(200).json({ user: updateUser });
  } catch (err) {
    res.status(500).send("Error al actualizar datos del usuario");
  }
};

export default {
  getUser,
  createUser,
  updateUser
};
