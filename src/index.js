
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import PokemonName from './pokemon-service.js'


function clearFields() {
    $('#pokemon').val("");
    $('.showErrors').text("");
    $('.showName').text("");
    $('.showImg').text("");
  }
  
  function getInfo(response, image) {
    if (response.forms) {
      $('.showName').text(`${response.forms[0].name}`);
      $('.showImg').image(`${response.forms[0].name}`);
    } else {
      $('.showErrors').text(`There was an error: ${response}`);
    }
  }
  
  async function makeApiCall(number) {
    const response = await PokemonName.getPokemon(number);
    const image = await PokemonName.displayPokemon(number);
    getInfo(response, image);
  }
  
  $(document).ready(function() {
    $('#pokemonID').click(function() {
      let pokemon = $('#pokemonNum').val();
      clearFields();
      makeApiCall(pokemon);
    });
  });

// function clearFields() {
//   $('#name').val("");
//   $('.showErrors').text("");
//   // $('.showPokemonInfo').text("");
// }

// function getElements(response) {
//   if (response.main) {
//     // $('.showPokemonInfo').text(`insert pokemon info for ${pokemonInfo} `);
//   } else {
//         $('.showErrors').text(`There was an error: ${response.message}`);
// }

// $(document).ready(function() {
//   $(`#pokemon?`).click(function() {
//     let pokemon = $(`#pokemon`).val();
//     clearFields()
//     PokemonService.getPokemon(name)
//       .then(function(response) {
//         getElements(response)
//       })
//   })
// }




// function clearFields() {
//   $('#city').val("");
//   $('#state').val("");
//   $('.showErrors').text("");
//   $('.showHumidity').text("");
//   $('.showTemp').text("");
//   $('.showWindSpeed').text("");
// }

// function getElements(response) {
//   if (response.main) {
//     $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
//     $('.showTemp').text(`The temperature ${response.main.temp} degrees Kelvin, or ${tempConverter(response.main.temp)} degrees Fahrenheit.`);
//     $('.showWindSpeed').text(`The wind speed is ${response.wind.speed} m/s.`);
//   } else {
//     $('.showErrors').text(`There was an error: ${response.message}`);
//   }
// }

// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     const city = $('#city').val();
//     const state = $('#state').val();
//     clearFields();
//     WeatherService.getWeather(city, state)
//       .then(function(response) {
//         getElements(response);
//       });
//   });
// });