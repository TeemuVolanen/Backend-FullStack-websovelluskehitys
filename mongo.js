const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://fullstack:${password}@cluster0.ppmeh.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 4) {
  console.log('give name and number as argument')
  process.exit(1)
} else if (process.argv.length === 5) {
  const p = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  p.save().then(() => {
    console.log(`added ${p.name} number ${p.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('too many arguments')
  process.exit(1)
}