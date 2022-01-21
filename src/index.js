import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { Pokemon } from './pokemon-service.js'
import { Pokedex } from './pokedex.js'
import 'animate.css';


function clearFields() {
  $('#pokemon').val("");
  $('.showErrors').text("");
  $('.showName').text("");
  $('.showImg').text("");
  $('.showAbilities').text("");
  $('.showMoves').text("");
  $('.showTypes').text("");
  $('.showEggs').text(""); 
  $('.showHabitat').text("");
  $('.showFlavorText').text("");
}
  
async function loadInfo(pokemon) {
  await pokemon.getInfo();
  // if (response.forms) {
  $('.name').text(pokemon.name);
  $('.card-title').html(`<img src=${pokemon.picture}>`);
  $('.type').text(pokemon.type);
  $('.height').text(pokemon.height);
  $('.weight').text(pokemon.weight);
  $('.showAbilities').text(pokemon.abilities);
  $('.showMoves').text(pokemon.moves);
  $('.showTypes').text(pokemon.types);
  $('.showEggs').text(pokemon.eggs);
  $('.showPokeHabitat').text(`Habitat: ${pokemon.habitat}`);
  $('.showFlavorText').text(`Prof. Oak Says: ${pokemon.flavorText}`);
  //   } else {
  //   $('.showErrors').text(`There was an error: ${response}`);
  // }
}

  function flipCard() {
    $('.front-of-card').toggle();
    $('.back-of-card').toggle();
  }


  
  
  
  $(document).ready(function() {
    $('#pokemonName').change(function() {
      clearFields();
      let poke = new Pokemon($('#pokemonName').val());
      loadInfo(poke);
    })
    
    $('#moreInfo').click(function() {
      flipCard();
    });
  
    // $('#selectHabitat').change(function() {
    //   let selectedHabitat = $('#selectHabitat').val();
    //   const habitatList = getPokeWithHabitat(selectedHabitat);
    //   console.log(habitatList)
    // })
    // $('#selectType').change(function() {
    //   let selectedType = $('#selectType').val();
    //   const typeList = getPokeWithType(selectedType);
    //   console.log(typeList)
    // })
  });









