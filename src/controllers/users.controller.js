import { findUserByEmail, saveNewUser } from '../repositories/users.repositories.js'

export async function saveUser(request, response) {
  const {
    email,
    password,
    name
  } = request.body

  const userWithEmail = await findUserByEmail(email)
  if (userWithEmail) {
    return response.status(403).json({
      message: 'Já existe um usuario com esse email'
    })
  }


  const userSaveOkay = await saveNewUser({ email, password, name })
  if (userSaveOkay === 'code_error_db') {
    return response.status(500).json({ error: 'Houve algum problema, tentar novamente!' })
  }

  return response.status(201).json(userSaveOkay)
}

export async function getInfoUser(request, response) {
  const { authenticatedUser } = request
  const user = await findUserByUsername(authenticatedUser.userName, ['uuid', 'userName', 'fullName', 'email', 'level', 'status', 'statusHistory', 'createdAt', 'updatedAt'])
  return response.json(user)
}


