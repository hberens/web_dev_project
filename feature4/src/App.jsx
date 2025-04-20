import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Parse from "parse";
import "./styles.css";
import Components from "./Components/Components";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import SearchComponent from './Components/Search/SearchComponent';


const Env = {
    APPLICATION_ID: "mpQFAZaH0SLscTdKMSuBnatnNGS7FlZQBdB1HdY7",
    JAVASCRIPT_KEY: "3FcAS6JRvU2fHsP48zd9uMOimPcTDkWAubKI3zS4",
    SERVER_URL: "https://parseapi.back4app.com",   
}

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
  <div>
    <Components />
    {/* <SearchComponent /> */}
    </div>
  );
}

export default App
