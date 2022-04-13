const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('postman-request')

const geocode = require('./utils/geocode')
const forecst = require('./utils/forecast')
const { rmSync } = require('fs')
const forecast = require('./utils/forecast')

publicDirectoryPath = path.join(__dirname, '../public')
viewPath = path.join(__dirname, '../templates/views')
partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

//console.log(publicDirectoryPath)
// console.log(__dirname)
const app = express()
app.set('view engine', 'hbs')
app.set('views', viewPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Padmanabhan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Padmanabhan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help / FAQs',
        dtlmsg: 'How to use the application?',
        name: 'Padmanabhan'
    })
})


app.get('/product',(req, res) =>{
    if (!req.query.products){
        return res.send({error: 'Input data not provided'})
        //console..log(req.query.products)
    }
    res.send({
        products: req.query.products
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({error: 'Address not provided'})
        console.log('SSS' + req.query.search)
    }         
    
    geocode(req.query.address, (error = {}, {latitude, longitude, location} = {}) =>{
        if(!error){
           return res.send({error})
        } else {
        forecast(latitude, longitude, (error, forcastdata = []) =>{
            if (!error){
                return res.send({error})
            } else {
                res.send({
                    forecast: forcastdata,
                    location,
                    address: req.query.address
                })
            }
        })
    }
    })
})

app.get('/help/*', (req, res) => {
    res.send('My Help article Page Not Found')})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not found',
        name: 'Padmanabhan'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})