export class Pokemon{
  constructor(name) {
    this.name = name;
    this.info = {};
    this.speciesInfo = {};
  }

  async getPokemonInfo(){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(error) {return error;})
  }

  async getSpeciesInfo(){
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.name}`)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(error) {return error;})
  }

  async loadInfo() {
    this.info = await this.getPokemonInfo();
    this.speciesInfo = await this.getSpeciesInfo();
  }

  getMoves(movesArray){
    let moves = "";
    for (let i = 0; i <movesArray.length; i++){
      moves += movesArray[i].move.name + ", ";
    }
    return moves
  }

  getPokeTypes(typesArray) {
    let types = "";
    for (let i = 0; i <typesArray.length; i++){
      types += typesArray[i].type.name + ", ";
    }
    return types
  }

  getAbilities(abilitiesArray) {
    let ability = "";
    for (let i = 0; i <abilitiesArray.length; i++){
      ability += abilitiesArray[i].ability.name + ", ";
    }
    return ability
  }

}






// export class PokemonHabitat{
//   static async getHabitat(name){
//       return fetch(`https://pokeapi.co/api/v2/pokemon-habitat`)
//       .then(function(response) {
//         if (!response.ok) {
//           throw Error(response.statusText);
//         }
//         return response.json();
//       })
//       .catch(function(error) {
//         return error;
//       })
//   }
// }


