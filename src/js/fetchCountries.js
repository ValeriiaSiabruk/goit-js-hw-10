function fetchCountries(search) {
  return fetch(
    `https://restcountries.com/v3.1/name/${search}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
}

export default fetchCountries;
