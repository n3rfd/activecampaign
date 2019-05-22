'use strict'

let chai = require('chai')
let should = chai.should()
let expect = chai.expect
let assert = chai.assert

describe('Contact Entity', function () {
  it('should validate required field - email', function () {
    const Contact = require('./../../lib/contact')

    try {
      let contactObj = new Contact({})
      let contactStr = JSON.stringify(contactObj)

      assert.fail('This call should throw an exception.')
    } catch (err) {
      expect(err.message).equal('Empty field: email')
    }
  })

  it('should allow required field - email', function () {
    const Contact = require('./../../lib/contact')

    try {
      let email = 'james@constant.com'

      let contactObj = new Contact({
        'email': email
      })

      let contactStr = JSON.stringify(contactObj)

      let contactJSON = JSON.parse(contactStr)

      contactJSON.contact.email.should.equal(email)

      expect(contactJSON.contact.firstName).is.a('null')
      expect(contactJSON.contact.lastName).is.a('null')
      expect(contactJSON.contact.phone).is.a('null')
    } catch (err) {
      assert.fail('This call should throw an exception.')
    }
  })

  it('should create a new instance of Contact class', function () {
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
    class MockHttp {
      static post (params, callback) {
        let jsonMockResponse = {headers: {}, body: '{"contact": {"id": "1", "email": "james@constant.com", "firstName": "james", "lastName": "constant", "phone": "123-123-1234"}}'}

        callback(jsonMockResponse)
      }
    }

    const AC = require('./../../index')

    let contact = new AC.Contact({
      'url': process.env.APIURL,
      'token': process.env.APIKEY,
      'http': MockHttp
    })

    let email = 'james@constant.com'
    let firstName = 'james'
    let lastName = 'constant'
    let phone = '123-123-1234'

    let payload = {
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone
    }

    contact.sync(payload, (err, res) => {
      if (err) {}

      expect(res.contact).to.have.a.property('email').equal(email)
      expect(res.contact).to.have.a.property('firstName').equal(firstName)
      expect(res.contact).to.have.a.property('lastName').equal(lastName)
      expect(res.contact).to.have.a.property('phone').equal(phone)

      done()
    })
  })

  it('should handle empty/error response from the Contact Sync method', function (done) {
    class MockHttp {
      static post (params, callback) {
        let jsonMockResponse = {headers: {}, body: ''}

        callback(jsonMockResponse)
      }
    }

    const AC = require('./../../index')

    let contact = new AC.Contact({
      'url': process.env.APIURL,
      'token': process.env.APIKEY,
      'http': MockHttp
    })

    let email = 'james@constant.com'
    let firstName = 'james'
    let lastName = 'constant'
    let phone = '123-123-1234'

    let payload = {
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone
    }

    contact.sync(payload, (err, res) => {
      if (err) {
        done()
      }

      assert.fail('This call should throw an exception.')
    })
  })
})

describe('ActiveCampaign.Contact::delete()', function () {
  it('should delete an existing contact in AC', function (done) {
    class MockHttp {
      static delete (params, callback) {
        let jsonMockResponse = {headers: {}, body: ''}

        callback(jsonMockResponse)
      }
    }

    const AC = require('./../../index')

    let contact = new AC.Contact({
      'url': process.env.APIURL,
      'token': process.env.APIKEY,
      'http': MockHttp
    })

    let email = 'james@constant.com'

    let payload = {
      'email': email,
      'id': 1
    }

    contact.delete(payload, (err, res) => {
      if (err) {
        assert.fail('This call should throw an exception.')
      }

      done()
    })
  })

  it('should handle error response from the Contact Delete method', function (done) {
    class MockHttp {
      static delete (params, callback) {
        let jsonMockResponse = {headers: {}, body: '{"error": "ERROR MESSAGE"}'}

        callback(jsonMockResponse)
      }
    }

    const AC = require('./../../index')

    let contact = new AC.Contact({
      'url': process.env.APIURL,
      'token': process.env.APIKEY,
      'http': MockHttp
    })

    let email = 'james@constant.com'

    let payload = {
      'email': email,
      'id': 1
    }

    contact.delete(payload, (err, res) => {
      if (err) {
        done()
      }

      assert.fail('This call should throw an exception.')
    })
  })
})
