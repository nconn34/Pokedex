import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { PokemonName, PokemonSpecies } from './pokemon-service.js'
<<<<<<< HEAD
=======
import 'animate.css';
>>>>>>> 60130733c5323735ce0beda47a68d3722f31b505


function clearFields() {
    $('#pokemon').val("");
    $('.showErrors').text("");
    $('.showName').text("");
    $('.showImg').text("");
  }
  
  function getInfo(response, species) {
    if (response.forms) {
<<<<<<< HEAD
      $('.showName').text(`Name: ${response.forms[0].name}`);
      $('.showImg').html(`<img src=${response.sprites.other.dream_world.front_default}>`);
      $('.showAbilities').text(`Abilities: ${getAbilities(response.abilities)}`);
      $('.showMoves').text(`Moves: ${getMoves(response.moves)}`);
      $('.showTypes').text(`Types: ${getTypes(response.types)}`);
      $('.showEggs').text(`Egg Group: ${species.egg_groups[0].name}`);
=======
      $('.name').text(`${response.forms[0].name}`);
      $('.card-title').html(`<img src=${response.sprites.other.dream_world.front_default}>`);
      $('.type').text(`${response.types[0].type.name}`);
      $('.height').text(`${response.height}`);
      $('.weight').text(`${response.weight}`);
      $('.showAbilities').text(`${getAbilities(response.abilities)}`);
      $('.showMoves').text(`${getMoves(response.moves)}`);
      $('.showEggs').text(`${species.egg_groups[0].name}`);
>>>>>>> 60130733c5323735ce0beda47a68d3722f31b505
      } else {
      $('.showErrors').text(`There was an error: ${response}`);
    }
  }

<<<<<<< HEAD
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
=======
  function flipCard() {
    $('.front-of-card').toggle();
    $('.back-of-card').toggle();
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
>>>>>>> 60130733c5323735ce0beda47a68d3722f31b505
    }
    return types
  }

  function getAbilities(abilitiesArray) {
    let ability = "";
    for (let i = 0; i <abilitiesArray.length; i++){
<<<<<<< HEAD
     ability += abilitiesArray[i].ability.name + ", ";
=======
      ability += abilitiesArray[i].ability.name + ", ";
>>>>>>> 60130733c5323735ce0beda47a68d3722f31b505
    }
    return ability
  }
  
<<<<<<< HEAD
  async function makeApiCall(name) {
    const response = await PokemonName.getPokemon(name);
    const species = await PokemonSpecies.getSpecies(name);
    console.log(species);
=======
  async function makeApiCall(number) {
    const response = await PokemonName.getPokemon(number);
    const species = await PokemonSpecies.getSpecies(name);
>>>>>>> 60130733c5323735ce0beda47a68d3722f31b505
    getInfo(response, species);
  }
  
  $(document).ready(function() {
    $('#pokemonID').click(function() {
      let pokemon = $('#pokemonNum').val();
      clearFields();
      makeApiCall(pokemon);
    });
    $('#moreInfo').click(function() {
      flipCard();
    });
    // $('#Habitat').change(function() {
    //   habitat = $('#Habitat').val();
    //   const response = await PokemonName.filterHabitat(habitat);
    //   console.log(response)
    //   getInfo(response, species);
    // })
  });
      // let all = [];
      // for(i=1;i<897;i++) {
      //   all.push(i);
      // }
      // if($('#pokemonNum').val()>0) {
      //   let pokemon = $('#pokemonNum').val();
      //   clearFields();
      //   makeApiCall(pokemon);
      // } else {
      //   if($('#habitat').val()===null) {
      //     habitat = all;
      //   } else {
      //     habitat = $('#habitat').val();
          
      //   }
      // }
  //   });
  // });




