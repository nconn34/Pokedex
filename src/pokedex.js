export class Pokedex {
  constructor() {
    this.habitatList = [];
    this.typeList = [];
    this.moveList = [];
    this.displayList = [];
  }

  async makeList() {
    let lists = [];
    let numLists = 0;
      
    if(this.habitatList.length >0) {
      lists[numLists] = this.habitatList;
      numLists++;
    }else if(this.typeList.length >0) {
      lists[numLists] = this.typeList;
      numLists++;
    }else if(this.moveList.length >0) {
      lists[numLists] = this.moveList;
      numLists++;
    }else {
      this.displayList = await this.makeArray("pokemon?limit=151","","results");
    }

    
    if(numLists === 1) {
      this.displayList = lists[0];
    }
    console.log(numLists + "lists");
  }

  async listFromAPI(apiPath, selection) {
    return fetch(`https://pokeapi.co/api/v2/${apiPath}${selection}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) { return error; });
  }
  
  async makeArray(selection, apiPath, jsonArray, jsonBranchToName) {
    const response = await this.listFromAPI(apiPath,selection);
    let listArray = [];
    response[jsonArray].forEach((item) => {
      if(jsonBranchToName) {
        listArray.push(item[jsonBranchToName].name);  
      } else {
        listArray.push(item.name);
      }
    });
    return listArray;
  }
  
}
