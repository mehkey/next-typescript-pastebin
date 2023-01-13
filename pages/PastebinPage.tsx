import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface Pastebin {
  id: string;
  content: string;
  createdAt: string;
}

const PastebinPage: React.FC = () => {
  const [pastebin, setPastebin] = useState<Pastebin | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPastebin = async () => {
      try {
        const res = await fetch(`/api/v1/pastebin/${id}`);
        const json = await res.json();
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
      <p>Created at: {pastebin.createdAt}</p>
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