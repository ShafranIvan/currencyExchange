import { rates } from "../../api/exchangeRates";
import "./Header.scss";

type props = {
  rates: rates | null;
};

const stuff = ["USD", "EUR"];

const Header = ({ rates }: props) => {
  return (
    <header className="header">
      {rates &&
        stuff.map((currency) => {
          return (
            <div className="header__component" key={currency}>
              <p className="header__currency">{currency}</p>
              <p className="header__rate">
                {(1 / rates.rates[currency]).toFixed(2)}₴
              </p>
            </div>
          );
        })}
    </header>
  );
};

export default Header;
