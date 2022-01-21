export class Pokedex{

  filterHabitat(habitat){
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

  filterType(type){
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


  async getPokeWithHabitat(habitat) {
    const response = await this.filterHabitat(habitat);
    let habitatList = [];
    for(let i=0;i<response.pokemon_species.length;i++) {
      habitatList.push(response.pokemon_species[i].name);
    }
    console.log(habitatList);
    return habitatList;
  }

  async getPokeWithType(type) {
    const response = await this.filterType(type)
    let typeList = [];
    for(let i=0;i<response.pokemon.length;i++) {
      typeList.push(response.pokemon[i].name);
    }
    console.log(typeList);
    return typeList;
  }
  
}


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
