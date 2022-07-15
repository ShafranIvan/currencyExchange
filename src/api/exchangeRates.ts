import axios from "axios";
import config from "../config";

const { EXCHANGE_API_KEY } = config;

const headers = {
  apikey: EXCHANGE_API_KEY,
};

export type rates = {
  base: string;
  date: string;
  rates: {
    [key: string] : number;
  };
  success: boolean;
  timestamp: number;
}

export const getRates = async (base: string, symbols = ""): Promise<rates> => {
  const { data } = await axios.get(
    `https://api.apilayer.com/exchangerates_data/latest?symbols=${symbols}&base=${base}`,
    {
      headers,
    }
  );

  return data;
};
