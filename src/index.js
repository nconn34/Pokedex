import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { Pokemon } from './pokemon.js';
import { Pokedex } from './pokedex.js';
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
  
async function loadCard(pokemon) {
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

async function loadList(pokedex) {
  if($('#selectHabitat').val() !== "default") {
    pokedex.habitatList = await pokedex.makeArray($('#selectHabitat').val(), "pokemon-habitat","pokemon_species");
    $("#pokedexList").text(pokedex.habitatList);
  }
  if($('#selectType').val() !== "default") {
    pokedex.typeList = await pokedex.makeArray($('#selectType').val(), "type","pokemon","pokemon");
    $("#pokedexList").text(pokedex.typeList);
  }
}

$(document).ready(function() {
  $('#pokemonName').change(function() {
    clearFields();
    let pokemon = new Pokemon($('#pokemonName').val());
    loadCard(pokemon);
  });

  $('#moreInfo').click(function() {
    flipCard();
  });
  
  $("#pokedexID").click(function() {
    let pokedex = new Pokedex();
    loadList(pokedex);
  });

});
