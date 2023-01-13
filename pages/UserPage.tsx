import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  pastebins: string[];
}

const UserPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/v1/user/${id}`);
        const json = await res.json();
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
      <h1>{user.id} s Pastebins</h1>
      <ul>
        {user.pastebins.map((pastebinId) => (
          <li key={pastebinId}>
            <Link href="/pastebin/[id]" as={`/pastebin/${pastebinId}`}>
              <a>{pastebinId}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserPage;