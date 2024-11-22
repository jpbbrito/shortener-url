import express from 'express'

const routes = express.Router()

import { redirectUrl, getUrl, saveUrl, getAll, deleteUrl, updateUrl } from './controllers/shortener.controller.js'
import { saveUser } from './controllers/users.controller.js'
import { authenticate } from './controllers/auth.controller.js'

import { usersSaveValidation } from './validations/users.validation.js'
import { authenticateValidation, jwtTokenValidation, jwtTokenOptionalValidation } from './validations/auth.validation.js'

routes.get(
  '/shortener/',
  jwtTokenValidation,
  getAll
)

routes.get(
  '/shortener/:shortId',
  getUrl
)

routes.delete(
  '/shortener/:shortId',
  jwtTokenValidation,
  deleteUrl
)

routes.put(
  '/shortener/:shortId',
  jwtTokenValidation,
  updateUrl
)

routes.post(
  '/shortener',
  jwtTokenOptionalValidation,
  saveUrl
)

routes.get(
  '/:shortId',
  redirectUrl
)

routes.post('/users',
  usersSaveValidation,
  saveUser
)

routes.post('/authenticate',
  authenticateValidation,
  authenticate
)

export default routes