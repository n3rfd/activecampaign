# Node.js Client for ActiveCampaign's v3 - REST API

[![Build Status](https://travis-ci.com/android86/activecampaign.svg?branch=master)](https://travis-ci.com/android86/activecampaign)
[![codecov](https://codecov.io/gh/android86/activecampaign/branch/master/graph/badge.svg)](https://codecov.io/gh/android86/activecampaign)
[![Maintainability](https://api.codeclimate.com/v1/badges/3021111943dd84108367/maintainability)](https://codeclimate.com/github/android86/activecampaign/maintainability)

## Install

This library is distributed on npm. To add it as a dependency, run the following command:

```bash
$ npm install activecampaign-rest
```

## Usage

### Basic Use Case - Contact.Sync()

``` js
const AC = require('activecampaign-rest')

let contact = new AC.Contact({
  'url': 'https://xxx.api-us1.com',
  'token': 'API_TOKEN'
})

let payload = {
  'email': 'john@wick.com',
  'firstName': 'john',
  'lastName': 'wick',
  'phone': '032-123-1234'
}

contact.sync(payload, (err, res) => {
  if (err) {}

  console.log(res)
})
```

### Custom Fields Use Case - Contact.Sync()

``` js
const AC = require('activecampaign-rest')

let contact = new AC.Contact({
  'url': 'https://xxx.api-us1.com',
  'token': 'API_TOKEN'
})

let payload = {
  'email': 'john@wick.com',
  'firstName': 'john',
  'lastName': 'wick',
  'phone': '032-123-1234',
  'fields': [
    {
      'name': 'Company',
      'value':'ABC'
    },
    {
      'name': 'License',
      'value':'MIT'
    },
  ]
}

contact.sync(payload, (err, res) => {
  if (err) {}

  console.log(res)
})
```
