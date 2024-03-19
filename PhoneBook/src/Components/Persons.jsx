import axios from "axios"
const Persons = ({ name, num, onClick }) => {
/*const URL = 'http://localhost:3002/persons'
  const removePersons =(array) =>{
    const position = array.id-1
    if(window.confirm(`Delete ${array.name}?`))
    {console.log(`noted`)
    axios.delete(`${URL}/${position}`)
    .then
    }

    */
   const collectArr =()=>{

  }
  return(
  <div>
        {name} {num} <button onClick= {onClick}>delete</button>
   
  </div>
  )
};

export default Persons;
