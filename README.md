# ActiveCampaign v3 API Node.js Client

[![Build Status](https://travis-ci.com/android86/activecampaign.svg?branch=master)](https://travis-ci.com/android86/activecampaign)
[![codecov](https://codecov.io/gh/android86/activecampaign/branch/master/graph/badge.svg)](https://codecov.io/gh/android86/activecampaign)

## Examples

### Basic Contact Sync

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
