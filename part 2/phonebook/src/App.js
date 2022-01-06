import React, { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";
import Input from "./components/Input";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const handleInput = (event) => {
    event.target.placeholder === "Number"
      ? setNewNumber(event.target.value)
      : setNewName(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const duplicate = persons.find((e) => e.name == newName);

    if (duplicate) {
      alert(`${newName} is Already There`);
    } else {
      const temp = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      axios
        .post("http://localhost:3001/persons", temp)
        .then((response) => setPersons(persons.concat(response.data)));
      // setPersons(persons.concat(temp));
    }
  };
  // console.log(persons);
  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };
  const showPerson = filter
    ? persons.filter((person) => person.name.match(filter))
    : persons;
  return (
    <div>
      <Input val={filter} handel={handleFilter} palce="Filter" />
      <h2>Phonebook</h2>
      <PersonsForm
        newName={newName}
        newNumber={newNumber}
        handleInput={handleInput}
        handleClick={handleClick}
      />
      <h2>Numbers</h2>
      {showPerson.map((person) => (
        <Persons key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
