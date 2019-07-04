const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const request = require('request')

app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))




// app.get('/sanity', function (request, response) {
//   response.send("OK")
// })

// https://recipes-goodness.herokuapp.com/YOUR INGREDIENT

// app.get('/recipes/:ingredient',function(request,response){
//   const ingredient=request.params.ingredient
//   request(`https://recipes-goodness.herokuapp.com/recipes/${ingredient}`, function (err, response2) {
//     let ingredient = JSON.parse(response2.body).result.title

//     const recipe:[]
//     for (let i of ingredient) {
//       const recipe = {
//         title: i.title,
//         // lastName: i.lastName,
//         // pos: i.pos,
//         // jersey: i.jersey,
//       }
//       response.push(recipe)
//     }   
//   })
// })


app.get('/recipes/:ingredient', function (req, res) {
  let ingredient = req.params.ingredient
  request.get(`https://recipes-goodness.herokuapp.com/recipes/${ingredient}`, function (error, response) {
      let recipes = JSON.parse(response.body).results
      let recipesResponse = recipes.map(r => {return {
              ingredients: r.ingredients,
              title: r.title,
              thumbnail: r.thumbnail,
              href: r.href
          }
      })
      res.send(recipesResponse)
  })
  
})

// response.send(ingredient)

const port = 8080
app.listen(port, function () {
  console.log(`The server is up and reeady and running on ${port}`)
})
