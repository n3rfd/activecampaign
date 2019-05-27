'use strict'

class FieldValue {
  constructor (json) {
    this.id = json.id
    this.contact = json.contact
    this.field = json.field
    this.value = json.value
  }

  /**
   * Converts this class to JSON object, not a string
   */
  toJSON () {
    return {
      'fieldValue': {
        'id': this.id,
        'contact': this.contact,
        'field': this.field,
        'value': this.value
      }
    }
  }

  // --

  set id (id) {
    this._id = id
  }
  get id () {
    return this._id
  }
  
  // --

  set contact (contact) {
    this._contact = contact
  }
  get contact () {
    if (!this._contact) {
      throw new Error('Empty field: contact')
    }

    return this._contact
  }

  // --

  set field (field) {
    this._field = field
  }
  get field () {
    if (!this._field) {
      throw new Error('Empty field: field')
    }

    return this._field
  }

  // --

  set value (value) {
    this._value = value
  }
  get value () {
    if (!this._value) {
      throw new Error('Empty field: value')
    }

    return this._value
  }
}

module.exports = FieldValue
