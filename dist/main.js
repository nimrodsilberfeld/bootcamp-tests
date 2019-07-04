const button = $('.button')
button.on('click', function () {
    let ingredient = $('.input').val()
    $.get(`recipes/${ingredient}`, function (recipesResponse) {
        render(recipesResponse)
    }
    )
})

function render(recipes) {
    $('.con').empty()
    for (let r of recipes) {
        let img = `<div class="recipes">
              <img  src='${r.thumbnail}'>
              <p class='info' > ${r.title}</p> 
              <p class ='info2'> ${r.ingredients}</p>
              <p class ='info3'> ${r.href} </p>
              </div>`
        $('.con').append(img)
    }
}

