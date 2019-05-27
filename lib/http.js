'use strict'

const Url = require('url')
const Https = require('https')

class Http {
  static post (params, callback) {
    let postData = JSON.stringify(params.data)

    let apiUrl = Url.parse(params.url)

    params.headers['Content-Type'] = 'application/json'
    params.headers['Content-Length'] = Buffer.byteLength(postData)

    let options = {}
    options.hostname = apiUrl.hostname
    options.port = 443
    options.path = apiUrl.pathname
    options.method = 'POST'
    options.headers = params.headers

    this._request(postData, options, callback)
  }

  static delete (params, callback) {
    let apiUrl = Url.parse(params.url)

    params.headers['Content-Type'] = 'application/json'

    let options = {}
    options.hostname = apiUrl.hostname
    options.port = 443
    options.path = apiUrl.pathname
    options.method = 'DELETE'
    options.headers = params.headers

    this._request('', options, callback)
  }

  static get (params, callback) {
    let apiUrl = Url.parse(params.url)

    params.headers['Content-Type'] = 'application/json'

    let options = {}
    options.hostname = apiUrl.hostname
    options.port = 443
    options.path = apiUrl.pathname + '?' + params.query
    options.method = 'GET'
    options.headers = params.headers

    this._request('', options, callback)
  }

  static _request (postData, options, callback) {
    const req = Https.request(options, (res) => {
      let body = ''

      res.on('data', (chunk) => {
        body += chunk.toString()
      })

      res.on('end', () => {
        try {
          callback({
            'headers': res.headers,
            'body': JSON.parse(body)
          })
        } catch (err) {
          callback({error: err.message})
        }
      })
    })

    req.on('error', (err) => {
      callback({error: err.message})
    })

    req.end(postData)
  }
}

module.exports = Http
