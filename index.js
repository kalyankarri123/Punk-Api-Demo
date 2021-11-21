

const endpoint = "https://api.punkapi.com/v2/beers"; 

$.getJSON(endpoint, function (data) {
  
  console.log(data);
  let allBeers = data.filter(beer => beer.abv <= 4.5 && beer.abv > 7.5 &&  beer.abv >50 );
  let weakBeers = data.filter(beer => beer.abv <= 4.5);
  let medBeers = data.filter(beer => beer.abv > 4.5 && beer.abv <= 7.5);
  let strongBeers = data.filter(beer => beer.abv > 7.5 && beer.abv <= 50); 
  function Display(range, percent) {
    let beerHtml = range.map(item => `
        <div class = 'beer-wrapper'>
        <div class = "beer ${percent}">
          <h3 class="beer__name">${item.name}</h3>
          <img class ="beer__img" src = "${item.image_url}">
          <h4 class ="beer__tagline">${item.tagline}</h4>
         </div> 
             <div class ="pop-up">
          <i class="fa fa-window-close-o" aria-hidden="true"></i>
            <h3 class ="title">Description</h3>
            <h2>${item.name}</h2>
              <p>Tagline: ${item.tagline}</p>
              <p>Descripition: ${item.description}</p>
             <p>Date of First Brewed: ${item.first_brewed}</p>
            <h3 class ="title">Food Pairing</h3>
              <ul>
               ${item.food_pairing
                 .map(ingredient => `<li>${ingredient}</li>`)
                 .join("")}
              </ul>
              <button type="button" class="button">Close</button>
          </div>
        </div>
       
            `);
    $(".beers").append(beerHtml);
  } 
    Display(allBeers, "all");
  Display(weakBeers, "weak");
  Display(medBeers, "medium");
  Display(strongBeers, "strong"); 
$(".beer img").on("click", function () {
  $(this).closest(".beer-wrapper").find(".pop-up").show(1000);
   $(".bg").show(0);
});
$(".button").on("click", function () {
  $(".pop-up").hide(1000);
    $(".bg").hide(0); 
});
  $(".beer").css("display", "none");
  $(".beers .medium").css("display", "block"); 
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
    $(".beers .all").hide();
    $(".beers .weak").show();
    $(".beers .medium").hide();
    $(".beers .strong").hide();
  });
  $(".tab__item.medium").on("click", function () {
    $(".beers .all").hide();
    $(".beers .medium").show();
    $(".beers .weak").hide();
    $(".beers .strong").hide();
  });
  $(".tab__item.strong").on("click", function () {
    $(".beers .all").hide();
    $(".beers .strong").show();
    $(".beers .weak").hide();
    $(".beers .medium").hide();
  });
});
