
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
  
  function getInfo(response) {
    if (response.forms) {
      $('.showName').text(`${response.forms[0].name}`);
      $('.showImg').html(`<img src=${response.sprites.other.dream_world.front_default}>`);
      } else {
      $('.showErrors').text(`There was an error: ${response}`);
    }
  }

//   function getImg(response){
//     console.log(response);
//       if (response) {
//         $('.showImg').html(`<img src=${response.}>`);
//       } else {
//         $('.showErrors').text(`There was an error: ${response}`);
//       }
//   }
  
  async function makeApiCall(number) {
    const response = await PokemonName.getPokemon(number);
    // const image = await PokemonName.displayPokemon(number);
    getInfo(response);
    // getImg(response);
  }
  
  $(document).ready(function() {
    $('#pokemonID').click(function() {
      let pokemon = $('#pokemonNum').val();
      clearFields();
      makeApiCall(pokemon);
    });
  });

