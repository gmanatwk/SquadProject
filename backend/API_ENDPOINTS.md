API endpoints

Unit Conversion
- POST /api/unitconversion/convert
  body: { "fromValue": 100.0, "fromUnit": "km", "toUnit": "mi", "precision": 4 }
  returns: { fromValue, fromUnit, toUnit, result, precision, timestampUtc }
- GET /api/unitconversion/units
  returns: list of supported units with category

Random Generator
- GET /api/randomgenerator/guid
  returns: string GUID v4
- POST /api/randomgenerator/numbers
  body: { "count": 5, "min": 1, "max": 100 }
  returns: [int]
- GET /api/randomgenerator/person
  returns: PersonDto { firstName, lastName, email, phoneNumber, age }
- GET /api/randomgenerator/address
  returns: AddressDto { street, city, state, zipCode, country }
