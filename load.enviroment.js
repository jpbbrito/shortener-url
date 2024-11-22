import * as dotenv from 'dotenv'

export default function loadEnv () {
  if (process.env.NODE_ENV === 'local') {
    dotenv.config({ path: '.env.local' })
  }

  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env' })
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[loadEnv] - ')
    dotenv.config({ path: '.env.dev' })
  }
  return console.log('Enviroment loading!')
}