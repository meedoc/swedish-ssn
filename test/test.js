var should = require('should') // eslint-disable-line
var SSN = require('../validator.js')

describe('Swedish SSN validator', function() {
  it('should return valid info for valid SSN', function() {
    SSN('840607-4735').should.eql({
      number: '840607-4735',
      isValid: true,
      gender: 'male',
      birthDate: new Date(1984, 6, 7)
    })
    SSN('811228-9874').should.eql({
      number: '811228-9874',
      isValid: true,
      gender: 'male',
      birthDate: new Date(1981, 12, 28)
    })
    SSN('670919-9530').should.eql({
      number: '670919-9530',
      isValid: true,
      gender: 'male',
      birthDate: new Date(1967, 9, 19)
    })
    SSN('19600501-9044').should.eql({
      number: '19600501-9044',
      isValid: true,
      gender: 'female',
      birthDate: new Date(1960, 5, 1)
    })
    SSN('19670919-9530').should.eql({
      number: '19670919-9530',
      isValid: true,
      gender: 'male',
      birthDate: new Date(1967, 9, 19)
    })
    SSN('150101-1231').should.eql({
      number: '150101-1231',
      isValid: true,
      gender: 'male',
      birthDate: new Date(2015, 1, 1)
    })
    SSN('19120101+1234').should.eql({
      number: '19120101+1234',
      isValid: true,
      gender: 'male',
      birthDate: new Date(1912, 1, 1)
    })
  })

  it('should recognize invalid numbers', function() {
    SSN('').should.have.property('isValid').eql(false)
    SSN('giberrishandlongtext').should.have.property('isValid').eql(false)
    SSN('ABCDEF-GHIJ').should.have.property('isValid').eql(false)
    SSN('000000x0000').should.have.property('isValid').eql(false)
    SSN('19840607-9367').should.have.property('isValid').eql(false)
    SSN('140930-7188').should.have.property('isValid').eql(false)
  })
})
