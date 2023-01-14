import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { baseURL } from '../config';
import axios from "axios"

interface Pastebin {
  id: string;
  content: string;
  user_id: string;
}

const PastebinPage: React.FC = () => {
  const [pastebin, setPastebin] = useState<Pastebin | null>(null);
  const router = useRouter();
  const  {id}  = router.query;

  useEffect(() => {
    const fetchPastebin = async () => {
      /*try {
        const res = await fetch(baseURL + `/api/v1/pastebin/${id}`,{mode: 'no-cors'});
        
        const json = await res.json();
        console.log(json);
        setPastebin(json);
      } catch (error) {
        console.error(error);
      }*/
      try {
        const res = await axios.get(baseURL+`/api/v1/pastebin/${id}`/*,{mode: 'no-cors', headers: {
          'Content-Type': 'application/json'
        }}*/, {headers: {
       'Access-Control-Allow-Origin': '*',
       'Content-type': 'application/json',
    }});
        const json =  res.data;
        console.log(json);
        setPastebin(json);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      fetchPastebin();
    }
  }, [id]);

  if (!pastebin) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{pastebin.id}</h1>
      <p>{pastebin.content}</p>
      <p>User_id at: {pastebin.user_id}</p>
      <style jsx>{`
        h1 {
          font-size: 2em;
          color: blue;
        }
        p {
          font-size: 1.5em;
        }
      `}</style>
    </>
  );
};

export default PastebinPage;