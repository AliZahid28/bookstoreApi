const mongoose = require('mongoose')

//promise then_catch
// mongoose.connect('mongodb://localhost:27017/onlineBookStore').then(()=>console.log('db connected .....')).catch((err)=>console.log('not connected ...',err))

//async await
const dbConn = async () => {
    try {
        await mongoose.connect(process.env.db_Url)
        console.log('db connected')
    } catch (err) {
        console.log('db not connected : ', err)
    }
}

module.exports = dbConn