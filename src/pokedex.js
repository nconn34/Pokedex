
async function getFiltered(setupText, selection){
  return fetch(`https://pokeapi.co/api/v2/${setupText}/${selection}`)
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

export async function getArrayWith(selection, setupText, locationText, term) {
  const response = await getFiltered(setupText,selection);
  let filteredArray = [];
  response[locationText].forEach((item) => {
    if(term) {
      filteredArray.push(item[term].name);  
    } else {
      filteredArray.push(item.name);
    }
  });
  console.log(filteredArray);
  return filteredArray;
}

