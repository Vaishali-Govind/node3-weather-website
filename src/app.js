const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//define paths for express config
const pathToDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname,'../template/partials');

//setting up static directory to serve
app.use(express.static(pathToDirectory));

//setting up views location from views to template
app.set('views',viewsPath)

//setting up for partials
hbs.registerPartials(partialsPath);

//setting up handlebars
app.set('view engine', 'hbs');  
// app.get('', (req, res) => {
//     //res.send('hi express');
//     res.send('<h1>hi express</h1>');

// });

// app.get('/help', (req, res) => {
//    //res.send('help page');
//    res.send({
//        name: 'vaishali',
//        age: 22
//    })
// });

// app.get('/about', (req, res) => {
//    // res.send('about page');
//    res.send([{
//        name: 'vaishali'
//    }, {
//        name: 'govind'
//    }])

// });
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'vaishali'
  });
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'vaishali'
  })
})

app.get('/help', (req,res) => {
         res.render('help', {
            title: 'Help',
            message: 'contact us on 86900',
            name: 'vaishali'
         })
})

app.get('/products', (req,res) => {
  if(!req.query.search){
    return res.send({
      error: 'you should give search item',
    })
  }
  res.send({
    products: []
  })
})

app.get('/weather',(req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'address should be provided'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location,
        address:req.query.address

      })
    })
})
 

});
app.get('/help/*', (req,res) => {
  res.render('404',{
    title:'404 page',
    message: 'help article not found',
    name:'vaishali'
  })
})
app.get('*', (req,res) => {
   res.render('404', {
     title: '404 error message',
     message: 'page not found',
     name: 'vaishali'
   })
})

app.listen(3000, () => {
    console.log('running on port 3000');
})