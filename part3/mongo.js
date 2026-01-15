const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('usage: node mongo.js <password> [name] [number]')
    process.exit(1)
}

const password = process.argv[2]

const encodedPassword = encodeURIComponent(password)

const url = `mongodb+srv://admin:${encodedPassword}@cluster0.nzmbpch.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose
    .connect(url, { family: 4 })
    .then(() => {
        const personSchema = new mongoose.Schema({
            name: String,
            number: String,
        })

        // Model name Person -> collection becomes "people" (Mongoose pluralizes)
        const Person = mongoose.model('Person', personSchema)

        if (process.argv.length === 3) {
            console.log('phonebook:')

            return Person.find({}).then((persons) => {
                persons.forEach((p) => {
                    console.log(`${p.name} ${p.number}`)
                })
                return mongoose.connection.close()
            })
        }

        if (process.argv.length === 5) {
            const name = process.argv[3]
            const number = process.argv[4]

            const person = new Person({ name, number })

            return person.save().then(() => {
                console.log(`added ${name} number ${number} to phonebook`)
                return mongoose.connection.close()
            })
        }

        console.log('usage: node mongo.js <password> [name] [number]')
        return mongoose.connection.close()
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message)
        process.exit(1)
    })