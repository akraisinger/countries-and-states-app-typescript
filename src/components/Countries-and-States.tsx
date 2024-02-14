import React, { ReactElement, useState, useEffect } from 'react';


const CountriesAndStates: React.FC = ():ReactElement => {
  type CountryOrState = {
    id: number;
    code: string;
    name: string;
    countryId: number;
  }

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const compareByName = (a:CountryOrState, b:CountryOrState) => {
    return ((a.name).localeCompare(b.name));
  }

  useEffect(() => {
    fetch('https://xc-countries-api.fly.dev/api/countries/')
      .then(response => response.json())
      .then(data => setCountries(data.sort(compareByName)))
      .catch(error => console.error(error));
  }, []);

  const onChangeHandler = () => {
    const c = (document.getElementById("Country")) as HTMLSelectElement;
    const code : string = (c.options[c.selectedIndex]).value;
    if (code===""){
      setStates([]);
    }
    else {
      const url : string = `https://xc-countries-api.fly.dev/api/countries/${code}/states/`;
      fetch(url)
        .then(response => response.json())
        .then(data => setStates(data.sort(compareByName)))
        .catch(error => console.error(error));
      
    }

    
  }
  
  return (
    <div>
      <div><h1>Countries & States</h1></div>
      <label> Countries: 
      <select id="Country" style={{marginLeft: "10px"}} onChange={onChangeHandler}>
        <option value="">-- Pick a Country --</option>
      {countries.map((country:CountryOrState) => {
         return (
            <option value={country.code} key={country.id}>{country.name}</option>
         );
      })}
      </select>
      </label>

      <label id="States" style={{marginLeft: "20px"}}> States: 
      <select name="States" id="States" style={{marginLeft: "10px"}}>
      <option value="">-- Pick a State --</option>
      {states.map((state: CountryOrState) => {
         return (
            <option id={state.code} key={state.id}>{state.name}</option>
         );
      })}
      </select>
      </label>
    </div>
  );
}

export default CountriesAndStates;