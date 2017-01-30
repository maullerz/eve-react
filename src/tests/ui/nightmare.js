import nightmare from 'nightmare'
import url from 'url'

const BASE_URL = url.format({
  protocol: process.env.PROTOCOL || 'http',
  hostname: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000
})


export default function (path = '') {
  const location = url.resolve(BASE_URL, path)

  return nightmare({ show: true }).goto(location)
}