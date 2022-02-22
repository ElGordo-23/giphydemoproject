import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const gifList = css`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 0.5rem;
`;

export default function Giphy() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: 'vf7nDm11F3X2Pe63jIGjWWPiFCFCZXM8',
          },
        });
        console.log(results);
        setGifs(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: 'vf7nDm11F3X2Pe63jIGjWWPiFCFCZXM8',
          q: searchTerm,
          limit: 25,
        },
      });
      setGifs(results.data.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <form>
        <input
          value={searchTerm}
          placeholder="Search"
          onChange={handleSearchChange}
        />
        <button onClick={handleSubmit}>Search</button>
      </form>
      <div css={gifList}>
        {gifs.map((gif) => {
          return (
            <div key={gif.id}>
              <img src={gif.images.fixed_height.url} alt="a Gif" />
              <div>Save</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
