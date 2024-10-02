"use client"; // Bu bileşeni istemci bileşeni olarak işaretleyin

import { useEffect, useState } from 'react';
import { fetchAPI } from '../../lib/api'; // API çağrıları için helper fonksiyonu içe aktarın

interface LineGraph {
  id: number;
  attributes: {
    Data: number[]; // Çizgi grafiği verisi için
  };
}

interface CoinCode {
  id: number;
  attributes: {
    Code: string; // Coin kodu
    Name: string; // Coin adı
  };
}

interface ChartSection {
  id: number;
  attributes: {
    Title: string; // Başlık
    Description: string; // Açıklama
  };
}

interface TokenData {
  LineGraph?: LineGraph; // Çizgi grafiği bilgisi
  CoinCode?: CoinCode; // Coin kodu bilgisi
  ChartSection?: ChartSection; // Grafik bölümü bilgisi
}

const TokenPage: React.FC = () => {
  const [data, setData] = useState<TokenData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAPI<TokenData>(
          '/api/token?populate[LineGraph]=*&populate[CoinCode]=*&populate[ChartSection][populate]='
        );
        setData(response);
        console.log(response);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Token Page</h1>
      <div>
        {data.LineGraph && (
          <div>
            <h2>Line Graph Data</h2>
            <pre>{JSON.stringify(data.LineGraph.attributes.Data, null, 2)}</pre>
          </div>
        )}
        {data.CoinCode && (
          <div>
            <h2>Coin Code</h2>
            <p>Code: {data.CoinCode.attributes.Code}</p>
            <p>Name: {data.CoinCode.attributes.Name}</p>
          </div>
        )}
        {data.ChartSection && (
          <div>
            <h2>Chart Section</h2>
            <h3>{data.ChartSection.attributes.Title}</h3>
            <p>{data.ChartSection.attributes.Description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenPage;
