import React, { ReactElement, useState, useEffect} from 'react'
import axios from "axios";

const CreateStates: React.FC = ():ReactElement => {
  type Country = {
    id: number;
    code: string;
    name: string;
  }
  type State = {
    code: string;
    name: string;
  }
  const [countries, setCountries] = useState<Country[]>([]);
  const [newStates, setNewStates] = useState<State[]>([]);
  const successMessage = document.getElementById("success-states") as HTMLParagraphElement;

  const compareByName = (a:Country, b:Country) => {
    return ((a.name).localeCompare(b.name));
  }

  useEffect(() => {
    fetch('http://localhost:8000/api/countries/')
      .then(response => response.json())
      .then(data => setCountries(data.sort(compareByName)))
      .catch(error => console.error(error));
  }, []);

  const handleAdd = () => {
    const snamein = document.getElementById("sname") as HTMLInputElement;
    const scodein = document.getElementById("scode") as HTMLInputElement;
    const sname : string = snamein.value;
    const scode : string = scodein.value;
    
    const newState : State = {
      code: scode,
      name: sname
    }
    if (scode&&sname&&scode==scode.toUpperCase()&&sname[0]==sname[0].toUpperCase()&&scode.length<4) {
      const success = document.getElementById("success");
      success?.remove();
      setNewStates([...newStates].concat(newState));
      (document.getElementById("sname") as HTMLInputElement).value = "";
      (document.getElementById("scode") as HTMLInputElement).value = "";
    } else {

      alert("Please enter a valid state!");
    }
   
  }

  const submitHandler = () => {
    const c = (document.getElementById("Country")) as HTMLSelectElement;
    const code : string = (c.options[c.selectedIndex]).value;
      const cobj = countries.find(obj=>{
        return obj.code === code
      })

    const cid = cobj?.id;
    console.log(code, cobj?.id);

    newStates.forEach(function(nstate){
      axios.post(`http://localhost:8000/api/states/`, {
        code: nstate.code,
        name: nstate.name,
        countryId: cid
      })
      .then((response) => console.log(response))
      .catch(ex => console.log(ex));

    })
    
    successMessage.innerHTML=`Successfully added states to ${cobj?.name}!`;
    setNewStates([]);

  }

  return (
    <div>
        <h1>Create States</h1>
        
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

        <form id='statesform'>
        <h2>Add States</h2>
        <label className='name'>Name:<input type="text" id="sname" name="sname"></input></label>
        <label className='code'>Code:<input type="text" id="scode" name="scode" className='code'></input></label>
        <input type="button" value="Add" style={{marginLeft:'10px'}} onClick={handleAdd}></input><br></br>
        <h4>States</h4>
        {newStates.map((newstate:State) => {
            return (
              <div>
                <label className="newstatename">{newstate.name} </label>
                <label className="newstatecode">{newstate.code}</label>
              </div>
            );
            })}
        <p id="success-states"></p>
        <input id="submit-states" type="button" value="Submit" onClick={submitHandler}></input>
        </form>
    </div>
  )
}

export default CreateStates;