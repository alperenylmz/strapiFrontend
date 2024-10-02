"use client"; // Bu bileşeni istemci bileşeni olarak işaretleyin

import { useEffect, useState } from 'react';
import { fetchAPI } from '../../lib/api'; // API çağrıları için helper fonksiyonu içe aktarın

interface BlogPost {
  id: number;
  attributes: {
    Title: string; // Blog başlığı
    Content: string; // Blog içeriği
    Image?: {
      data?: {
        attributes: {
          url: string; // Resim URL'si için
        };
      };
    };
  };
}

interface BlogData {
  BlogPosts?: BlogPost[]; // Blog gönderileri
}

const BlogPage: React.FC = () => {
  const [data, setData] = useState<BlogData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAPI<BlogData>(
          '/api/blog?populate[BlogPosts][populate][Image]=*'
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
      <h1>Blog Page</h1>
      <div>
        {data.BlogPosts?.map((post) => (
          <div key={post.id}>
            <h2>{post.attributes.Title}</h2>
            {post.attributes.Image?.data && (
              <img 
                src={post.attributes.Image.data.attributes.url} 
                alt={post.attributes.Title} 
                width={300} // Genişlik ayarı
              />
            )}
            <p>{post.attributes.Content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
