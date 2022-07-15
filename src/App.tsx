import { useEffect, useState } from "react";
import { getRates, rates } from "./api/exchangeRates";
import "./App.scss";
import Converter from "./components/Converter";
import Header from "./components/Header";

const ratest: rates = {
  "success": false,
  "timestamp": 0,
  "base": "",
  "date": "",
  "rates": {
  }
}


const App = () => {
  const [rates, setRates] = useState<rates>(ratest);

  useEffect(() => {
    const effect = async () => {
      const rates = await getRates("UAH");

      setRates(rates);
    };
    
    effect();
  }, []);

  return (
    <>
    <Header rates={rates} />
    <div className="app">
      <Converter rates={rates}/>
    </div>
    </>
  );
};

export default App;
