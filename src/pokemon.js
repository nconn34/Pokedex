export class PokemonSolo{
  constructor(name) {
    this.name = name;
  }

  async callAPI(path) {
    console.log(path & this.name);
    return fetch(`https://pokeapi.co/api/v2${path}${this.name}`)
      .then(function(response) {
        if (!response.ok) {throw Error(response.statusText);}
        return response.json();
      })
      .catch(function(error) {return error;});
  }

  async getInfo() {
    this.pokemonInfo = await this.callAPI("/pokemon/");
    this.speciesInfo = await this.callAPI("/pokemon-species/");
    this.name = this.pokemonInfo.forms[0].name;
    this.picture = this.pokemonInfo.sprites.other.dream_world.front_default;
    this.type = this.pokemonInfo.types[0].type.name;
    this.height = this.pokemonInfo.height;
    this.weight = this.pokemonInfo.weight;
    this.habitat = this.speciesInfo.habitat.name;
    this.flavorText = this.speciesInfo.flavor_text_entries[1].flavor_text;
    this.abilities = listItems(this.pokemonInfo.abilities,"ability");
    this.moves = listItems(this.pokemonInfo.moves,"move");
    this.types = listItems(this.pokemonInfo.types,"type");
    this.eggs = listItems(this.speciesInfo.egg_groups);
  }
}

function listItems(array, intermediateBranch) {
  let list = "";
  array.forEach((item,index) => { 
    if(intermediateBranch) {
      list += item[intermediateBranch].name + ", ";
    } else {
      list += item.name + ", ";
    }
    if(index>4) {array.length=index+1;} // terrible & irresponsible hack to break a forEach loop
  });
  list = list.substring(0,list.length-2);
  return list;
}