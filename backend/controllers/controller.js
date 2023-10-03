import model from '../models/model.js'

const getUsers = async (req, res) => {
  try {
    const users = await model.getUsers(req.query.id)
    return res.status(200).json({ users });
  } catch (err) {
    res.status(500).send('Error al obtener datos')
  }
}
const insertUser = async (req, res) => {
  try {
    const data = req.body;
    const users = await model.insertUser(data)
    return res.status(201).json({ users });
  } catch (err) {
    res.status(500).send('Error al insertar datos')
  }
}
export default {
  getUsers, insertUser
}
