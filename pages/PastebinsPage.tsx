import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Pastebins {
  id: string;
}

const PastebinsPage: React.FC = () => {
  const [pastebins, setPastebins] = useState<Pastebins[] | null>(null);

  useEffect(() => {
    const fetchPastebins = async () => {
      try {
        const res = await fetch(`/api/v1/pastebins`);
        const json = await res.json();
        setPastebins(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPastebins();
  }, []);

  if (!pastebins) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>All Pastebins</h1>
      <ul>
        {pastebins.map((pastebin) => (
          <li key={pastebin.id}>
            <Link href="/pastebin/[id]" as={`/pastebin/${pastebin.id}`}>
              <a>{pastebin.id}</a>
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

export default PastebinsPage;

