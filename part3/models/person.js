const mongoose = require('mongoose')

const phoneValidator = (value) => {
  if (typeof value !== 'string') return false

  // Must be: 2–3 digits + '-' + digits, total length >= 8
  const pattern = /^\d{2,3}-\d+$/
  return value.length >= 8 && pattern.test(value)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: phoneValidator,
      message: props => `${props.value} is not a valid phone number`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Model name Person -> collection becomes "people"
module.exports = mongoose.model('Person', personSchema)