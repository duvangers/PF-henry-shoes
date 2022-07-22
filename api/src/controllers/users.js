const { modelUsers, modelRoles } = require('../db')

const getUsers = async (req, res) => {
  try {
    const response = await modelUsers.findAll({ raw: true })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ msg: 'Error interno del servidor.', error })
  }
}

const updateUser = async (req, res) => {
  const { userId: id } = req.params
  const { username, email, roleId } = req.body

  try {
    if (req.body.id || username || email || roleId) {
      return res.status(400).send({ msg: `Permiso denegado.` })
    }

    const user = await modelUsers.findByPk(id)
    if (!user) return res.status(400).send({ msg: `El usuario ${id} no existe en la base de datos.` })

    await modelUsers.update(req.body, {
      where: { id },
    })

    res.status(200).send({ msg: 'Usuario actualizado con éxito.' })
  } catch (error) {
    res.status(500).send({ msg: 'Error interno del servidor.', error })
  }
}

const getUserDetails = async (req, res) => {
  const { userId: id } = req.params

  try {
    const response = await modelUsers.findByPk(id, {
      include: modelRoles,
    })
    if (!response) return res.status(400).send({ msg: `El usuario ${id} no existe en la base de datos.` })

    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ msg: 'Error interno del servidor.', error })
  }
}

const loginUser = async (req, res) => {
  const { email, email_verify, family_name, given_name, nickname, picture } = req.body

  try {
    const [user, created] = await modelUsers.findOrCreate({
      where: { email },
      defaults: {
        email,
        email_verify: email_verify ? 1 : 0,
        username: nickname,
        name: given_name,
        lastname: family_name,
        avatar_url: picture,
        status: 'Active',
      },
    })

    if (created) await user.setRole(2)

    res.status(200).json(user.dataValues)
  } catch (error) {
    res.status(500).send({ msg: 'Error interno del servidor.', error })
  }
}

module.exports = {
  getUsers,
  updateUser,
  getUserDetails,
  loginUser,
}
