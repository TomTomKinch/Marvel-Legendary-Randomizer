import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './Home-Page.css';
import legendary from './Images/LegendaryLogo.png';

function App() {
  const [ playerCount, setPlayerCount ] = useState(0); //Player Count Data
  const { register, handleSubmit } = useForm(); 
  
  // Sets Player Count Based off Form Selection
  const onSubmit = (data) => {
    console.log(data[0]);
    setPlayerCount(data[0]);
  }

  return (
    <div className="Home-Page">
      <header className="Home-Page-Header">
        <img src={legendary} alt="Legendary" className="Legendary-Logo"/>
        <p> Randomizer </p>
      </header>

      {/* Player Select Dropdown */}
      <form onSubmit={handleSubmit(onSubmit)}>        
        <label>Select Number of Players: 
          <select {...register("0")}>
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
          </select>
        </label>
        <input type="submit"/>
      </form>
      <p>Number of Players: {playerCount}</p>
    </div>
  );
}


export default App;
