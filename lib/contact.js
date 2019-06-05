'use strict'

class Contact {
  constructor (json) {
    this.id = json.id
    this.firstName = json.firstName
    this.lastName = json.lastName
    this.email = json.email
    this.phone = json.phone
    this.fields = json.fields
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
        'phone': this.phone,
        'fields': this.fields
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

  set fields (fields) {
    this._fields = fields
  }
  get fields () {
    let ref = this

    if (Array.isArray(this._fields) === false) {
      return null
    }

    if (!ref._customFields) {
      return null
    }

    return this._fields.map((field) => {
      for (let i = 0; i < ref._customFields.length; i++) {
        if (field.name === ref._customFields[i].title) {
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
