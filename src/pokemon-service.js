export default class PokemonName{
    static async getPokemon(number){
        return fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
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
    static async displayPokemon(number){
        return fetch(`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${number}.svg`)
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


  // export default class WeatherService {  
  //   static async getWeather(city) {
  //     try {
  //       const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
  //       if (!response.ok) {
  //         throw Error(response.statusText);
  //       }
  //       return response.json();
  //     } catch(error) {
  //       return error.message;
  //     }
  //   }
  // }

