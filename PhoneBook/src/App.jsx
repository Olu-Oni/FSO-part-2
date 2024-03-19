import { useState, useEffect } from "react";
import Filter from "./Components/Filter.jsx";
import PersonForm from "./Components/PersonForm.jsx";
import Persons from "./Components/Persons.jsx";
import axios from "axios";
import personService from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [searchedPersons, setSearchedPersons] = useState("");
  const [newPerson, setNewPerson] = useState({ name: "", num: "" });

  const baseUrl = 'http://localhost:3002/persons'
  useEffect(() =>{
    personService
    .getPersons(baseUrl)
    .then( result => setPersons(result))
    },[])

  const formValues = [
    {
      id: 1,
      name: "name: ",
      value: newPerson.name,
      onchange: (event) =>
        setNewPerson({ ...newPerson, name: event.target.value }),
    },
    {
      id: 2,
      name: "number: ",
      value: newPerson.num,
      onchange: (event) =>
        setNewPerson({ ...newPerson, num: event.target.value }),
    },
  ];

  const addPersons = (event) => {
    event.preventDefault();
    
    if (persons.every((arr) => arr.name != newPerson.name)) {
      //if all are not equal
      const addedPerson = {
        name: newPerson.name,
        num: newPerson.num,
        id: persons.length + 1,
      }
      personService
      .addPersons(baseUrl, addedPerson)
      .then(result => setPersons(persons.concat(result)));
    } else {
      //if at least one is equal
      window.alert(`${newPerson.name} <-- is already added to phonebook`);
    }
  };

  const search = (event) => {
    setSearchedPersons(event.target.value);
    
  };

  const removePersons =(arr) =>{
    const index = persons.indexOf(arr)
    if(window.confirm(`Delete ${arr.name}?`))
    {
    personService
    .deletePersons(`${baseUrl}/${arr.id}`, persons, index)
    .then((result) => {setPersons(result)})
    }
  } 

  const filteredPersons = (searchedPersons === "")? persons: persons.filter((arr) =>
          (arr.name + arr.num).includes(searchedPersons)
        )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter text="filter shown with: " onChange={search} />

      <h2>add a new</h2>
      <PersonForm onSubmit={addPersons} formValues={formValues} />

      <h2>Numbers</h2>
      {filteredPersons.map(arr =>
        <Persons
        key = {arr.id}
        name={arr.name}
        num = {arr.num}
        onClick={() => removePersons(arr)}
      />
        )}
      
    </div>
  );
};

export default App;
