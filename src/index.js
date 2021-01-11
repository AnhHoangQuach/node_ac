const path = require('path')
const express = require('express')
const morgan = require('morgan')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

const route = require('./routes')
const axios = require('axios');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json({limit: '1mb'}))
//HTTP logger
app.use(morgan('combined'))

//Template engine
app.use(expressLayouts)
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'resources/views'))

// Routes init
route(app)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})