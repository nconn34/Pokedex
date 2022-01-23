import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { Pokemon } from './pokemon.js';
import { Pokedex, CatchEmAll } from './pokedex.js';
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

function displayAll(generation){
  let pokemonArray = generation.results
  let pokemonList = $("ul#list");
  let ball = ""
  pokemonArray.forEach(element => {
    ball +=  "<li>" + element.name +"</li>"
  });
  pokemonList.html(ball)
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
  async function themAll() {
    const generation = await CatchEmAll.caughtEm();
    displayAll(generation);
  }



function getInfo2(response, species) {
  if (response.forms) {
    $('.name2').text(`${response.forms[0].name}`);
    $('.card-title2').html(`<img src=${response.sprites.other.dream_world.front_default}>`);
    $('.type2').text(`${response.types[0].type.name}`);
    $('.height2').text(`${response.height}`);
    $('.weight2').text(`${response.weight}`);
    $('.showAbilities2').text(`${getAbilities(response.abilities)}`);
    $('.showMoves2').text(`${getMoves(response.moves)}`);
    $('.showTypes2').text(`${getTypes(response.types)}`);
    $('.showEggs2').text(`${getEggs(species.egg_groups)}`);
    $('.showHabitat2').text(`Habitat: ${species.habitat.name}`);
    $('.showFlavorText2').text(`Prof. Oak Says: ${species.flavor_text_entries[1].flavor_text}`);
    } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

async function makeApiCall2(name) {
  const response = await PokemonName.getPokemon(name);
  const species = await PokemonSpecies.getSpecies(name);
  getInfo2(response, species);
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
  $('#catchEm').click(function(){
    themAll();
  });
  $("#pokedexID").click(function() {
    let pokedex = new Pokedex();
    loadList(pokedex);
  });
  $('#pokemonID2').click(function() {
    let pokemon = $('#pokemonNum').val();
    makeApiCall2(pokemon);
  });
});
