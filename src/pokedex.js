
async function listFromAPI(path, selection){
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

export async function pokemonArray(selection, path, locationText, intermediateBranch) {
  const response = await listFromAPI(path,selection);
  let listArray = [];
  response[locationText].forEach((item) => {
    if(intermediateBranch) {
      listArray.push(item[intermediateBranch].name);  
    } else {
      listArray.push(item.name);
    }
  });
  console.log(listArray);
  return listArray;
}

