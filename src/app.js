const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 //heroku and local (3000)

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs') // how to get handlebars setup.  Handle bars expects content to live in a folder called views
app.set('views', viewsPath) // here give the new folder name templates instead of 'views'.
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App', //second argument in render is the object to be passed to the hbs
        name: 'Neil Pineda' //file identified in the first argument.
    })//renders views in hbs
    //how does app.get know to connect the hbs file to the passed object?
    //like how does it know with 'index' to look under /templates/views
    //is it handled in the default settings of what app.set are that we ultimately
    //edited?
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Neil Pineda'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'This is a help statement',
        title: 'Help',
        name: 'Neil Pineda'
    })
})
 
app.get('/weather', (req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send(error)  //stops function execution after printing error
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
    })
})
//pretend it's app.com
//app.com/help
//app.com/about
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:'404',
        name: 'Neil Pineda',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res)=>{ //* means match anything that hasn't been matched so far
   res.render('404', {
       title:'404',
       name: 'Neil Pineda',
       errorMessage: 'Page not found.'
   })
})

//start server
app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})