import axios from "axios";

const URL = "/api/persons";

const getPersons = () => {
  const result = axios.get(URL).then((response) => response.data);
  return result;
};

const addPersons = ( newObject) => {
  const result = axios.post(URL, newObject).then((response) => response.data);
  return result;
};
const deletePersons = (id, arr, index) => {
  const result = axios.delete(`${URL}/${id}`).then(() => {
    let tempArr = [...arr];
    tempArr.splice(index, 1);
    //using splice...
    //removes '1' object starting from index (based on its use above),
    //meaning it removes the the object at that index
    //result is the spliced object,
    //mutates the containing array
    return tempArr;
  });
  return result;
};

const updatePersons = ( newObject, arrobject) => {
  return axios
    .put(`${URL}/${newObject.id}`, newObject)
    .then((response) =>
      arrobject.map((n) => (n.name === newObject.name ? response.data : n))
    );
};
export default { getPersons, addPersons, deletePersons, updatePersons };
