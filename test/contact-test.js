'use strict'

let chai = require('chai')
let should = chai.should()
let expect = chai.expect
let assert = chai.assert

describe('Contact Entity', function () {
  it('should validate required field - email', function () {
    const Contact = require('./../lib/contact')

    try {
      let contactObj = new Contact({})
      let contactStr = JSON.stringify(contactObj)

      assert.fail('This call should throw an exception.')
    } catch (err) {
      expect(err.message).equal('Empty field: email')
    }
  })

  it('should allow required field - email', function () {
    const Contact = require('./../lib/contact')

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
    const Contact = require('./../lib/contact')

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

  it('should handle non-array fields', function () {
    const Contact = require('./../lib/contact')

    let email = 'james@constant.com'
    let firstName = 'james'
    let lastName = 'constant'
    let phone = '123-123-1234'

    let contactObj = new Contact({
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone,
      'fields': 'STR'
    })

    let contactStr = JSON.stringify(contactObj)

    let contactJSON = JSON.parse(contactStr)

    expect(contactJSON.contact).to.have.a.property('fields').equal(null)
  })

  it('should return an empty array when get->fields did not find a match', function () {
    const Contact = require('./../lib/contact')

    let email = 'james@constant.com'
    let firstName = 'james'
    let lastName = 'constant'
    let phone = '123-123-1234'

    let contactObj = new Contact({
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone,
      'fields': []
    })

    contactObj.customFields = ['xxx']

    let contactStr = JSON.stringify(contactObj)

    let contactJSON = JSON.parse(contactStr)

    expect(contactJSON.contact).to.have.a.property('fields').that.is.empty
  })
})

describe('ActiveCampaign.Contact::sync()', function () {
  it('should create or sync a Contact in AC', function (done) {
    const AC = require('./../index')

    let contact = new AC.Contact({
      'url': process.env.APIURL,
      'token': process.env.APIKEY
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

    contact.sync(payload, (err, contactObj) => {
      if (err) {
        assert.fail('This call should not return an error.')
      } else {
        expect(contactObj).to.have.a.property('id')
        expect(contactObj).to.have.a.property('email').equal(email)
        expect(contactObj).to.have.a.property('firstName').equal(firstName)
        expect(contactObj).to.have.a.property('lastName').equal(lastName)
        expect(contactObj).to.have.a.property('phone').equal(phone)
      }

      payload.id = contactObj.id

      contact.delete(payload, (err, res) => {
        if (err) {
          assert.fail('This call should throw an exception.')
        }

        done()
      })
    })
  }).timeout(10000)

  it('should handle error validation response - invalid email format error', function (done) {
    const AC = require('./../index')

    let contact = new AC.Contact({
      'url': process.env.APIURL,
      'token': process.env.APIKEY
    })

    let email = 'xxx'
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
        expect(err.errors[0]).to.have.a.property('title').equal('Contact Email Address is not valid.')
        expect(err.errors[0]).to.have.a.property('detail').equal('')
        expect(err.errors[0]).to.have.a.property('code').equal('email_invalid')

        done()
      } else {
        assert.fail('This call should throw an exception.')
      }
    })
  }).timeout(10000)

  it('should sync custom fields', function (done) {
    const AC = require('./../index')

    let contact = new AC.Contact({
      'url': process.env.APIURL,
      'token': process.env.APIKEY
    })

    let email = 'james@constant.com'
    let firstName = 'james'
    let lastName = 'constant'
    let phone = '123-123-1234'

    let payload = {
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone,
      'fields': [
        {
          'name': 'Foo',
          'value':'Bourne'
        },
        {
          'name': 'Country',
          'value':'Phils'
        }
      ]
    }

    contact.sync(payload, (err, contactObj) => {
      if (err) {
        assert.fail('This call should not return an error.')
      }

      payload.id = contactObj.id

      contact.delete(payload, (err, res) => {
        if (err) {
          assert.fail('This call should throw an exception.')
        }

        done()
      })
    })
  }).timeout(10000)
})

describe('ActiveCampaign.Contact::delete()', function () {
  it('should handle error response - non-existing contact id', function (done) {
    const AC = require('./../index')

    let contact = new AC.Contact({
      'url': process.env.APIURL,
      'token': process.env.APIKEY
    })

    let email = 'james@constant.com'

    let payload = {
      'email': email,
      'id': 0
    }

    contact.delete(payload, (err, res) => {
      if (err) {
        expect(err).to.have.a.property('message').equal('No Result found for Subscriber with id 0')
      } else {
        assert.fail('This call should throw an exception.')
      }

      done()
    })
  }).timeout(10000)
})
