import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
  
 
  useEffect( () => {
    axios.get(baseUrl)
    .then(response => { setCountries(response.data)})
  }
  ,[])

  
  
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  
  return(
    <div>
    <form >
        find countries:
        <input type="text" placeholder="Input your country" value={search} onChange={handleChange}/>
    </form>
    </div>
  )
}

export default App;
