# swedish-ssn

Swedish SSN validator and information extractor

### Installation

```
npm install git@github.com:meedoc/swedish-ssn.git
```

### Usage

Package consists of one function which accepts SSN number as string and returns the following object:

```
{
  number:     <SSN number>,
  isValid:    <whether SSN number is valid or not>,
  gender:     <'male' | 'female'>,
  birthDate:  <Date object>
}
```

Here is an example:

```javascript

var SSN = require('swedish-ssn')

var ssn = SSN('SOME-SSN-NUMBER-AS-STRING')
if (ssn.isValid) {
  console.log("Number %s belongs to a %s person born in %s", ssn.number, ssn.gender, ssn.birthDate)
} else {
  console.log("Invalid number: %s", ssn.number)
}
```
