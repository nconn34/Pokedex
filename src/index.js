import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { PokemonSolo } from './pokemon.js';
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

async function loadCard2(pokemon2) {
  await pokemon2.getInfo();
  $('.name2').text(pokemon2.name);
  $('.card-title2').html(`<img src=${pokemon2.picture}>`);
  $('.type2').text(pokemon2.type);
  $('.height2').text(pokemon2.height);
  $('.weight2').text(pokemon2.weight);
  $('.showAbilities2').text(pokemon2.abilities);
  $('.showMoves2').text(pokemon2.moves);
  $('.showTypes2').text(pokemon2.types);
  $('.showEggs2').text(pokemon2.eggs);
  $('.showPokeHabitat2').text(`Habitat: ${pokemon2.habitat}`);
  $('.showFlavorText2').text(`Prof. Oak Says: ${pokemon2.flavorText}`);
}

function flipCard() {
  $('.front-of-card').toggle();
  $('.back-of-card').toggle();
}

function displayAll(generation){
  let pokemonArray = generation.results;
  let pokemonList = $("ul#list");
  let ball = "";
  let sprite = "";
  pokemonArray.forEach(element => {
    sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`
    ball +=  `<li><button id="select-${element.name}">Card 1</button><button id="show-${element.name}">Card 2</button> ${element.name} ${sprite}</li>`;
  });
  pokemonList.html(ball);
}

async function loadList(pokedex) {
  if($('#selectHabitat').val() !== "default") {
    pokedex.habitatList = await pokedex.makeArray($('#selectHabitat').val(), "pokemon-habitat/","pokemon_species");
    $("#pokedexList").text(pokedex.habitatList);
  }
  if($('#selectType').val() !== "default") {
    pokedex.typeList = await pokedex.makeArray($('#selectType').val(), "type","pokemon/","pokemon");
    $("#pokedexList").text(pokedex.typeList);
  }
}


// async function loadDefault(pokedex) {
//   pokedex.fullList = await pokedex.makeArray("pokemon?limit=151","","");
//   showList(pokedex.fullList);
// }

// 

async function themAll() {
  const generation = await CatchEmAll.caughtEm();
  displayAll(generation);
}


$(document).ready(function() {
  themAll();
  $(document).click(function(event) {
    // const btn = $(event.target).text();
    const id = event.target.id;
    if(event.target.type === "submit") {
      if(id.substring(0,6) === "select") {
        console.log(id & " for team");
      } else(id.substring(0,4) === "show"); {
        let pokemon = new PokemonSolo(id.substring(5));
        loadCard(pokemon);
      }
    }
  });
  $('#pokemonID').click(function() {
    // clearFields();
    let pokemon = new PokemonSolo($('#pokemonName').val());
    loadCard(pokemon);
  });
  $('#pokemonID2').click(function() {
    let pokemon2 = new PokemonSolo($('#pokemonName').val());
    loadCard2(pokemon2);
  });
  $('#moreInfo').click(function() {
    flipCard();
  });
  $('#catchEm').click(function() {
    // let pokedex = new Pokedex();
    // loadDefault(pokedex);
    themAll();
  });
  $("#pokedexID").click(function() {
    let pokedex = new Pokedex();
    loadList(pokedex);
  });
});

// $(document).getElementById("list").onclick = function() {loadCard(element.name)};
