import { string, object } from 'prop-types'

async function FetchJSON(link, sesStorage, method, body) {
  var token
  if (typeof sesStorage !== 'undefined') token = sesStorage.getItem('token')
  const headersNoAuth = { 'Content-Type': 'application/json' }
  const headersAuth = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
  return await fetch(link, {
    method: method,
    headers: typeof token !== 'undefined' ? headersAuth : headersNoAuth,
    body: body && JSON.stringify(body)
  })
    .then((result) => {
      return result
    })
    .catch((err) => console.log(err))
}

FetchJSON.protoTypes = {
  link: string,
  sesStorage: object,
  method: string
}

module.exports = {
  FetchJSON
}
