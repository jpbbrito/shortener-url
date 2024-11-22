import jwt from 'jsonwebtoken'
import { findUserByEmail, matchUserAndPassword } from '../repositories/users.repositories.js'

export async function authenticate(request, response) {
    const { email, password } = request.body
    const result = await matchUserAndPassword(email, password)
    if (!result) {
      return response.status(403).json({ error: 'email ou password esta errado' })
    }
    const user = await findUserByEmail(email)
    const token = jwt.sign({ data: { email } }, process.env.TOKEN_SECRET, { expiresIn: 30 * 60 })
    const decoded = jwt.decode(token, { complete: true })
    console.log('[auth.authenticate()] token', decoded)
  
    return response.json({
      token
    })
  }

