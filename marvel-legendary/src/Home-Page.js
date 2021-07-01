import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import './Home-Page.css';
import legendary from './Images/LegendaryLogo.png';

function App() {

  //Player Count
  const [ playerCount, setPlayerCount ] = useState(0); //Player Count Data
  const { register, handleSubmit } = useForm(); 
  // Sets Player Count Based off Form Selection
  const onSubmit = (data) => {
    console.log(data[0]);
    setPlayerCount(data[0]);
  }

  //Scheme
  const [ scheme, setScheme ] = useState([{
    "ID": "",
    "name": "",
    "leads": "",
    "leadsType": "",
    "set": ""
  }]);
  useEffect(() => {
    fetch('./JSON Files/scheme.json')
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      setScheme(data);
      //console.log(scheme[0].name);
    })
  },[]);

  //MasterMind
  const [ masterMind, setMasterMind ] = useState([{
    "ID": "",
    "name": "",
    "hp": "",
    "masterStrike": "",
    "leads": "",
    "leadsType": "",
    "set": ""
  }]); 
  useEffect(() => {
    fetch('./JSON Files/masterMind.json')
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      setMasterMind(data);
      // console.log(masterMind[0].name);
    })
  }, []);

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
      <p>-----------------------------------------------------</p>
      {/* MasterMind Info */}
      <h2>MasterMind Data: </h2>
      <p>MasterMind: {masterMind[0].name} </p>
      <p>HP: {masterMind[0].hp} </p>
      <p>MasterStrike: {masterMind[0].masterStrike} </p>
      <p>Set: {masterMind[0].set} </p>

      {/* Scheme Info */}
      <h2>Scheme Data: </h2>
      <p>Scheme: {scheme[0].name} </p>
      <p>Set: {scheme[0].set}</p>
    </div>
  );
}


export default App;
