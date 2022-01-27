export class Pokedex {
  constructor() {
    this.habitatList = [];
    this.typeList = [];
    this.moveList = [];
    this.displayList = [];
    this.listFilters = 0;
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
    this.listFilters++;
    return listArray;
  }

  filterList() {
    let lists = [];
    if(this.habitatList.length>0) {lists.push(this.habitatList);}
    if(this.typeList.length >0) {lists.push(this.typeList);}
    if(this.moveList.length >0) {lists.push(this.moveList);}

    if(this.listFilters === 3) {
      lists[1] = combineFilters(lists[1],lists[2]);
      this.listFilters--;
    }
    if(this.listFilters === 2) {
      lists[0] = combineFilters(lists[0],lists[1]);
      this.listFilters--;
    }
    if(this.listFilters === 1) {
      this.displayList = lists[0];
    }
  }

}

function combineFilters(arr1,arr2) {
  let common = [];
  arr1.forEach((item) => {
    if(arr2.includes(item)) {
      common.push(item);
    }
  });
  return common;
}
