import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { Pokemon } from './pokemon-service.js'
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
  
  function loadInfo(response, species) {
    if (response.forms) {
      $('.name').text(`${response.forms[0].name}`);
      $('.card-title').html(`<img src=${response.sprites.other.dream_world.front_default}>`);
      $('.type').text(`${response.types[0].type.name}`);
      $('.height').text(`${response.height}`);
      $('.weight').text(`${response.weight}`);
      // $('.showAbilities').text(`${getAbilities(response.abilities)}`);
      // $('.showMoves').text(`${getMoves(response.moves)}`);
      // $('.showTypes').text(`Types: ${getPokeTypes(response.types)}`);
      $('.showEggs').text(`Egg Group: ${getEggs(species.egg_groups)}`);
     $('.showPokeHabitat').text(`Habitat: ${species.habitat.name}`);
     $('.showFlavorText').text(`Prof. Oak Says: ${species.flavor_text_entries[1].flavor_text}`);
      } else {
      $('.showErrors').text(`There was an error: ${response}`);
    }
  }

  function flipCard() {
    $('.front-of-card').toggle();
    $('.back-of-card').toggle();
  }

//   function getMoves(movesArray){
//     let moves = "";
//     for (let i = 0; i <movesArray.length; i++){
//       moves += movesArray[i].move.name + ", ";
//     }
//     return moves
// }

//   function getPokeTypes(typesArray) {
//     let types = "";
//     for (let i = 0; i <typesArray.length; i++){
//       types += typesArray[i].type.name + ", ";
//     }
//     return types
//   }

//   function getAbilities(abilitiesArray) {
//     let ability = "";
//     for (let i = 0; i <abilitiesArray.length; i++){
//       ability += abilitiesArray[i].ability.name + ", ";
//     }
//     return ability
//   }

  function getEggs(eggsArray) {
    let eggs = "";
    for (let i = 0; i <eggsArray.length; i++){
     eggs += eggsArray[i].name + ", ";
    }
    console.log(eggs)
    return eggs
  }
  
  function filterHabitat(habitat){
    return fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${habitat}`)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(error) {
      return error;
    })
  }
  
  function filterType(type){
    return fetch(`https://pokeapi.co/api/v2/type/${type}`)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(error) {
      return error;
    })
  }


  async function getPokeWithHabitat(habitat) {
      const response = await filterHabitat(habitat);
      let habitatList = [];
      for(let i=0;i<response.pokemon_species.length;i++) {
        habitatList.push(response.pokemon_species[i].name);
      }
      console.log(habitatList);
      return habitatList;
  }

  async function getPokeWithType(type) {
    const response = await filterType(type)
    let typeList = [];
    for(let i=0;i<response.pokemon.length;i++) {
      typeList.push(response.pokemon[i].name);
    }
    console.log(typeList);
    return typeList;
  }

  $(document).ready(function() {
    $('#pokemonID').click(function() {
      let pName = $('#pokemonName').val();
      clearFields();
      let poke = new Pokemon(pName);
      console.log(poke);
      console.log(poke);
      poke.loadInfo();
      console.log(poke.info.forms[0].name);
      console.log(poke.speciesInfo);
    });
    // $('#moreInfo').click(function() {
    //   flipCard();
    // });
  
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




