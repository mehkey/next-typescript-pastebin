import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { baseURL } from '../config';
import axios from "axios"

interface User {
  //id: string;
  pastebins: string[];
  
}

interface Pastebin {
    id: string;
    content: string;
    user_id: string;
  
  }

const UserPage: React.FC = () => {
  const router = useRouter();
  const  {id}  = router.query;
  const [user, setUser] = useState<Pastebin[] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
          
        //const res = await fetch(baseURL+`/api/v1/user/${id}`);
        const res = await axios.get(baseURL+`/api/v1/pastebins/user/${id}`);
        //const json =  res.json();
        const json  = res.data;
        setUser(json);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{id} s Pastebins</h1>
      <ul>
        {user.map((pastebin) => (
          <li key={pastebin.id}>
            <Link href="/pastebin/[id]" as={`/pastebin/${pastebin.id}`}>
            {pastebin.id} - {pastebin.user_id} - {pastebin.content}
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        h1 {
          font-size: 2em;
          color: blue;
          text-align: center;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        li {
          font-size: 1.5em;
          padding: 10px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
        }
        li:hover {
          background-color: #f9f9f9;
        }
          a {
            text-decoration: none;
            color: black;
        }
        a:hover {
            color: blue;
        }
        `}</style>
    </>
  );
};

export default UserPage;