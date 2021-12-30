import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  console.log(part1.exercises);

  return (
    <div>
      <Header course={course} />
      <Content part={part1.name} exercise={part1.exercises} />
      <Content part={part2.name} exercise={part2.exercises} />
      <Content part={part3.name} exercise={part3.exercises} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
