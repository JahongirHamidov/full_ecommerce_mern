const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDb = require('./config/db')
const {notFound, errorHandler} = require('./middlewares/errorMiddleware')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')



dotenv.config()
connectDb()

const app = express()

app.use(express.json())

// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// app.get('/api/config/click', (req,res) => res.send() )

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// //Static file
// app.use('/images',express.static('images'))

// Middlewares
app.use(notFound)
app.use(errorHandler)

// Connecting PORT
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline))