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
      .catch(function(error) {return error;});
  }

  async getSpeciesInfo(){
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.name}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {return error;});
  }

  async getInfo() {
    this.info = await this.getPokemonInfo();
    this.speciesInfo = await this.getSpeciesInfo();
    this.name = this.info.forms[0].name;
    this.picture = this.info.sprites.other.dream_world.front_default;
    this.type = this.info.types[0].type.name;
    this.height = this.info.height;
    this.weight = this.info.weight;
    this.habitat = this.speciesInfo.habitat.name;
    this.flavorText = this.speciesInfo.flavor_text_entries[1].flavor_text;
    this.abilities = this.listItems(this.info.abilities,"ability");
    this.moves = this.listItems(this.info.moves,"move");
    this.types = this.listItems(this.info.types,"type");
    this.eggs = this.listItems(this.speciesInfo.egg_groups);
  }

  listItems(array, term) {
    let list = "";
    array.forEach((item,index) => { 
      if(term) {
        list += item[term].name + ", ";
      } else {
        console.log(item);
        list += item.name + ", ";
      }
      if(index>5) {array.length=index+1;} // clever but terrible way to break a forEach loop
    });
    list = list.substring(0,list.length-2);
    return list;
  }
}
