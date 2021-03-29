const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDb = require('./config/db')
const {notFound, errorHandler} = require('./middlewares/errorMiddleware')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')



dotenv.config()
connectDb()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())

// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// app.get('/api/config/click', (req,res) => res.send() )

const _dirname = path.resolve()
app.use('/uploads', express.static(path.join(_dirname, '/uploads')))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(_dirname, '/frontend/build')))

    app.get('*', (req,res) => res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req,res) => {
        res.send('API is running ...')
    })
}



// //Static file
// app.use('/images',express.static('images'))

// Middlewares
app.use(notFound)
app.use(errorHandler)


// Connecting PORT
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline))