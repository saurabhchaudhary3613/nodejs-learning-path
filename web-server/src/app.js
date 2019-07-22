const path = require('path');

const express = require('express')

const app = express()

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')

// server client side (html, css, js) src placed inside public folder
app.use(express.static(publicDirectoryPath));

// handlerbar set up for dynamic content inside html
app.set('view engine', 'hbs')

//render html/handler bar inside the browser 
app.get('', (req, res) => {
    res.render('index', {
        tilte: 'Weather App',
        name: 'Saurabh'
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
    res.send([
        {location: 'Delhi', forecast: 'Hot above 30 degree'},
        {location: 'New York', forecast: 'Cool below 20 degree'}
    ])
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})