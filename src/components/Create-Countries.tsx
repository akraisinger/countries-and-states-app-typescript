import React, { ReactElement, useState, useEffect} from 'react'
import axios from "axios";

const CreateCountries: React.FC = ():ReactElement => {
  type Country= {
    id: number;
    code: string;
    name: string;
  }
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios.get('https://xc-countries-api.fly.dev/api/countries/').then((response)=> {
      setCountries(response.data);
    });
  }, []);
  const checkCountries = (clist:Array<Country>, iname:string, icode:string) => {
    var isSame : boolean = false;
    clist.forEach(function (citem) {
      if (citem.name == iname || citem.code == icode) {
        isSame = true;
      }
    })
    return isSame;
  }

  const handleSubmit = () => {
    const cnamein = document.getElementById("cname") as HTMLInputElement;
    const ccodein = document.getElementById("ccode") as HTMLInputElement;
    const cname : string = cnamein.value;
    const ccode : string = ccodein.value;
    
    if (!cname||!ccode) {
      alert("Please fill in country name and code before submitting!")
    } else if (cname[0]!==cname[0].toUpperCase()||/\d/.test(cname)) {
      alert("Please enter a valid country name!")
    } else if (ccode!==ccode.toUpperCase()||/\d/.test(ccode)) {
      alert("Please enter a valid country code!")
    } else if (checkCountries(countries, cname, ccode)) {
      alert("The country you're trying to enter already exists!")
    } else {
      console.log("Success!! " + cname);
      axios.post('https://xc-countries-api.fly.dev/api/countries/', {
        code: ccode,
        name: cname
      })
      axios.get('https://xc-countries-api.fly.dev/api/countries/').then((response)=> {
        setCountries(response.data);
      });
      (document.getElementById("cname") as HTMLInputElement).value = "";
      (document.getElementById("ccode") as HTMLInputElement).value = "";
    }
    
  }
  return (
    <div>
        <h1>Create Countries</h1>
        <label>Name:</label>
        <input type="text" id="cname" name="cname"></input>
        <label className='code'>Code:</label>
        <input type="text" id="ccode" name="ccode" className='code'></input><br></br>
        <input type="button" value="Add Country" onClick={handleSubmit}></input>
    </div>
    )
}

export default CreateCountries;