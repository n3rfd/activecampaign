'use strict'

const EventEmitter = require('events')
const ContactEntity = require('./contact')
const HttpClient = require('./http')

class ActiveCampaign extends EventEmitter {
  /**
   * Constructor
   *
   * @param {object} params
   * @property {string} params.url - ActiveCampaign's base url
   * @property {string} params.token - API Token
   * @property {Http} params.http - Http class
   */
  constructor (params) {
    super()

    if (params.hasOwnProperty('url') === false) {
      throw new Error('ActiveCampaign Class expects parameter url')
    }
    if (params.hasOwnProperty('token') === false) {
      throw new Error('ActiveCampaign Class expects parameter token')
    }

    this.url = params.url
    this.token = params.token
    this.http = HttpClient

    if (params.hasOwnProperty('http') === true) {
      this.http = params.http
    }
  }
}

class Contact extends ActiveCampaign {
  /**
   * Create or update contact
   *
   * @params {Object} contact - Contains the contact fields
   * @params {String} contact.email
   * @params {String} contact.firstName
   * @params {String} contact.lastName
   * @params {String} contact.phone
   */
  sync (contact, callback) {
    let contactObj = new ContactEntity(contact)

    let headers = {}
    headers['Api-Token'] = this.token

    let postData = {}
    postData.url = this.url + '/api/3/contact/sync'
    postData.headers = headers
    postData.data = contactObj

    this.http.post(postData, (data) => {
      if (data.body === '') {
        callback(true, data)
      } else {
        callback(null, JSON.parse(data.body))
      }
    })
  }

  delete (contact, callback) {
    let headers = {}
    headers['Api-Token'] = this.token

    let postData = {}
    postData.url = this.url + '/api/3/contacts/' + contact.id
    postData.headers = headers

    this.http.delete(postData, (data) => {
      if (data.body === '') {
        callback(true, data)
      } else {
        callback(null, JSON.parse(data.body))
      }
    })
  }
}

module.exports = {
  Contact: Contact
}
