'use strict'

let chai = require('chai')
let should = chai.should()
let expect = chai.expect
let assert = chai.assert

describe('ActiveCampaign::constructor()', function () {
  it('should throw exception - missing url field', function () {
    const AC = require('./../index')

    try {
      let contact = new AC.Contact({})

      assert.fail('This call should throw an exception.')
    } catch (err) {
      expect(err.message).equal('ActiveCampaign Class expects parameter url')
    }
  })

  it('should throw exception - missing token field', function () {
    const AC = require('./../index')

    try {
      let contact = new AC.Contact({
        'url': process.env.APIURL
      })

      assert.fail('This call should throw an exception.')
    } catch (err) {
      expect(err.message).equal('ActiveCampaign Class expects parameter token')
    }
  })

  it('should accept url, token, and http parameters', function () {
    class MockHttp {}

    const AC = require('./../index')

    try {
      let url = 'https://xxx.api-us1.com'
      let token = 'fa3a77bdf01bxxxx386125715d66251cac56cbf8fxxxxcce38fe8775a9d9ec016bdxxxxx8bb6'

      let contact = new AC.Contact({
        'url': url,
        'token': token,
        'http': MockHttp
      })

      contact.url.should.equal(url)
      contact.token.should.equal(token)
    } catch (err) {
      assert.fail('This call should throw an exception.')
    }
  })
})
