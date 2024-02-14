import React, { ReactElement, useState, useEffect} from 'react'

const CreateStates: React.FC = ():ReactElement => {
  type Country = {
    id: number;
    code: string;
    name: string;
  }
  const [countries, setCountries] = useState([]);
  const compareByName = (a:Country, b:Country) => {
    return ((a.name).localeCompare(b.name));
  }
  useEffect(() => {
    fetch('https://xc-countries-api.fly.dev/api/countries/')
      .then(response => response.json())
      .then(data => setCountries(data.sort(compareByName)))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
        <h1>Create States</h1>
        <form>
        <label> Country: 
            <select id="Country" style={{marginLeft: "10px"}}>
            <option value="">-- Pick a Country --</option>
            {countries.map((country:Country) => {
            return (
                <option value={country.code} key={country.id}>{country.name}</option>
            );
            })}
        </select>
        </label>
        <h2>Add States</h2>
        <label>Name:<input type="text" id="sname" name="sname"></input></label>
        <label className='code'>Code:<input type="text" id="scode" name="scode" className='code'></input></label>
        <input type="button" value="Add" style={{marginLeft:'10px'}}></input><br></br>
        <input type="submit" value="Submit" ></input>
        </form>
    </div>
  )
}

export default CreateStates;