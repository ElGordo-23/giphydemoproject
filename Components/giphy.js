import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apikey } from '../key';
import Paginate from './pagination';

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
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gifsPerPage, setGifsPerPage] = useState(10);

  const indexOfLastGif = currentPage * gifsPerPage;
  const indexOfFirstGif = indexOfLastGif - gifsPerPage;
  const currentGifs = gifs.slice(indexOfFirstGif, indexOfLastGif);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const results = await axios('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: apikey,
            limt: 500,
          },
        });
        setGifs(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);

    try {
      const results = await axios('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: apikey,
          q: searchTerm,
          limit: 500,
        },
      });
      setGifs(results.data.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }
  };

  function addFavourite(gif) {
    setFavGifs((prev) => [...prev, gif]);
  }

  function deleteGif(gif) {
    const deletedId = gif.id;
    const updateFavs = favGifs.filter((g) => g.id !== deletedId);
    setFavGifs(updateFavs);
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderError = () => {
    if (isError) {
      return <div>Error fetching data.</div>;
    }
  };
  function pageSelected(pageNumber) {
    setCurrentPage(pageNumber);
  }
  return (
    <div>
      {renderError()}
      <form>
        <input
          value={searchTerm}
          placeholder="Search"
          onChange={handleSearch}
        />
        <button onClick={handleSubmit}>Search</button>
      </form>
      <Paginate
        pageSelected={pageSelected}
        currentPage={currentPage}
        gifsPerPage={gifsPerPage}
        totalNumberOfGifs={gifs.length}
      />
      <ul css={gifList}>
        {currentGifs.map((gif) => {
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
        {favGifs.map((favs) => {
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
