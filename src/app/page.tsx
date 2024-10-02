// pages/index.tsx
"use client";

import { useEffect, useState } from 'react';
import { fetchAPI } from '../lib/api';

interface HomePageData {
  // API'den dönecek verinin yapısını buraya ekleyin
  brnBackgroundGif?: any; // Örneğin, doğru türü belirlemek için burayı güncelleyebilirsiniz
  about?: {
    LineGraph?: any; // Güncelleyin
    CoinSites?: {
      coinPlaces?: any; // Güncelleyin
    }[];
  };
  StrategicSection?: {
    StrategicBlock?: any; // Güncelleyin
    StrategicIcon?: any; // Güncelleyin
  };
  PartnerSection?: {
    OurPartnersBlocks?: any; // Güncelleyin
    PartnerIcon?: any; // Güncelleyin
  };
}

const Home: React.FC = () => {
  const [data, setData] = useState<HomePageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAPI<HomePageData>(
          '/api/home-page?populate[brnBackgroundGif][populate]=*&populate[about][populate][LineGraph]=*&populate[about][populate][CoinSites][populate][coinPlaces]=*&populate[StrategicSection][populate][StrategicBlock][populate][StrategicIcon]=*&populate[PartnerSection][populate][OurPartnersBlocks][populate][PartnerIcon]=*'
        );
        console.log(response);
        setData(response);
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
      <h1>Home Page</h1>
      {/* Verileri burada gösterin, örneğin: */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Home;
