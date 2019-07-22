const path = require('path');

const express = require('express')
const hbs = require('hbs')

const app = express()

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

//Defines paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views') // path for custom view dir ie templates
const partialPath = path.join(__dirname, '../templates/partials')



//set up handlebars engine and views location-  handlerbar set up for dynamic content inside html
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve - server client side (html, css, js) src placed inside public folder
app.use(express.static(publicDirectoryPath));

//render html/handler bar inside the browser 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gaurav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Saurabh Chaudhary'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rahul',
        text: 'some help text, some help text, some help text'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Home</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([
//         { name: 'sa', age: 25 },
//         { name: 'sa', age: 27 },
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>Weather !</h1>')
// })

app.get('/weather', (req, res) => {
    console.log(req.query)
    if(!req.query.address) {
        return res.send({
            error: 'Please provide a valid address !'
        })
    }
    res.send([
        {location: 'Delhi', forecast: 'Hot above 30 degree', address: req.query.address},
        {location: 'New York', forecast: 'Cool below 20 degree', address: req.query.address}
    ])
})

app.get('/products', (req, res) => {
    // console.log(req.query.search)
    if(!req.query.search) {
        return res.send({
            error: 'Please provide a search term !'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help - 404 page',
        name: 'PQR',
        text: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Abc',
        text: 'Page Not found'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})