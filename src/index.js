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

function capitalize(string) {
  const letters = string.split("");
  const capitolLetter = letters[0].toUpperCase();
  letters.shift()
  letters.unshift(capitolLetter)
  const capitolWord = letters.join("")
  console.log(capitolWord)
  return capitolWord
}
  
async function loadCard(pokemon) {
  await pokemon.getInfo();
  $('.name').text(capitalize(pokemon.name));
  $('.card-title').html(`<img src=${pokemon.picture}>`);
  $('.type').text(capitalize(pokemon.type));
  $('.height').text(pokemon.height);
  $('.weight').text(pokemon.weight);
  $('.showAbilities').text(capitalize(pokemon.abilities));
  $('.showMoves').text(capitalize(pokemon.moves));
  $('.showTypes').text(capitalize(pokemon.types));
  $('.showEggs').text(capitalize(pokemon.eggs));
  $('.showPokeHabitat').text(`Habitat: ${pokemon.habitat}`);
  $('.showFlavorText').text(`Prof. Oak Says: ${pokemon.flavorText}`);
}

async function loadCard2(pokemon2) {
  await pokemon2.getInfo();
  $('.name2').text(capitalize(pokemon2.name));
  $('.card-title2').html(`<img src=${pokemon2.picture}>`);
  $('.type2').text(capitalize(pokemon2.type));
  $('.height2').text(pokemon2.height);
  $('.weight2').text(pokemon2.weight);
  $('.showAbilities2').text(capitalize(pokemon2.abilities));
  $('.showMoves2').text(capitalize(pokemon2.moves));
  $('.showTypes2').text(capitalize(pokemon2.types));
  $('.showEggs2').text(capitalize(pokemon2.eggs));
  $('.showPokeHabitat2').text(`Habitat: ${pokemon2.habitat}`);
  $('.showFlavorText2').text(`Prof. Oak Says: ${pokemon2.flavorText}`);
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



$(document).ready(function() {
  $('#pokemonID').click(function() {
    // clearFields();
    let pokeInput = $('#pokemonName').val()
    let pokemon = new Pokemon(pokeInput.toLowerCase());
    loadCard(pokemon);
  });
  $('#pokemonID2').click(function() {
    let pokeInput = $('#pokemonName').val()
    let pokemon2 = new Pokemon(pokeInput.toLowerCase());
    loadCard2(pokemon2);
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
});
