import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const gifList = css`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 0.5rem;
  li {
    list-style: none;
  }
`;

export default function Giphy() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favGifs, setFavGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // if (typeof window !== 'undefined') {
  //   localStorage.setItem('Favs', JSON.stringify(favGifs));
  // }

  const storedFavs = () => {
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('Favs'));
      return stored;
    }
  };

  const localgifs = storedFavs() || [];
  // // console.log(localgifs);

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

  function addFavourite(gif) {
    setFavGifs((prev) => [...prev, gif]);
  }

  function deleteGif(gif) {
    const deletedId = gif.id;
    const updateFavs = favGifs.filter((g) => g.id !== deletedId);
    setFavGifs(updateFavs);
  }
  useEffect(() => {
    setFavGifs(JSON.parse(window.localStorage.getItem('Favs')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Favs', JSON.stringify(favGifs));
  }, [favGifs]);

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
      <ul css={gifList}>
        {gifs.map((gif) => {
          return (
            <li key={gif.id}>
              <img src={gif.images.fixed_height.url} alt="a Gif" />
              <button
                onClick={() => {
                  addFavourite(gif);
                }}
              >
                Save
              </button>
            </li>
          );
        })}
      </ul>
      <ul css={gifList}>
        {localgifs.map((favs) => {
          return (
            <li key={`favs-li-${favs.id}`}>
              <img src={favs.images.fixed_height.url} alt="a Gif" />
              <button
                onClick={() => {
                  deleteGif(favs);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
