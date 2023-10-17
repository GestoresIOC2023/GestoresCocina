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
    let photo;
    if(req.file){
       photo = "http://localhost:5001/uploads/" + req.file.originalname;
    }else{
      photo = req.body.profile_picture;
    }
    const user = {...req.body, profile_picture: photo}
    const users = await model.updateUser(user);
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
