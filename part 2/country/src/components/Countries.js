import React from "react";

const Countries = ({ name, capital, flag, handleShowButton }) => {
  return (
    <div>
      <h5>Name : {name}</h5>
      {capital && <h5>Capital : {capital}</h5>}
      {flag && <img src={flag} width="300" height="200" />}
      {handleShowButton && (
        <button value={name} onClick={handleShowButton}>
          Show
        </button>
      )}
    </div>
  );
};

export default Countries;
