import axios from 'axios';

interface Exchange {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}
interface CurrencyResponse {
  [key: string]: Exchange;
}

const getCurrency = async (): Promise<CurrencyResponse> => {
  const response = await axios.get<CurrencyResponse>(
    'https://economia.awesomeapi.com.br/json/last/USD-BRL',
  );
  if (!response.data) {
    throw new Error('Falha ao obter cotação do dólar');
  }
  return response.data;
};

export default getCurrency;
