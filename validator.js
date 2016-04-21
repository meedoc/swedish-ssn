(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['lodash'], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory(require('lodash'))
  } else {
    root.SSNValidator = factory(root._)
  }
}(this, function(_) {

  function validator(ssn) {
    var ssnDigits = ssn.replace(/\D/g, '')
    var signIndex = ssn.search(/[-+]/)

    return {
      number: ssn,
      isValid: hasValidContent() && hasValidChecksum() && hasValidBirthDate(),
      birthDate: getBirthDate(),
      gender: getGender()
    }

    function hasValidContent() {
      return /^\d{6,8}[-+]\d{4}$/.test(ssn)
    }

    function hasValidChecksum() {
      var luhnMatrix = [2, 1, 2, 1, 2, 1, 2, 1, 2, 0]
      var checkableDigits = _(_.split(ssnDigits, ''))
        .map(_.toNumber)
        .takeRight(10)
        .value()
      var checksum = _(_.zip(checkableDigits, luhnMatrix))
        .map(_.spread(_.multiply))
        .map(function(n) { return n > 9 ? n - 9 : n })
        .sum()
      checksum = (10 - checksum % 10) % 10
      return checksum === _.last(checkableDigits)
    }

    function hasValidBirthDate() {
      return !_.isUndefined(getBirthDate())
    }

    function getBirthDate() {
      var year = -1
      var month = -1
      var day = -1

      if (signIndex === 6) {
        year = numberAt(0, 2)
        month = numberAt(2, 4)
        day = numberAt(4, 6)
        var currentYear = new Date().getFullYear() - 2000
        year += (year > currentYear) ? 1900 : 2000
      } else if (signIndex === 8) {
        year = numberAt(0, 4)
        month = numberAt(4, 6)
        day = numberAt(6, 8)
      }

      if (year >= 1900 && year <= 2099 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        return new Date(year, month, day)
      }
    }

    function getGender() {
      var genderNumber = -1
      if (signIndex === 6) {
        genderNumber = numberAt(8)
      } else if (signIndex === 8) {
        genderNumber = numberAt(10)
      }

      if (genderNumber !== -1) {
        return genderNumber % 2 === 0 ? 'female' : 'male'
      }
    }

    function numberAt(start, end) {
      end = end || start + 1
      return _.toNumber(ssnDigits.substring(start, end))
    }
  }

  return validator

}))
