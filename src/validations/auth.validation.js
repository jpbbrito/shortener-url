import jwt from 'jsonwebtoken'

export async function authenticateValidation(request, response, next) {
  const { email, password } = request.body
  if (!email || !password || email.length === 0 || password.length === 0) {
    return response.status(400).json({
      error: 'email e/ou password não foram enviados!'
    })
  }
  return next()
}

export async function jwtTokenValidation(request, response, next) {
  console.log('[authenticateToken.js] request.headers', request.headers)

  if(!request.headers.authorization || request.headers.authorization.length ===  0) {
    return response.status(401).json({ error: 'token invalido!' })
  } 
  const token = request.headers.authorization.split(' ')[1]

  if (token == null) return response.status(401).json({ error: 'token invalido!' })

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) {
      console.log('jwt.decode() -> err ', err)
      console.log('jwt.decode() -> ', jwt.decode(token, { complete: true }))
      return response.status(401).json({ error: 'token invalido!' })
    }
    console.log('jwt.verify() -> ', data)
    request.authenticatedUser = {
      ...data.data
    }
    return next()
  })
}

export async function jwtTokenOptionalValidation(request, response, next) {
  console.log('[authenticateToken.js] request.headers', request.headers)

  if(!request.headers.authorization || request.headers.authorization.length ===  0) {
    return next()
  } 
  const token = request.headers.authorization.split(' ')[1]

  if (token == null) return response.status(401).json({ error: 'token invalido!' })

  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) {
      console.log('jwt.decode() -> err ', err)
      console.log('jwt.decode() -> ', jwt.decode(token, { complete: true }))
      return response.status(401).json({ error: 'token invalido!' })
    }
    console.log('jwt.verify() -> ', data)
    request.authenticatedUser = {
      ...data.data
    }
    return next()
  })
}