// app.js
// require packages used in the project
const express = require('express')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs =  require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set ('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))


// routes setting
app.get('/', (req, res) => {
    // create a variable to store movieOne
  
    res.render('index', { restaurants: restaurantList.results });
  })

  app.get('/restaurants/:restaurant_id', (req, res) => {  
    const restaurant = restaurantList.results.find(
      restaurant => restaurant.id.toString() === req.params.restaurant_id
    )
    res.render('show', { restaurants: restaurant })
    })


    app.get('/search', (req, res) => {
      const keyword = req.query.keyword
      const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword})
})
    
    //app.get('/search', (req, res) => {
    // const keyword = req.query.keyword
  //   const restaurants = restaurantList.results.filter(restaurant => {
  //   return restaurant.title.includes(keyword)
  // })
  //     res.render('index', { restaurnts: restaurants })
  //   })

// start and listen on the Express server
app.listen(port, () =>{
    console.log(`Express is listening on http://localhost:${port}`)
})