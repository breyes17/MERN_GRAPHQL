const mongoose = require('mongoose')

const connect = async () => {
    const conn = await mongoose.connect(process.env.URI)
    console.log(`Succesfully connected to database. ${conn.connection.host}`)
}

module.exports = connect;