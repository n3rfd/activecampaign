'use strict'

let chai = require('chai')
let should = chai.should()
let expect = chai.expect
let assert = chai.assert

describe('FieldValue Entity', function () {
  it('should validate required field - contact', function () {
    const FV = require('./../lib/fieldValue')

    try {
      let fvObj = new FV({})
      let fvStr = JSON.stringify(fvObj)

      assert.fail('This call should throw an exception.')
    } catch (err) {
      expect(err.message).equal('Empty field: contact')
    }
  })

  it('should allow required field - field', function () {
    const FV = require('./../lib/fieldValue')

    try {
      let fvObj = new FV({
        'contact': 1
      })
      let fvStr = JSON.stringify(fvObj)

      assert.fail('This call should throw an exception.')
    } catch (err) {
      expect(err.message).equal('Empty field: field')
    }
  })

  it('should allow required field - value', function () {
    const FV = require('./../lib/fieldValue')

    try {
      let fvObj = new FV({
        'contact': 1,
        'field': 1
      })
      let fvStr = JSON.stringify(fvObj)

      assert.fail('This call should throw an exception.')
    } catch (err) {
      expect(err.message).equal('Empty field: value')
    }
  })

  it('should create a new instance of FieldValue class', function () {
    const FV = require('./../lib/fieldValue')

    let fvObj = new FV({
      'id': 1,
      'contact': 1,
      'field': 1,
      'value': 'STR'
    })
    let fvStr = JSON.stringify(fvObj)

    let fvJSON = JSON.parse(fvStr)

    fvJSON.fieldValue.id.should.equal(1)
    fvJSON.fieldValue.contact.should.equal(1)
    fvJSON.fieldValue.field.should.equal(1)
    fvJSON.fieldValue.value.should.equal('STR')
  })
})
