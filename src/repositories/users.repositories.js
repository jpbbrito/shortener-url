import Database from '../services/database.js'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

export async function findUserByEmail(email) {
  const user = await Database
    .connection
    .select('')
    .from('users')
    .where('email', '=', email)

  if (user.length === 0) {
    return false
  }
  return user[0]
}


export async function updatePasswordUser(uuid, password) {
  const salt = await bcrypt.genSaltSync()
  const passwordHash = await bcrypt.hashSync(password, salt)
  const data = {
    password: passwordHash,
    updatedAt: Database.connection.fn.now()
  }
  try {
    const result = await Database
      .connection('users')
      .where({ uuid })
      .update(data)
    console.log('[updatePasswordUser] -> result', result)
    return true
  } catch (err) {
    console.log('[updatePasswordUser] -> err', err)
    return 'code_error_db'
  }
}

export async function saveNewUser({ email, password, name }) {
  const salt = await bcrypt.genSaltSync()
  const date = new Date()
  const passwordHash = await bcrypt.hashSync(password, salt)
  const data = {
    id: randomUUID(),
    email,
    password: passwordHash,
    name,
    status: 'created',
    status_history: JSON.stringify([
      {
        createdAt: date.toISOString(),
        status: 'created',
        updatedAt: date.toISOString()
      }
    ])
  }
  try {
    const result = await Database
      .connection('users')
      .insert(data)
      .returning(['id', 'email', 'name', 'status_history', 'created_at', 'updated_at'])
    console.log('[saveNewUser] -> result', result)
    return result[0]
  } catch (err) {
    console.log('[saveNewUser] -> err', err)
    return 'code_error_db'
  }
}

export async function matchUserAndPassword (email, password) {
  const user = await Database.connection.select('email', 'password').from('users')
    .where('email', '=', email)
  if (user.length === 0) {
    return false
  }
  const samePassword = bcrypt.compareSync(password, user[0].password)
  if (!samePassword) {
    return false
  }
  return true
}