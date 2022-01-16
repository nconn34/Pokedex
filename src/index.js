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
      $('.showName').text(`Name: ${response.forms[0].name}`);
      $('.showImg').html(`<img src=${response.sprites.other.dream_world.front_default}>`);
      $('.showAbilities').text(`Abilities: ${getAbilities(response.abilities)}`);
      $('.showMoves').text(`Moves: ${getMoves(response.moves)}`);
      $('.showTypes').text(`Types: ${getTypes(response.types)}`);
      } else {
      $('.showErrors').text(`There was an error: ${response}`);
    }
  }
   
 function getMoves(movesArray){
   let moves = "";
   for (let i = 0; i <movesArray.length; i++){
     moves += movesArray[i].move.name + ", ";
   }
   return moves
  }

  function getTypes(typesArray) {
    let types = "";
    for (let i = 0; i <typesArray.length; i++){
     types += typesArray[i].type.name + ", ";
    }
    return types
  }

  function getAbilities(abilitiesArray) {
    let ability = "";
    for (let i = 0; i <abilitiesArray.length; i++){
     ability += abilitiesArray[i].ability.name + ", ";
    }
    return ability
  }
  
  async function makeApiCall(number) {
    const response = await PokemonName.getPokemon(number);
    getInfo(response);
  }
  
  $(document).ready(function() {
    $('#pokemonID').click(function() {
      let pokemon = $('#pokemonNum').val();
      clearFields();
      makeApiCall(pokemon);
    });
  });

