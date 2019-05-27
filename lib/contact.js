'use strict'

class Contact {
  constructor (json) {
    this.id = json.id
    this.firstName = json.firstName
    this.lastName = json.lastName
    this.email = json.email
    this.phone = json.phone
    this.fieldValues = json.fieldValues
  }

  /**
   * Converts this class to JSON object, not a string
   */
  toJSON () {
    return {
      'contact': {
        'id': this.id,
        'firstName': this.firstName,
        'lastName': this.lastName,
        'email': this.email,
        'phone': this.phone
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

  set firstName (name) {
    this._firstName = name
  }
  get firstName () {
    if (!this._firstName) {
      return null
    }

    return this._firstName.trim()
  }

  // --

  set lastName (name) {
    this._lastName = name
  }
  get lastName () {
    if (!this._lastName) {
      return null
    }

    return this._lastName.trim()
  }

  // --

  set email (email) {
    this._email = email
  }
  get email () {
    if (!this._email) {
      throw new Error('Empty field: email')
    }

    return this._email.trim()
  }

  // --

  set phone (phone) {
    this._phone = phone
  }
  get phone () {
    if (!this._phone) {
      return null
    }

    return this._phone.trim()
  }

  // --

  set customFields (customFields) {
    this._customFields = customFields
  }

  // --

  set fieldValues (fieldValues) {
    this._fieldValues = fieldValues
  }
  get fieldValues () {
    let ref = this

    if (Array.isArray(this._fieldValues) === false) {
      throw new Error('Not an array field - fieldValues')
    }

    return this._fieldValues.map((field) => {
      for (let i = 0; i < ref._customFields.length; i++) {
        if (field.fieldName === ref._customFields[i].title) {
          return {
            'contact': ref._id,
            'field': ref._customFields[i].id,
            'value': field.value
          }
        }
      }
    })
  }

}

module.exports = Contact
