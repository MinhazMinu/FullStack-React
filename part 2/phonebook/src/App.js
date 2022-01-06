import React, { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";
import Input from "./components/Input";
import axios from "axios";
import personServices from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [controllEffect, setControllEffect] = useState(false);

  useEffect(() => {
    personServices.getAll().then((initialData) => setPersons(initialData));
  }, [controllEffect]);

  const handleInput = (event) => {
    event.target.placeholder === "Number"
      ? setNewNumber(event.target.value)
      : setNewName(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const duplicate = persons.find((e) => e.name == newName);

    if (duplicate) {
      if (
        window.confirm(
          `${duplicate.name} is already there . do you want to replace the number ?`
        )
      ) {
        personServices.dataPatch(duplicate.id, newNumber).then((response) => {
          alert("Data updated");
          setControllEffect(!controllEffect);
        });
      }
    } else {
      const temp = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      personServices
        .create(temp)
        .then((returnPerson) => setPersons(persons.concat(returnPerson)));
    }
  };

  const handleDelete = (name, id) => {
    const needToDelete = persons.find((e) => e.id == id);
    if (window.confirm(`Delete ${name} ? `)) {
      personServices.deleteData(needToDelete, id).then((response) => {
        alert(`${name} is deleted`);
        setControllEffect(!controllEffect);
      });
    } else {
      console.log("Not Delete");
    }
  };
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
        <Persons key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default App;
