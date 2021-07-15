import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Checkbox, FormControlLabel} from '@material-ui/core/';
import './Home-Page.css';
import legendary from './Images/LegendaryLogo.png';
import attack from './Images/attack.png'

function App() {
  let bufferNum = 100;
  const villainSettings = [1, 2, 3, 3, 4];
  const henchmenSettings = [1, 1, 1, 2, 2];
  let villainsCount;
  let henchmenCount;
  let heroCount;
  let villainsArray = [];
  let henchmenArray = [];
  let heroArray = [];

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
  }

//______________________________________________________
//
//-------------------Check Box--------------------------
//______________________________________________________

const [ checked, setChecked ] = useState({
  Base_Set: false,
  //Big Expansions
  Civil_War: false,
  Dark_City: false,
  Secret_Wars_Vol1: false,
  Secret_Wars_Vol2: false,
  Villains: false,
  World_War_Hulk: false,
  X_Men: false,
  //Small
  AntMan: false,
  Capt_America_75th: false,
  Champions: false,
  Deadpool: false,
  Dimensions: false,
  Fantastic_Four: false,
  Guardians_Of_The_Galaxy: false,
  Heroes_Of_Asgard: false,
  Into_The_Cosmos: false,
  Noir: false,
  Paint_The_Town_Red: false,
  Revelations: false,
  SHIELD: false,
  The_New_Mutants: false,
  Villains_Fear_Itself: false,
  Venom: false,
});

const [ checkedArr, setCheckedArr ] = useState([]);

const handleCheck = (event) => {
  setChecked({ ...checked, [event.target.name]: event.target.checked });

  let checkedData = checkedArr;
  //Create Array with Expansions Selected
  if(event.target.checked === true){
    checkedData.push(event.target.value);
  }
  else{
    for(let a = 0; a < checkedData.length; a++){
      if(checkedData[a] === event.target.value){
        checkedData.splice(a, 1);
      }
    }
  }
  setCheckedArr(checkedData);
  console.log(checkedArr);
};

  //______________________________________________________
  //
  //----------------Random Functions----------------------
  //______________________________________________________

  //---Expansion Check---
  const expansionCheck = (list, val) => {
    console.log("expansionCheck");
    let available = false;
    for(let i = 0; i < checkedArr.length; i++){
      //Verifies value is in an available Expansion
      if(list[val].set === checkedArr[i]){
        available = true;
      }
    }
    return available;
  }

  //---Random MasterMind---
  const [ randMasterMind, setRandMasterMind ] = useState(0);
  useEffect(() => {
    console.log("setrandMasterMind: " + masterMind[randMasterMind].name);
  }, [randMasterMind, masterMind]);

  const generateRandMasterMind = () => {
    console.log("generateRandMasterMind");
    //Generates MasterMind Position Value
    for(let count = 0; count <= bufferNum; count++){
      let testVal = Math.floor(Math.random() * (masterMind.length - 1)) + 1;
      let expCheck = expansionCheck(masterMind, testVal);
      if(expCheck === true){
        setRandMasterMind(testVal);
        break;
      };
    };
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
  }, [alwaysLeads]);

  const generateAlwaysLeads = () => {
    console.log("generateAlwaysLeads");
    //Pick Villain of Henchmen
    if(masterMind[randMasterMind].leadsType === "villains"){
      for(let i = 0; i < villains.length; i++){
        if(villains[i].name === masterMind[randMasterMind].leads){
          setAlwaysLeads(i);
          //Add index to Villains Array
          villainsArray.push(i);
          villainsCount--;
        }
      }
    }
    else{
      for(let i = 0; i < henchmen.length; i++){
        if(henchmen[i].name === masterMind[randMasterMind].leads){
          setAlwaysLeads(i);
          //Add index to Henchmen Array
          henchmenArray.push(i);
          henchmenCount--;
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
  }, [randScheme, scheme]);

  const generateRandScheme = () => {
    console.log("generateRandScheme");
    for(let count = 0; count <= bufferNum; count++){
      let testVal = Math.floor(Math.random() * (scheme.length - 1)) + 1;
      let expCheck = expansionCheck(scheme, testVal);
      if(expCheck === true){
        setRandScheme(testVal);
        break;
      };
    };

    //setRandScheme(Math.floor(Math.random() * scheme.length));
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
    console.log("generateSchemeLeads");
    //Pick Villain of Henchmen
    if(scheme[randScheme].leadsType !== "None"){
      if(scheme[randScheme].leadsType === "villains"){
        for(let i = 0; i < villains.length; i++){
          if(villains[i].name === scheme[randScheme].leads){
            setSchemeLeads(i);
            //Add index to Villain Arrray
            villainsArray.push(i);
            villainsCount--;
          }
        }
      }
      else{
        for(let i = 0; i < henchmen.length; i++){
          if(henchmen[i].name === scheme[randScheme].leads){
            setSchemeLeads(i);
            //Add indexto Henchmen Arrray
            henchmenArray.push(i);
            henchmenCount--;
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
  const generateVillainsCount = () => {
    console.log("generateVillainsCount");
    villainsCount = villainSettings[playerCount - 1];
    if(masterMind[randMasterMind].leadsType === "villains"){
      villainsCount--;
    };
    if(scheme[randScheme].leadsType === "villains"){
      villainsCount--; 
    };
  };

  const generateHenchmenCount = () => {
    console.log("generateHenchmenCount");
    henchmenCount = henchmenSettings[playerCount - 1];
    if(masterMind[randMasterMind].leadsType === "henchmen"){
      henchmenCount--; 
    };
    if(scheme[randScheme].leadsType === "henchmen"){
      henchmenCount--; 
    };
  };

  //Creates Other Villains
  const [ villainsArrayFinal, setVillainsArrayFinal ] = useState([]);

  const randomVillainsFunction = () => {
    for(villainsCount; villainsCount > 0; villainsCount--){
      //var vil = (Math.floor(Math.random() * (villains.length - 1)) + 1);
      let vil = 0;
      for(let count = 0; count <= bufferNum; count++){
        vil = Math.floor(Math.random() * (villains.length - 1)) + 1;
        let expCheck = expansionCheck(villains, vil);
        if(expCheck === true){
          if(villainsArray.indexOf(vil) === -1){
            villainsArray.push(vil);
          }
          else{
            villainsCount = villainsCount + 1;
          }
          break;
        };
      };
    };
    console.log("Villains Array: [ " + villainsArray + " ]");
    setVillainsArrayFinal(villainsArray);
  };
  //Creates Other Henchmen
  const [ henchmenArrayFinal, setHenchmenArrayFinal ] = useState([]);

  const randomHenchmenFunction = () => {
    for(henchmenCount; henchmenCount > 0; henchmenCount--){
      //var hen = (Math.floor(Math.random() * (henchmen.length - 1)) + 1);\
      let hen = 0;
      for(let count = 0; count <= bufferNum; count++){
        hen = Math.floor(Math.random() * (henchmen.length - 1)) + 1;
        let expCheck = expansionCheck(henchmen, hen);
        if(expCheck === true){
          if(henchmenArray.indexOf(hen) === -1){
            henchmenArray.push(hen);
          }
          else{
            henchmenCount = henchmenCount + 1;
          }
          break;
        };
      };
    };
    console.log("Henchmen Array: [ " + henchmenArray + " ]");
    setHenchmenArrayFinal(henchmenArray);
  };

  //---Creates Hero Count
  const generateHeroCount = () => {
    console.log("generateHeroCount");
    if(playerCount === "5"){
      heroCount = 6;
    }
    else{
      heroCount = 5;
    }
  };

  const [ heroArrayFinal, setHeroArrayFinal ] = useState([]);

  const randomHeroFunction = () => {
    for(heroCount; heroCount > 0; heroCount--){
      //var h = (Math.floor(Math.random() * (heroes.length - 1)) + 1);
      let h = 0;
      for(let count = 0; count <= bufferNum; count++){
        h = Math.floor(Math.random() * (heroes.length - 1)) + 1;
        let expCheck = expansionCheck(heroes, h);
        if(expCheck === true){
          if(heroArray.indexOf(h) === -1){
            heroArray.push(h);
          }
          else{
            heroCount = heroCount + 1;
          }
          break;
        };
      };
    };
    console.log("Hero Array: [ " + heroArray + " ]");
    setHeroArrayFinal(heroArray);
  };

  //---Creates Game---
  const [ gameGenerated, setGameGenerated ] = useState(false);
  useEffect(() => {
    if(gameGenerated === true){
      console.log("------Dependent Data--------");
      //Clear Villains Array
      generateAlwaysLeads();
      generateSchemeLeads();
      generateVillainsCount();
      generateHenchmenCount();
      generateHeroCount();
      randomVillainsFunction();
      randomHenchmenFunction();
      randomHeroFunction();
      setGameGenerated(false);
    }
  },[gameGenerated]);

  const createGame = () => {
    console.log("-------New Game------------");
    console.log(checked.Base_Set);
    console.log("Player Count: " + playerCount);
    generateRandMasterMind();
    generateRandScheme();
    generateVillainsCount();
    generateHenchmenCount();
    if(gameGenerated === false){
      setGameGenerated(true);
    }
  };

  //---Refresh MasterMind Button---
  function refreshMasterMind(){
    // setVillainsArray([]);
    // generateRandMasterMind();
    // generateVillainsCount();
    // generateHenchmenCount();
    // randomVillainsFunction();
  }

 // ------------------- Render -------------------------------------------
  return (
    <div className="Home-Page">
      <header className="Home-Page-Header">
        <img src={legendary} alt="Legendary" className="Legendary-Logo"/>
        <p> Randomizer </p>
      </header>

      {/* Player Select Dropdown */}
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

      <div>
          <h2>Expansion Select</h2>
          <FormControlLabel control={ <Checkbox checked={checked.Base_Set} onChange={handleCheck} name="Base_Set" value="Base Set"/> } label="Base Set"/>
          <FormControlLabel control={ <Checkbox checked={checked.Civil_War} onChange={handleCheck} name="Civil_War" value="Civil War"/> } label="Civil War" />
          <FormControlLabel control={ <Checkbox checked={checked.Dark_City} onChange={handleCheck} name="Dark_City" value="Dark City"/> } label="Dark City"/>
          {/* <FormControlLabel control={ <Checkbox checked={checked.Secret_Wars_Vol1} onChange={handleCheck} name="Secret_Wars_Vol1" value="Secret Wars Vol. 1"/> } label="Secret Wars Vol. 1" /> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Secret_Wars_Vol2} onChange={handleCheck} name="Secret_Wars_Vol2" value="Secret Wars Vol. 2"/> } label="Secret Wars Vol. 2"/> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Villains} onChange={handleCheck} name="Villains" value="Villains" />  } label="Villains" /> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.World_War_Hulk} onChange={handleCheck} name="World_War_Hulk" value="World War Hulk" /> } label="World War Hulk"/> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.X_Men} onChange={handleCheck} name="X_Men"/> } label="X-Men" value="X-Men" /> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.AntMan} onChange={handleCheck} name="AntMan"/> } label="AntMan" value="AntMan" /> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Capt_America_75th} onChange={handleCheck} name="Capt_America_75th" value="Captain America 75th Anniversary" /> } label="Captain America 75th Anniversary"/> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Champions} onChange={handleCheck} name="Champions" value="Champions" /> }label="Champions" /> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Deadpool} onChange={handleCheck} name="Deadpool" value="Deadpool" /> } label="Deadpool" /> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Dimensions} onChange={handleCheck} name="Dimensions" value="Dimensions" /> } label="Dimensions" /> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Fantastic_Four} onChange={handleCheck} name="Fantastic_Four" value="Fantastic Four" /> } label="Fantastic Four" /> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Guardians_Of_The_Galaxy} onChange={handleCheck} name="Guardians_Of_The_Galaxy" value="Guardians of the_Galaxy" /> } label="Guardians of the Galaxy" /> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Heroes_Of_Asgard} onChange={handleCheck} name="Heroes_Of_Asgard" value="Heroes of Asgard" /> } label="Heroes of Asgard"/> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Into_The_Cosmos} onChange={handleCheck} name="Into_The_Cosmos" value="Into the Cosmos" /> } label="Into the Cosmos" /> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Noir} onChange={handleCheck} name="Noir"/> } label="Noir" value="Noir" /> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Paint_The_Town_Red} onChange={handleCheck} name="Paint_The_Town_Red" value="Paint the Town Red" /> } label="Paint the Town Red"/> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Revelations} onChange={handleCheck} name="Revelations" value="Revelations" /> } label="Revelations"/> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.SHIELD} onChange={handleCheck} name="SHIELD" value="SHIELD" /> } label="SHIELD"/> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.The_New_Mutants} onChange={handleCheck} name="The_New_Mutants" value="The New Mutants" /> } label="The New Mutants"/> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Villains_Fear_Itself} onChange={handleCheck} name="Villains_Fear_Itself" value="Villains Fear Itself" />}label="Villains Fear Itself"/> */}
          {/* <FormControlLabel control={ <Checkbox checked={checked.Venom} onChange={handleCheck} name="Venom" value="Venom" />}label="Venom"/> */}
      </div>

      <br></br><button onClick={createGame}> Create Game </button>

      <p>-----------------------------------------------------</p>
      {/* MasterMind Info */}
      <h2 className="Title">Master Mind: </h2>
      <div className="MasterMindCard">
        <span>{masterMind[randMasterMind].name} </span>
        <br></br>
        <img src={attack} alt="HP: " className="Logos" />
        <span>: {masterMind[randMasterMind].hp}</span>
        <br></br>
        <p>MasterStrike: {masterMind[randMasterMind].masterStrike} </p>
        <br></br>
        <span>Set: {masterMind[randMasterMind].set} </span>
        <br></br>
        <span>Always Leads: {masterMind[randMasterMind].leads} </span>
      </div>
      {/* <button onClick={() => {refreshMasterMind();}}> RandomMasterMind</button> */}

      {/* Scheme Info */}
      <h2 className="Title">Scheme: </h2>
      <div className="SchemeCard">
        <span>Scheme: {scheme[randScheme].name} </span>
        <span>Set: {scheme[randScheme].set}</span>
      </div>
      {/* <button onClick={() => {generateRandScheme();}}>RandomScheme</button> */}

      {/* Always Leads */}
      {/* <h2>Always Leads Villain Data: </h2>
      <div> {displayAlwaysLeads()} </div> */}

      {/* Scheme Leads */}
      {/* <div> {displaySchemeLeads()} </div> */}

      {/* Villain Info */}
      <h2 className="Title">Villain Groups: </h2>
      <div>
        {villainsArrayFinal.map((num) => {
          return(
            <div className="VillainCard">
              <span>{villains[num].name}</span>
              <br></br> 
              <span>Set: {villains[num].set}</span>
            </div>
          )
        })}
      </div>

      {/* Henchmen Info */}
      <h2 className="Title">Henchmen: </h2>
      <div>
        {henchmenArrayFinal.map((num) => {
          return(
            <div className="VillainCard">
              <span>{henchmen[num].name}</span> 
              <br></br> 
              <span>Set: {henchmen[num].set}</span>
            </div>
          )
        })}
      </div>

      {/* Heroes Info */}
      <h2 className="Title"> Heroes: </h2>
      <div>
        {heroArrayFinal.map((num) => {
          return(
            <div className="HeroCard">
              <img src={require("./Images/"+heroes[num].faction+".png").default} alt={heroes[num].faction} className="Faction" />
              <span className="HeroName">{heroes[num].name}</span>
              {/* <br></br> */}
              <img src={require("./Images/"+heroes[num].color1+".png").default} alt={heroes[num].color1} className="Logos" />
              <img src={require("./Images/"+heroes[num].color2+".png").default} alt={heroes[num].color2} className="Logos" />
              <img src={require("./Images/"+heroes[num].color3+".png").default} alt={heroes[num].color3} className="Logos" />
              <img src={require("./Images/"+heroes[num].color4+".png").default} alt={heroes[num].color4} className="Logos" />
              <br></br>
              <span className="SetName">Set: {heroes[num].set}</span>
              <br></br>
            </div>
          )
        })}
      </div>
    </div>
  );
}


export default App;
