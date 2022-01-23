export class Pokedex {
  constructor() {
    this.habitatList = [];
    this.typeList = [];
  }

  async listFromAPI(path, selection) {
    return fetch(`https://pokeapi.co/api/v2/${path}/${selection}`)
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
    const response = await this.listFromAPI(path,selection);
    let listArray = [];
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
      })
  }
}
