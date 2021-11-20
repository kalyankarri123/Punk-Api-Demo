

const endpoint = "https://api.punkapi.com/v2/beers"; 

$.getJSON(endpoint, function (data) {
  // add to favourite
  // click of star
  // beers are added into favourite div
  // favourites can be viewed by clicking favourite
  console.log(data); // filter through data 

  let weakBeers = data.filter(beer => beer.abv <= 4.5);
  let medBeers = data.filter(beer => beer.abv > 4.5 && beer.abv <= 7.5);
  let strongBeers = data.filter(beer => beer.abv > 7.5 && beer.abv <= 50); // pass in filtered data  and class

  function Display(range, percent) {
    // build html with filted data
    let beerHtml = range.map(item => `
        <div class = 'beer-wrapper'>
        <div class = "beer ${percent}">
          <i class="fa fa-star" aria-hidden="true"></i>
          <h3 class="beer__name">${item.name}</h3>
          <img class ="beer__img" src = "${item.image_url}">
          <h4 class ="beer__tagline">${item.tagline}</h4>
         
         </div>
               <div class='beer__content'>
                <div class='beer__name'>${item.name}</div>
                <div class='beer__tagline'>${item.tagline}</div>
                <div class='beer__description'>${item.description}</div>
                  <div class='beer__date'>${item.first_brewed}</div>
                <div class='beer__food-pairing'>
                    Pair with: ${item.food_pairing.join(', ')}
                </div>
            </div>
        </div>
       
            `);
    $(".beers").append(beerHtml);
  } // call filtered html with class names


  Display(weakBeers, "weak");
  Display(medBeers, "medium");
  Display(strongBeers, "strong"); 



  $(".beer").css("display", "none");
  $(".beers .medium").css("display", "block"); // filter beers using tabs

  $(".tab__item").on("click", function () {
    $(".tab__item").removeClass("active");
    $(this).addClass("active");
  });
    $(".tab__item.all").on("click", function () {
    $(".beers .weak").show();
    $(".beers .medium").show();
    $(".beers .strong").show();
  });
  $(".tab__item.weak").on("click", function () {
    $(".beers .weak").show();
    $(".beers .medium").hide();
    $(".beers .strong").hide();
  });
  $(".tab__item.medium").on("click", function () {
    $(".beers .medium").show();
    $(".beers .weak").hide();
    $(".beers .strong").hide();
  });
  $(".tab__item.strong").on("click", function () {
    $(".beers .strong").show();
    $(".beers .weak").hide();
    $(".beers .medium").hide();
  });
});
