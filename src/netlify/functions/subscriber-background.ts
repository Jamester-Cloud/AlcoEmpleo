import { schedule } from '@netlify/functions'
import axios from 'axios'
import { connect } from '@/dbConfig/dbConfig'
connect()
export const handler = schedule('0 1 * * 1,5', async () => {
    console.log("Esto es una funcion programada, para invocarse cada minuto")
    return {
      statusCode: 200
    }
  })