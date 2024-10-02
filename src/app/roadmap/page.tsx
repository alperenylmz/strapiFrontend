"use client"; // Bu bileşeni istemci bileşeni olarak işaretleyin

import { useEffect, useState } from 'react';
import { fetchAPI } from '../../lib/api'; // API çağrıları için helper fonksiyonu içe aktarın

interface ListItem {
  id: number;
  attributes: {
    Year: string; // Yıl bilgisi için
    Description: string; // Açıklama bilgisi için
  };
}

interface OverTheYears {
  id: number;
  attributes: {
    List?: ListItem[]; // List bilgisi
  };
}

interface RoadmapData {
  OverTheYears?: OverTheYears[]; // OverTheYears bilgisi
}

const RoadmapPage: React.FC = () => {
  const [data, setData] = useState<RoadmapData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAPI<RoadmapData>(
          '/api/roadmap?populate[OverTheYears][populate][List][populate]=*'
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
      <h1>Roadmap Page</h1>
      <div>
        {data.OverTheYears?.map((yearItem) => (
          <div key={yearItem.id}>
            <h2>Over The Years</h2>
            {yearItem.attributes.List?.map((listItem) => (
              <div key={listItem.id}>
                <h3>{listItem.attributes.Year}</h3>
                <p>{listItem.attributes.Description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPage;
