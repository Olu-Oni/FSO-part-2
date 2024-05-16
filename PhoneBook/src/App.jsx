import { useState, useEffect } from "react";
import Filter from "./Components/Filter.jsx";
import PersonForm from "./Components/PersonForm.jsx";
import Persons from "./Components/Persons.jsx";
import Notification from "./Components/Notification.jsx";
import personService from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchedPersons, setSearchedPersons] = useState("");
  const [newPerson, setNewPerson] = useState({ name: "", num: "" });
  const [messageBox, setMessageBox] = useState(null)
  const baseUrl = "http://localhost:3003/persons";

  useEffect(() => {
    personService.getPersons().then((result) => setPersons(result));
  }, []);

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
      type: "number",
      value: newPerson.num,
      onchange: (event) =>
        setNewPerson({ ...newPerson, num: event.target.value }),
    },
  ];

  const addPersons = (event) => {
    event.preventDefault();
    if (newPerson.name.split(" ").join("") === "" || newPerson.num === "") {
      window.alert(`please fill completely before submitting`);
    } else if (persons.every((arr) => arr.name != newPerson.name)) {
      //if none are equal

      const addedPerson = {
        name: newPerson.name,
        num: newPerson.num,
      };
      personService
        .addPersons( addedPerson)
        .then((result) => {
          setPersons(persons.concat(result))
          setMessageBox(`Added ${result.name}`)
          setTimeout(() => setMessageBox(null),3000)
          }
        );
    } else {
      //if at least one is equal
      const newObject = persons.find((n) => n.name === newPerson.name);
      if (newObject.num === newPerson.num) {
        window.alert(`${newPerson.name} <-- is already added to phonebook`);
      } else {
        if (
          window.confirm(
            ` ${newPerson.name} is already in phonebook, replace the old number with a new one? `
          )
        ) {
          newObject.num = newPerson.num;
          personService
            .updatePersons( newObject, persons)
            .then((result) => {
              setPersons(result)
              setMessageBox(`Changed ${newObject.name}'s number to ${newObject.num}`)
              setTimeout(() => setMessageBox(null),3000)  
              })
            .catch(error =>{
              setMessageBox(`Information of ${newObject.name} has already been removed from server`)
              setTimeout(() => setMessageBox(null),3000)
              }
            )
            
        }
      }
    }
  };

  const search = (event) => {
    setSearchedPersons(event.target.value);
  };

  const searchArr = (objArray, searchVal) => {
    return objArray.filter((arr) =>
      (arr.name + arr.num).toLowerCase().includes(searchVal.toLowerCase())
    );
  };

  const removePersons = (arr) => {
    const index = persons.indexOf(arr);
    if (window.confirm(`Delete ${arr.name}?`)) {
      personService
        .deletePersons(arr.id, persons, index)
        .then((result) => {
          setPersons(result);
        });
    }
  };

  const filteredPersons =
    searchedPersons === "" ? persons : searchArr(persons, searchedPersons);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification 
      name = {newPerson.name} 
      message = {messageBox}/>
      
      <Filter text="filter shown with: " onChange={search} />

      <h2>add a new</h2>
      <PersonForm onSubmit={addPersons} formValues={formValues} />

      <h2>Numbers</h2>
      {filteredPersons.length !== 0
        ? filteredPersons.map((arr) => (
            <Persons
              key={arr.id}
              name={arr.name}
              num={arr.num}
              onClick={() => removePersons(arr)}
            />
          ))
        : `Nothing to see here...`}
    </div>
  );
};

export default App;
