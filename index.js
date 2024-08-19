const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const app = express()
const port = 3000

app.use(cors({
  origin: ['https://quickbites-frontend.vercel.app'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
 
}))
app.use(express.json()) 
app.use(cookieParser())

const userRoutes = require('./Routes/userRoutes')
const menuRoutes = require('./Routes/menuRoutes')
const contactRoutes = require('./Routes/contactRoutes')
const userdetailsRoutes = require ('./Routes/userdetailsRoutes')
const cartRoutes = require('./Routes/cartRoutes')

app.use('/users/signup', userRoutes) 
app.use('/users', userRoutes) 
app.use('/users', userRoutes) 
app.use('/menus', menuRoutes)  
app.use('/menus/:menuId', menuRoutes) 
app.use('/contact', contactRoutes) 
app.use('/userdetails', userdetailsRoutes)  
app.use('/cart', cartRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
main() .then(()=>console.log('Database connected')).catch(err => console.log(err));

async function main() { 
    const url = process.env.DB_URL
    const password = process.env.DB_PASSWORD
    const urlwithpassword = url.replace('<password>',password)
  await mongoose.connect(urlwithpassword);
}; 