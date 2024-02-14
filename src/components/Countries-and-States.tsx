import React, { ReactElement, useState, useEffect } from 'react';
import axios from "axios";

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
    axios.get('https://xc-countries-api.fly.dev/api/countries/').then((response)=> {
      setCountries(response.data.sort(compareByName));
    });
  }, []);

  const onChangeHandler = () => {
    const c = (document.getElementById("Country")) as HTMLSelectElement;
    const code : string = (c.options[c.selectedIndex]).value;
    if (code===""){
      setStates([]);
    }
    else {
      const url : string = `https://xc-countries-api.fly.dev/api/countries/${code}/states/`;
      axios.get(url).then((response)=> {
        setStates(response.data.sort(compareByName));
      });
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