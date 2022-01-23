import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { Pokemon } from './pokemon.js';
import { pokemonArray } from './pokedex.js';
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
}

function flipCard() {
  $('.front-of-card').toggle();
  $('.back-of-card').toggle();
}
  
$(document).ready(function() {
  $('#pokemonName').change(function() {
    clearFields();
    let pokemon = new Pokemon($('#pokemonName').val());
    loadInfo(pokemon);
  });
  
  $('#moreInfo').click(function() {
    flipCard();
  });

  $('#selectHabitat').change(function() {
    const selectedHabitat = $('#selectHabitat').val();
    pokemonArray(selectedHabitat, "pokemon-habitat","pokemon_species");
  });

  $('#selectType').change(function() {
    const selectedType = $('#selectType').val();
    pokemonArray(selectedType, "type","pokemon","pokemon");
  });
});









