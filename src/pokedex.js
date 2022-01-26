export class Pokedex {
  constructor() {
    this.habitatList = [];
    this.typeList = [];
    this.fullList = [];
  }

  async listFromAPI(path, selection) {
    return fetch(`https://pokeapi.co/api/v2/${path}${selection}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
  
  async makeArray(selection, path, locationText, intermediateBranch) {
    console.log(`https://pokeapi.co/api/v2/${path}${selection}`)
    const response = await this.listFromAPI(path,selection);
    let listArray = [];
    console.log(response);
    response[locationText].forEach((item) => {
      if(intermediateBranch) {
        listArray.push(item[intermediateBranch].name);  
      } else {
        listArray.push(item.name);
      }
    });
    return listArray;
  }
  
}

export class CatchEmAll{
  static async caughtEm(){
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}

export class Sprites{
  static async showSprites(number){
      return fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`)
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
}
