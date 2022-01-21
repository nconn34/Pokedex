import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { PokemonName, PokemonSpecies, CatchEmAll } from './pokemon-service.js'
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
   $('.showEmAll').text("");
  }
  
  function getInfo(response, species) {
    if (response.forms) {
      $('.name').text(`${response.forms[0].name}`);
      $('.card-title').html(`<img src=${response.sprites.other.dream_world.front_default}>`);
      $('.type').text(`${response.types[0].type.name}`);
      $('.height').text(`${response.height}`);
      $('.weight').text(`${response.weight}`);
      $('.showAbilities').text(`${getAbilities(response.abilities)}`);
      $('.showMoves').text(` ${getMoves(response.moves)}`);
      $('.showTypes').text(`Types: ${getTypes(response.types)}`);
      $('.showEggs').text(`Egg Group: ${getEggs(species.egg_groups)}`);
     $('.showHabitat').text(`Habitat: ${species.habitat.name}`);
     $('.showFlavorText').text(`Prof. Oak Says: ${species.flavor_text_entries[1].flavor_text}`);
      } else {
      $('.showErrors').text(`There was an error: ${response}`);
    }
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

  function getEggs(eggsArray) {
    let eggs = "";
    for (let i = 0; i <eggsArray.length; i++){
     eggs += eggsArray[i].name + ", ";
    }
    console.log(eggs)
    return eggs
  }
  
  async function makeApiCall(name) {
    const response = await PokemonName.getPokemon(name);
    const species = await PokemonSpecies.getSpecies(name);
    getInfo(response, species);
  }

  async function themAll() {
    const generation = await CatchEmAll.caughtEm();
    displayAll(generation);
  }
  
  async function getHabitat(habitat) {
      const response = await PokemonName.filterHabitat(habitat);
      let habitatList = [];
      for(let i=0;i<response.pokemon_species.length;i++) {
        habitatList.push(response.pokemon_species[i].name);
      }
      console.log(habitatList);
      return habitatList;
  }

  async function getType(type) {
    const response = await PokemonName.filterType(type)
    let typeList = [];
    for(let i=0;i<response.pokemon.length;i++) {
      typeList.push(response.pokemon[i].name);
    }
    console.log(typeList);
    return typeList;
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
    $('#catchEm').click(function(){
      themAll();
    })
  
    $('#selectHabitat').change(function() {
      let selectedHabitat = $('#selectHabitat').val();
      const habitatList = getHabitat(selectedHabitat);
      console.log(habitatList)
    })
    $('#selectType').change(function() {
      let selectedType = $('#selectType').val();
      const typeList = getType(selectedType);
      console.log(typeList)
    })
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




