import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { PokemonSolo } from './pokemon.js';
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
  
async function loadCard(pokemon, card) {
  await pokemon.getInfo();
  $('.name' + card).text(pokemon.name);
  $('.card-title' + card).html(`<img src=${pokemon.picture}>`);
  $('.type' + card).text(pokemon.type);
  $('.height' + card).text(pokemon.height);
  $('.weight' + card).text(pokemon.weight);
  $('.showAbilities' + card).text(pokemon.abilities);
  $('.showMoves' + card).text(pokemon.moves);
  $('.showTypes' + card).text(pokemon.types);
  $('.showEggs' + card).text(pokemon.eggs);
  $('.showPokeHabitat' + card).text(`Habitat: ${pokemon.habitat}`);
  $('.showFlavorText' + card).text(`Prof. Oak Says: ${pokemon.flavorText}`);
  $('.card' + card).show();
}


function flipCard() {
  $('.front-of-card').toggle();
  $('.back-of-card').toggle();
}



function showList(pokemonArray) {
  let pokemonList = $("ul#list");
  let ball = "";
  pokemonArray.forEach(element => {
    ball +=  (`<li><button id="select-${element}">Select</button><button id="show-${element}">Show Card</button>  ${element}</li>`);
  });
  pokemonList.html(ball);
}


async function loadList(pokedex) {
  if($('#selectHabitat').val() !== "default") {
    pokedex.habitatList = await pokedex.makeArray($('#selectHabitat').val(), "pokemon-habitat/","pokemon_species");
  }
  if($('#selectType').val() !== "default") {
    pokedex.typeList = await pokedex.makeArray($('#selectType').val(), "type/", "pokemon","pokemon");
  }
  if($('#selectMove').val() !== "default") {
    pokedex.moveList = await pokedex.makeArray($('#selectMove').val(), "move/","learned_by_pokemon");
  }
  pokedex.makeList();
  showList(pokedex.displayList);
}


$(document).ready(function() {
  $(document).click(function(event) {
    const target = event.target;
    if(target.type === "submit") {
      if(target.id.substring(0,6) === "select") {
        console.log("select one");
      } else if(target.id.substring(0,4) === "show") {
        let pokemon = new PokemonSolo(target.id.substring(5));
        loadCard(pokemon,"");
      }
    }
  });
  $('#pokemonID').click(function() {
    let pokemon = new PokemonSolo($('#pokemonName').val());
    loadCard(pokemon,"");
  });
  $('#pokemonID2').click(function() {
    let pokemon = new PokemonSolo($('#pokemonName').val());
    loadCard(pokemon,"2");
  });
  $('#moreInfo').click(function() {
    flipCard();
  });
  
  $("#filterList").click(function() {
    let pokedex = new Pokedex();
    loadList(pokedex);
  });
});
