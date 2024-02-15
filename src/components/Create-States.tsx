import React, { ReactElement, useState, useEffect} from 'react'
import axios from "axios";

const CreateStates: React.FC = ():ReactElement => {
  type Country = {
    id: number;
    code: string;
    name: string;
  }
  const [countries, setCountries] = useState<Country[]>([]);

  const compareByName = (a:Country, b:Country) => {
    return ((a.name).localeCompare(b.name));
  }

  useEffect(() => {
    fetch('https://xc-countries-api.fly.dev/api/countries/')
      .then(response => response.json())
      .then(data => setCountries(data.sort(compareByName)))
      .catch(error => console.error(error));
  }, []);

  const submitHandler = () => {
    const snamein = document.getElementById("sname") as HTMLInputElement;
    const scodein = document.getElementById("scode") as HTMLInputElement;
    const sname : string = snamein.value;
    const scode : string = scodein.value;
    console.log(sname, scode);
    
    const c = (document.getElementById("Country")) as HTMLSelectElement;
    const code : string = c.value;
    const cobj = countries.find(obj=>{
      return obj.code === code
    })
    const cid = cobj?.id;

    console.log(code, cid);
    console.log(`https://xc-countries-api.fly.dev/api/countries/${code}/states`);
    
    axios.post(`https://xc-countries-api.fly.dev/api/states/`, {
        code: scode,
        name: sname,
        countryId: cid
    });
    
    (document.getElementById("sname") as HTMLInputElement).value = "";
    (document.getElementById("scode") as HTMLInputElement).value = "";
    
  }

  return (
    <div>
        <h1>Create States</h1>
        <label> Country: 
            <select id="Country" style={{marginLeft: "10px"}}>
            <option value="">-- Pick a Country --</option>
            {countries.map((country:Country) => {
            return (
                <option value={country.code}>{country.name}</option>
            );
            })}
        </select>
        </label>
        <h2>Add States</h2>
        <label>Name:<input type="text" id="sname" name="sname"></input></label>
        <label className='code'>Code:<input type="text" id="scode" name="scode" className='code'></input></label>
        <input type="button" value="Submit" onClick={submitHandler}></input>
    </div>
  )
}

export default CreateStates;