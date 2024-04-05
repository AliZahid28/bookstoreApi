const express = require('express')
const app = express()
const dbConn = require('./config/dbconn')
const userRouter = require('./router/userRouter')
const bookRouter = require('./router/bookRouter')
const cartRouter = require('./router/cartRouter')
const orderRouter = require('./router/orderRouter')
const reviewRouter = require('./router/reviewRouter')
require('dotenv').config()

const port = process.env.PORT || 4000

app.use(express.json());


dbConn()

app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)
app.use('/api/carts', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/review', reviewRouter)



app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})