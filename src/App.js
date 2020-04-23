// import React, { useState, useEffect } from "react";
import React, { useState } from "react";

import "./App.css";
import GlobalStats from "./components/GlobalStats";
import CountriesChart from "./components/CountriesChart";
import SelectDataKey from "./components/SelectDataKey";

// const BASE_URL = "https://corona.lmao.ninja";
import { useCoronaAPI } from "./hooks/useCoronaAPI";

function App() {
  // const [globalStats, setGlobalStats] = useState({});
  // const [countries, setCountries] = useState([]);
  // const [key, setKey] = useState("cases");

  // useEffect(() => {
  //   const fetchGlobalStats = async () => {
  //     const response = await fetch(`${BASE_URL}/v2/all`);
  //     const data = await response.json();
  //     setGlobalStats(data);
  //   };

  //   fetchGlobalStats();
  //   const intervalId = setInterval(fetchGlobalStats, 5000);
  const globalStats = useCoronaAPI("/v2/all", {
    initialData: {},
    refetchInterval: 5000,
  });

  //   return () => clearInterval(intervalId);
  // }, []);

  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     const response = await fetch(`${BASE_URL}/v2/countries?sort=${key}`);
  //     const data = await response.json();
  //     setCountries(data.slice(0, 10));
  //   };

  //   fetchCountries();
  // }, [key]);
  const [key, setKey] = useState("cases");
  const countries = useCoronaAPI(`/v2/countries?sort=${key}`, {
    initialData: [],
    converter: (data) => data.slice(0, 10),
  });

  return (
    <div className="App">
      <h1>COVID-19</h1>
      <GlobalStats stats={globalStats} />
      <SelectDataKey onChange={(e) => setKey(e.target.value)} />
      <CountriesChart data={countries} dataKey={key} />
    </div>
  );
}

export default App;
