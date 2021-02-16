const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDb = require('./config/db')
const {notFound, errorHandler} = require('./middlewares/errorMiddleware')

const productRoutes = require('./routes/productRoutes')



dotenv.config()
connectDb()
const app = express()

// Routes
app.use('/api/products', productRoutes)

// Middlewares
app.use(notFound)
app.use(errorHandler)

// Connecting PORT
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline))