import React from "react";

const Persons = ({ person }) => {
  const { name, number } = person;
  return (
    <div>
      <h5>
        {name} {number}
      </h5>
    </div>
  );
};

export default Persons;
