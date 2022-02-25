import axios from 'axios';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { MdDelete, MdFavorite } from 'react-icons/md';
import {
  allGifsWrapper,
  containerMain,
  controlsWrapper,
  favGifsWrapper,
  gifList,
  heartStyle,
} from '../styles';
import Paginate from './pagination';

export default function Giphy() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favGifs, setFavGifs] = useState([]);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gifsPerPage, setGifsPerPage] = useState(10);
  const [reset, setReset] = useState(false);

  const indexOfLastGif = currentPage * gifsPerPage;
  const indexOfFirstGif = indexOfLastGif - gifsPerPage;
  const currentGifs = gifs.slice(indexOfFirstGif, indexOfLastGif);

  console.log(favGifs);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const results = await axios('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: 'vf7nDm11F3X2Pe63jIGjWWPiFCFCZXM8',
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
  }, [reset]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);

    try {
      const results = await axios('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: 'vf7nDm11F3X2Pe63jIGjWWPiFCFCZXM8',
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

  function resetSearch() {
    setReset(!reset);
  }

  function download() {
    favGifs.forEach((element) =>
      saveAs(` ${element.bitly_url} `, ` ${element.title} `),
    );
  }

  // Download wird von Giphy-API verhindert. Bleibt im Code for future reference.

  return (
    <div css={containerMain}>
      <div css={controlsWrapper}>
        {renderError()}
        <form>
          <input
            value={searchTerm}
            placeholder="Search Gifs"
            onChange={handleSearch}
          />
          <button onClick={handleSubmit}>Search</button>
          <button onClick={() => setFavGifs([])}>Clear Favs</button>
          <br />
          <button onClick={() => resetSearch()}>Reset Search</button>
          <button onClick={() => download()}>Download all Favs</button>
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
        <div className="favsWrapper">
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
    </div>
  );
}
