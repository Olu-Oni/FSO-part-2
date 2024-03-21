import axios from "axios";

const getPersons = (URL) => {
  const result = axios.get(URL).then((response) => response.data);
  return result;
};

const addPersons = (URL, newObject) => {
  const result = axios.post(URL, newObject).then((response) => response.data);
  return result;
};
const deletePersons = (objURL, arr, index) => {
  const result = axios.delete(objURL).then(() => {
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

const updatePersons = (URL, newObject, arrobject) => {
  return axios
    .put(`${URL}/${newObject.id}`, newObject)
    .then((response) =>
      arrobject.map((n) => (n.name === newObject.name ? response.data : n))
    );
};
export default { getPersons, addPersons, deletePersons, updatePersons };
