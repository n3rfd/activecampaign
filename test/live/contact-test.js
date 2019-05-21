'use strict'

let chai = require('chai')
let should = chai.should()
let expect = chai.expect
let assert = chai.assert

describe('Contact Entity', function () {
  it('should', function () {
    const Contact = require('./../../lib/contact')

    let email = 'james@constant.com'
    let firstName = 'james'
    let lastName = 'constant'
    let phone = '123-123-1234'

    let contactObj = new Contact({
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone
    })

    let contactStr = JSON.stringify(contactObj)

    let contactJSON = JSON.parse(contactStr)

    contactJSON.contact.email.should.equal(email)
    contactJSON.contact.firstName.should.equal(firstName)
    contactJSON.contact.lastName.should.equal(lastName)
    contactJSON.contact.phone.should.equal(phone)
  })
})

describe('ActiveCampaign.Contact::sync()', function () {
  it('should create or sync a Contact in AC', function (done) {
    const AC = require('./../../lib/activecampaign')
    const Contact = require('./../../lib/contact')
    const HttpClient = require('./../../lib/http')

    let contact = new AC.Contact({
      'url': process.env.APIURL,
      'token': process.env.APIKEY,
      'http': HttpClient
    })

    let email = 'james@constant.com'
    let firstName = 'james'
    let lastName = 'constant'
    let phone = '123-123-1234'

    let contactObj = new Contact({
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone
    })

    contact.sync(contactObj, (err, res) => {
      if (err) {}

      expect(res.contact).to.have.a.property('email').equal(email)
      expect(res.contact).to.have.a.property('firstName').equal(firstName)
      expect(res.contact).to.have.a.property('lastName').equal(lastName)
      expect(res.contact).to.have.a.property('phone').equal(phone)

      contactObj.id = res.contact.id

      contact.delete(contactObj, (err, res) => {
        if (err) {}

        done()
      })
    })
  }).timeout(5000)
})
