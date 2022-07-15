import React, { useState } from "react";
import { rates } from "../../api/exchangeRates";
import "./Converter.scss";

type selectorProps = {
  options: string[];
  value?: string;
  onChange?: (event: React.ChangeEvent) => void;
};

const Selector = ({ options, value, onChange }: selectorProps) => {
  return (
    <select value={value} onChange={onChange} className="converter__selector">
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

type inputProps = {
  rates: rates;
  base: number;
  onInput: (input: string, currency: string, id: string) => void;
  defaultCurrency: string;
  activeInput: string;
};

const Input = ({
  rates,
  base,
  activeInput,
  defaultCurrency,
  onInput,
}: inputProps) => {
  const [id] = useState(defaultCurrency + new Date().getTime());
  const [select, setSelect] = useState(defaultCurrency);
  const [value, setValue] = useState("");

  const handleInput = (input: string) => {
    // Checks if input is a number
    if (/^\d+\.?(\d+)?$/.test(input) || input === "") {
      onInput(input, select, id);
      setValue(input);
    }
  };

  const handleSelect = (input: string) => {
    setSelect(input);

    if (id === activeInput) {
      onInput(value, input, id);
    }
  };

  return (
    <>
      <input
        type="text"
        value={
          activeInput === id
            ? value
            : (base * rates.rates[select]).toFixed(2)
        }
        onInput={(e) => handleInput((e.target as HTMLInputElement).value)}
        className="converter__input"
      />
      <Selector
        value={select}
        onChange={(e) => handleSelect((e.target as HTMLInputElement).value)}
        options={Object.keys(rates.rates)}
      />
    </>
  );
};

type converterProps = {
  rates: rates;
};

const Converter = ({ rates }: converterProps) => {
  const [base, setBase] = useState(0);
  const [activeInput, setActiveInput] = useState("");

  // Responsible for changing base value based on which non active inputs calculate new values
  const onInput = (input: string, currency: string, id: string) => {
    setBase(+input / rates.rates[currency]);
    setActiveInput(id);
  };

  return (
    <div className="converter">
      {rates && (
        <form>
          <div>
            <Input
              base={base}
              activeInput={activeInput}
              defaultCurrency={"UAH"}
              rates={rates}
              onInput={onInput}
            />
          </div>

          <div>
            <Input
              base={base}
              activeInput={activeInput}
              defaultCurrency={"EUR"}
              rates={rates}
              onInput={onInput}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Converter;
