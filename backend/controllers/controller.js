import model from '../models/model.js'

const getBosses = async (req, res) => {
  try {
    const users = await model.getBossUsers('Boss')
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err)
    res.status(500).send('Error al obtener datos')
  }
}
export default {
  getBosses
}
