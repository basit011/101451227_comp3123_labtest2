import React from "react";
import Weather from "./Weather";

function App() {
  const cityData = {
    defaultCity: "Toronto",
    defaultTemperature: 15,
  };

  return <Weather cityData={cityData} />;
}

export default App;
