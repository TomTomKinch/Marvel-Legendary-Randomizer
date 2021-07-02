import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import './Home-Page.css';
import legendary from './Images/LegendaryLogo.png';

function App() {

  //Random Number
  const [ randomNum, setRandomNumber ] = useState(0);

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

  //Villain Group
  const [ villains, setVillains ] = useState([{
    "ID": "",
    "name": "",
    "set": ""
  }]); 
  useEffect(() => {
    fetch('./JSON Files/villains.json')
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      setVillains(data);
      //console.log(villains[0].name);
    })
  }, []);

  //Henchmen
  const [ henchmen, setHenchmen ] = useState([{
    "ID": "",
    "name": "",
    "set": ""
  }]); 
  useEffect(() => {
    fetch('./JSON Files/henchmen.json')
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      setHenchmen(data);
      //console.log(henchmen[0].name);
    })
  }, []);

  //Heroes
  const [ heroes, setHeroes ] = useState([{
    "ID": "", 
    "name": "",
    "faction": "",
    "color1": "",
    "color2": "",
    "color3": "",
    "color4": "",
    "set": ""
  }]); 
  useEffect(() => {
    fetch('./JSON Files/heroes.json')
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      setHeroes(data);
      //console.log(heroes[0].name);
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

      {/* Villain Info */}
      <h2>Villain Data: </h2>
      <p>Villain Group: {villains[0].name} </p>
      <p>Set: {villains[0].set}</p>

      {/* Henchmen Info */}
      <h2>Henchemn Data: </h2>
      <p>Henchmen Group: {henchmen[0].name} </p>
      <p>Set: {henchmen[0].set}</p>

      {/* Heroes Info */}
      <h2>Hero Data: </h2>
      <p>Hero Name: {heroes[0].name}</p>
      <p>Faction: {heroes[0].faction}</p>
      <p>Color1: {heroes[0].color1}</p>
      <p>Color2: {heroes[0].color2}</p>
      <p>Color3: {heroes[0].color3}</p>
      <p>Color4: {heroes[0].color4}</p>
      <p>Set: {heroes[0].set}</p>

    </div>
  );
}


export default App;
