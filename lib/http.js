'use strict'

class Http {
  static post (params, callback) {
    let postData = JSON.stringify(params.data)

    let url = require('url')
    let apiUrl = url.parse(params.url)

    params.headers['Content-Type'] = 'application/json'
    params.headers['Content-Length'] = Buffer.byteLength(postData)

    let options = {}
    options.hostname = apiUrl.hostname
    options.port = 443
    options.path = apiUrl.pathname
    options.method = 'POST'
    options.headers = params.headers

    const https = require('https')

    const req = https.request(options, (res) => {
      let body = ''

      res.on('data', (chunk) => {
        body += chunk.toString()
      })

      res.on('end', () => {
        let out = {}
        out.headers = res.headers
        out.body = body

        callback(out)
      })
    })

    req.on('error', (e) => {
      let out = {}
      out.error = e.message

      callback(out)
    })

    req.end(postData)
  }

  static delete (params, callback) {
    let url = require('url')
    let apiUrl = url.parse(params.url)

    params.headers['Content-Type'] = 'application/json'

    let options = {}
    options.hostname = apiUrl.hostname
    options.port = 443
    options.path = apiUrl.pathname
    options.method = 'DELETE'
    options.headers = params.headers

    const https = require('https')

    const req = https.request(options, (res) => {
      let body = ''

      res.on('data', (chunk) => {
        body += chunk.toString()
      })

      res.on('end', () => {
        let out = {}
        out.headers = res.headers
        out.body = body

        callback(out)
      })
    })

    req.on('error', (e) => {
      let out = {}
      out.error = e.message

      callback(out)
    })

    req.end()
  }

  static get (params, callback) {
    let url = require('url')
    let apiUrl = url.parse(params.url)

    params.headers['Content-Type'] = 'application/json'

    let options = {}
    options.hostname = apiUrl.hostname
    options.port = 443
    options.path = apiUrl.pathname + '?' + params.query
    options.method = 'GET'
    options.headers = params.headers

    const https = require('https')
    const req = https.request(options, (res) => {
      let body = ''

      res.on('data', (chunk) => {
        body += chunk.toString()
      })

      res.on('end', () => {
        let out = {}
        out.headers = res.headers
        out.body = body

        callback(out)
      })
    })

    req.on('error', (e) => {
      let out = {}
      out.error = e.message

      callback(out)
    })

    req.end()
  }
}

module.exports = Http
