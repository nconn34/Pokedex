
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { PokemonName, PokemonSpecies } from './pokemon-service.js'
import 'animate.css';


function clearFields() {
    $('#pokemon').val("");
    $('.showErrors').text("");
    $('.showName').text("");
    $('.showImg').text("");
  }
  
  function getInfo(response, species) {
    if (response.forms) {
      $('.name').text(`${response.forms[0].name}`);
      $('.card-title').html(`<img src=${response.sprites.other.dream_world.front_default}>`);
      $('.type').text(`${response.types[0].type.name}`);
      $('.height').text(`${response.height}`);
      $('.weight').text(`${response.weight}`);
      $('.showAbilities').text(`${getAbilities(response.abilities)}`);
      $('.showMoves').text(`${getMoves(response.moves)}`);
      $('.showEggs').text(`${species.egg_groups[0].name}`);
      } else {
      $('.showErrors').text(`There was an error: ${response}`);
    }
  }

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
    const species = await PokemonSpecies.getSpecies(name);
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

