import React, { ReactElement } from 'react'
import axios from "axios";

const CreateCountries: React.FC = ():ReactElement => {
  return (
    <div>
        <h1>Create Countries</h1>
        <form>
        <label>Name:</label>
        <input type="text" id="cname" name="cname"></input>
        <label className='code'>Code:</label>
        <input type="text" id="ccode" name="ccode" className='code'></input><br></br>
        <input type="submit" value="Add Country" ></input>
        </form>
    </div>
  )
}

export default CreateCountries;