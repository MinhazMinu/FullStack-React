import React, { useState } from "react";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";
import Input from "./components/Input";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");

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
      setPersons(persons.concat(temp));
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
