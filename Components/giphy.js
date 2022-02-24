import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdDelete, MdFavorite } from 'react-icons/md';
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

const heartStyle = css`
  color: black;
  :hover {
    transition: 0.5s ease-in;
    color: red;
  }
  :active {
    transform: translateY(-10px);
  }
`;
const containerMain = css`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  top: 100px;
  max-width: 1500px;
`;
const controlsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const allGifsWrapper = css`
  overflow: scroll;
  height: 500px;
  /* border: 5px solid black; */
  padding: 15px;
  margin-right: 10px;
  width: 45%;
`;
const favGifsWrapper = css`
  overflow: scroll;
  height: 500px;
  width: 45%px;
  /* border: 5px solid black; */
  padding: 15px;
  margin-left: 10px;

  position: relative;
`;

const leftSideWrapper = css`
  display: flex;
  flex-direction: column;
  width: 600px;
  align-items: center;
`;

export default function Giphy() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favGifs, setFavGifs] = useState([]);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gifsPerPage, setGifsPerPage] = useState(10);

  console.log(gifs);

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
            limit: 50,
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
          limit: 50,
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

  function itemsPerPage(counter) {
    setGifsPerPage(counter);
  }

  return (
    <div css={containerMain}>
      <div css={controlsWrapper}>
        {renderError()}
        <form>
          <input
            value={searchTerm}
            placeholder="Search"
            onChange={handleSearch}
          />
          <button onClick={handleSubmit}>Search</button>
          <button onClick={() => setFavGifs([])}>Clear Favs</button>
        </form>
        <Paginate
          pageSelected={pageSelected}
          currentPage={currentPage}
          gifsPerPage={gifsPerPage}
          totalNumberOfGifs={gifs.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <div css={allGifsWrapper}>
        <ul css={gifList}>
          {currentGifs.map((gif) => {
            return (
              <li key={gif.id}>
                <img src={gif.images.fixed_width.url} alt="a Gif" />
                <MdFavorite
                  css={heartStyle}
                  onClick={() => {
                    addFavourite(gif);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div css={favGifsWrapper}>
        <ul css={gifList}>
          {favGifs.map((favs) => {
            return (
              <li key={`favs-li-${favs.id}`}>
                <img src={favs.images.fixed_width.url} alt="a Gif" />
                <MdDelete
                  onClick={() => {
                    deleteGif(favs);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
