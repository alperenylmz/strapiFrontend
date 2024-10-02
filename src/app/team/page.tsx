"use client"; // Bu bileşeni istemci bileşeni olarak işaretleyin

import { useEffect, useState } from 'react';
import { fetchAPI } from '../../lib/api'; // API çağrıları için helper fonksiyonu içe aktarın

interface TeamMember {
  id: number;
  attributes: {
    Name: string;
    Photo?: {
      data?: {
        attributes: {
          url: string; // Fotoğraf URL'si için
        };
      };
    };
  };
}

interface TeamData {
  TeamBlocks?: TeamMember[]; // TeamBlocks için veri yapısı
}

const TeamPage: React.FC = () => {
  const [data, setData] = useState<TeamData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAPI<TeamData>(
          '/api/team?populate[TeamBlocks][populate][Photo]=*'
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
      <h1>Team Page</h1>
      <div>
        {data.TeamBlocks?.map((member) => (
          <div key={member.id}>
            <h2>{member.attributes.Name}</h2>
            {member.attributes.Photo?.data && (
              <img 
                src={member.attributes.Photo.data.attributes.url} 
                alt={member.attributes.Name} 
                width={200} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
