import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import './Home-Page.css';
import legendary from './Images/LegendaryLogo.png';

function App() {
  const villainSettings = [1, 2, 3, 3, 4]
  const henchmenSettings = [1, 1, 1, 2, 2]

  //______________________________________________________
  //
  //------------------Scheme------------------------------
  //______________________________________________________
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
  //______________________________________________________
  //
  //-------------MasterMind-------------------------------
  //______________________________________________________
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
  //______________________________________________________
  //
  //--------------Villain Group---------------------------
  //______________________________________________________
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
  //______________________________________________________
  //
  //------------------Henchmen----------------------------
  //______________________________________________________
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

  //______________________________________________________
  //
  //----------------Heroes--------------------------------
  //______________________________________________________
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
  //______________________________________________________
  //
  //-------------------Player Count-----------------------
  //______________________________________________________
  
  const [ playerCount, setPlayerCount ] = useState(2); //Player Count Data
  const { register, handleSubmit } = useForm(); 
  // Sets Player Count Based off Form Selection
  const readPlayerCount = (data) => {
    setPlayerCount(data[0]);
    console.log("Data: " + data[0]);
  }
  //______________________________________________________
  //
  //----------------Random Functions----------------------
  //______________________________________________________

  //---Random MasterMind---
  const [ randMasterMind, setRandMasterMind ] = useState(0);
  useEffect(() => {
    console.log("setrandMasterMind: " + masterMind[randMasterMind].name);
    generateAlwaysLeads();
  }, [randMasterMind, masterMind]);
  const generateRandMasterMind = () => {
    setRandMasterMind(Math.floor(Math.random() * (masterMind.length - 1)) + 1);
  }; 

  //---Adjusts Always Leads Villain Group based off Random MasterMind---
  const [ alwaysLeads, setAlwaysLeads ] = useState(0);
  useEffect(() => {
    if(masterMind[randMasterMind].leadsType === "villains"){
      console.log("setAlwaysLeads: " + villains[alwaysLeads].name);
    }
    else{
      console.log("setAlwaysLeads: " + henchmen[alwaysLeads].name);
    }
  }, [alwaysLeads, masterMind, villains, henchmen, randMasterMind]);

  const generateAlwaysLeads = () => {
    //Pick Villain of Henchmen
    if(masterMind[randMasterMind].leadsType === "villains"){
      for(let i = 0; i < villains.length; i++){
        if(villains[i].name === masterMind[randMasterMind].leads){
          setAlwaysLeads(i);
          generateVillainsCount();
        }
      }
    }
    else{
      for(let i = 0; i < henchmen.length; i++){
        if(henchmen[i].name === masterMind[randMasterMind].leads){
          setAlwaysLeads(i);
          generateHenchmenCount();
        }
      }
    }
  }

  const displayAlwaysLeads = () => {
    if(masterMind[randMasterMind].leadsType === "villains"){
      return(
        <div>
          <p>Villain: {villains[alwaysLeads].name}</p> 
          <p>Set: {villains[alwaysLeads].set}</p>
        </div>
      );
    }
    else{
      return(
        <div>
          <p>Henchmen: {henchmen[alwaysLeads].name}</p>  
          <p>Set: {henchmen[alwaysLeads].set}</p>
        </div>
      );
    }
  }

  //---Random Scheme---
  const [ randScheme, setRandScheme ] = useState(0);
  useEffect(() => {
    console.log("setRandScheme: " + scheme[randScheme].name);
    generateSchemeLeads();
  }, [randScheme, scheme]);
  const generateRandScheme = () => {
    setRandScheme(Math.floor(Math.random() * scheme.length));
  };

  //---Adjusts Scheme Villain Group based off Random Scheme---
  const [ schemeLeads, setSchemeLeads ] = useState(0);
  useEffect(() => {
    if(scheme[randScheme].leadsType !== "None"){
      if(scheme[randScheme].leadsType === "villains"){
        console.log("setSchemeLeads: " + villains[schemeLeads].name);
      }
      else{
        console.log("setSchemeLeads: " + henchmen[schemeLeads].name);
      }
    }
  }, [schemeLeads, scheme, villains, henchmen, randScheme]);

  const generateSchemeLeads = () => {
    //Pick Villain of Henchmen
    if(scheme[randScheme].leadsType !== "None"){
      if(scheme[randScheme].leadsType === "villains"){
        for(let i = 0; i < villains.length; i++){
          if(villains[i].name === scheme[randScheme].leads){
            setSchemeLeads(i);
            generateVillainsCount();
          }
        }
      }
      else{
        for(let i = 0; i < henchmen.length; i++){
          if(henchmen[i].name === scheme[randScheme].leads){
            setSchemeLeads(i);
            generateHenchmenCount();
          }
        }
      }
    }
    else{
      setSchemeLeads(0);
    }
  }

  const displaySchemeLeads = () => {
    if(scheme[randScheme].leadsType !== "None"){
      if(scheme[randScheme].leadsType === "villains"){
        return(
          <div>
            <h2>Scheme Villain Data: </h2>
            <p>Villain: {villains[schemeLeads].name}</p> 
            <p>Set: {villains[schemeLeads].set}</p>
          </div>
        );
      }
      else{
        return(
          <div>
            <h2>Scheme Villain Data: </h2>
            <p>Henchmen: {henchmen[schemeLeads].name}</p>  
            <p>Set: {henchmen[schemeLeads].set}</p>
          </div>
        );
      }
    }
  }

  //---Creates Villain/Henchmen Counts
  const [ villainsCount, setVillainsCount ] = useState(0);
  useEffect(() => {
    console.log("villainsCount: " + villainsCount);
  }, [villainsCount, randMasterMind, randScheme, playerCount]);

  const [ henchmenCount, setHenchmenCount ] = useState(0);
  useEffect(() => {
    console.log("henchmenCount: " + henchmenCount)
  }, [henchmenCount, randMasterMind, randScheme, playerCount]);

  const generateVillainsCount = () => {
    setVillainsCount(villainSettings[playerCount - 1]);
    if(masterMind[randMasterMind].leadsType === "villains"){
      setVillainsCount(prevVillainsCount => prevVillainsCount - 1);
      console.log("sub by 1: " + villainsCount);
    };
    if(scheme[randScheme].leadsType === "villains"){
      setVillainsCount(prevVillainsCount => prevVillainsCount - 1);
      console.log("(2)sub by 1 " + villainsCount);
    };
  };

  const generateHenchmenCount = () => {
    setHenchmenCount(henchmenSettings[playerCount - 1]);
    if(masterMind[randMasterMind].leadsType === "henchmen"){
      setHenchmenCount(prevHenchmenCount => prevHenchmenCount - 1);
    };
    if(scheme[randScheme].leadsType === "henchmen"){
      setHenchmenCount(prevHenchmenCount => prevHenchmenCount - 1);
    };
  };

  //---Creates Game---
  function createGame(){
    console.log("Player Count: " + playerCount);
    generateRandMasterMind();
    generateRandScheme();
    generateVillainsCount();
    generateHenchmenCount();
  };

 // ------------------- Render -------------------------------------------
  return (
    <div className="Home-Page">
      <header className="Home-Page-Header">
        <img src={legendary} alt="Legendary" className="Legendary-Logo"/>
        <p> Randomizer </p>
      </header>

      {/* Player Select Dropdown */}
      {/* <form onSubmit={handleSubmit(readPlayerCount)}>         */}
      <form onSubmit={handleSubmit(readPlayerCount)}> 
        <label>Select Number of Players: 
          <select {...register("0")}>
            {/* <option value="1"> 1 </option> */}
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
          </select>
        </label>
        <input type="submit"/>
      </form>
      <p>Number of Players: {playerCount}</p>

      <button onClick={createGame}> Create Game </button>
      <p>-----------------------------------------------------</p>
      {/* MasterMind Info */}
      <h2>MasterMind Data: </h2>
      <p>MasterMind: {masterMind[randMasterMind].name} </p>
      <p>HP: {masterMind[randMasterMind].hp} </p>
      <p>MasterStrike: {masterMind[randMasterMind].masterStrike} </p>
      <p>Set: {masterMind[randMasterMind].set} </p>
      <p>Leads: {masterMind[randMasterMind].leads} </p>
      <button onClick={() => {generateRandMasterMind();}}> RandomMasterMind</button>

      {/* Scheme Info */}
      <h2>Scheme Data: </h2>
      <p>Scheme: {scheme[randScheme].name} </p>
      <p>Set: {scheme[randScheme].set}</p>
      <button onClick={() => {generateRandScheme();}}>RandomScheme</button>

      {/* Always Leads */}
      <h2>Always Leads Villain Data: </h2>
      <div> {displayAlwaysLeads()} </div>

      {/* Scheme Leads */}
      <div> {displaySchemeLeads()} </div>

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
