const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const { PORT, MONGODB_URI } = require('./utils/config')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(requestLogger)
app.use(express.static(path.join(__dirname, 'dist')))

mongoose.set('strictQuery', false)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.get('/api/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.json(persons)
  } catch (err) {
    next(err)
  }
})

app.get('/info', async (req, res, next) => {
  try {
    const count = await Person.countDocuments({})
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    `)
  } catch (err) {
    next(err)
  }
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)

    if (!person) {
      return res.status(404).json({ error: 'person not found' })
    }
    res.json(person)
  } catch (err) {
    next(err)
  }
})

app.post('/api/persons', async (req, res, next) => {
  try {
    const name = req.body.name?.trim()
    const number = req.body.number?.trim()

    if (!name || !number) {
      return res.status(400).json({ error: 'name or number missing' })
    }

    const person = new Person({ name, number })
    const savedPerson = await person.save()

    res.status(201).json(savedPerson)
  } catch (err) {
    next(err)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const id = req.params.id

    const name = req.body.name?.trim()
    const number = req.body.number?.trim()

    if (!name || !number) {
      return res.status(400).json({ error: 'name or number missing' })
    }

    const existingPerson = await Person.findById(id)

    if (!existingPerson) {
      return res.status(404).json({ error: 'person not found' })
    }

    // name must match exactly
    if (existingPerson.name.toLowerCase() !== name.toLowerCase()) {
      return res.status(400).json({
        error: 'name cannot be changed',
      })
    }

    if (existingPerson.number === number) {
      return res.status(400).json({
        error: 'number is the same as before',
      })
    }

    existingPerson.number = number
    const savedPerson = await existingPerson.save()

    res.json(savedPerson)
  } catch (err) {
    next(err)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ error: 'person not found' })
    }

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

console.log('typeof errorHandler:', typeof errorHandler)
console.log('errorHandler.length:', errorHandler?.length)
app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})