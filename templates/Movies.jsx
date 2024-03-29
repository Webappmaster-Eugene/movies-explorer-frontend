import { useState, useEffect } from 'react';

import useResize from 'use-resize';

import SearchForm from '../SearchForm';
import MoviesCardList from '../MoviesCardList';
import Preloader from '../Preloader';

import { DURATION_SHORT_FILM } from '../../utils/consts';

import { CYRILLIC_REGEX } from '../../utils/regEx';

import styles from './Movies.module.scss';

const Movies = ({
  movies,
  handleCreateMovie,
  handleDeleteMovie,
  savedMovies,
  isPreloaderVisible,
  searchTextInputValue,
  setSearchTextInputValue,
  searchFilmsResult,
  setSearchFilmsResult,
  pathname,
}) => {
  const [countFilms, setCountFilms] = useState(0);
  const windowWidth = useResize().width;

  const [isShortVideos, setIsShortVideos] = useState(
    localStorage.getItem('isShortVideos') === 'true' ? true : false,
  );

  useEffect(() => {
    if (windowWidth >= 1280) {
      setCountFilms(12);
    } else if (windowWidth < 1280 && windowWidth >= 768) {
      setCountFilms(8);
    } else {
      setCountFilms(5);
    }
  }, [windowWidth]);

  // useEffect(() => {
  //   setSearchFilmsResult(JSON.parse(localStorage.getItem('searchFilmsResult')));
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('searchFilmsResult', JSON.stringify(searchFilmsResult));
  // }, [searchFilmsResult]);

  const onClickButtonSearch = (event) => {
    event.preventDefault();

    setSearchFilmsResult(
      movies.filter((movie) => {
        if (CYRILLIC_REGEX.test(searchTextInputValue)) {
          return isShortVideos
            ? movie.duration <= DURATION_SHORT_FILM &&
                movie.nameRU.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue)
            : movie.nameRU.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue);
        } else {
          return isShortVideos
            ? movie.duration <= DURATION_SHORT_FILM &&
                movie.nameEN.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue)
            : movie.nameEN.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue);
        }
      }),
    );

    localStorage.setItem('searchTextInputValue', searchTextInputValue);

    localStorage.setItem(
      'searchFilmsResult',
      JSON.stringify(
        movies.filter((movie) => {
          if (CYRILLIC_REGEX.test(searchTextInputValue)) {
            return isShortVideos
              ? movie.duration <= DURATION_SHORT_FILM &&
                  movie.nameRU.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue)
              : movie.nameRU.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue);
          } else {
            return isShortVideos
              ? movie.duration <= DURATION_SHORT_FILM &&
                  movie.nameEN.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue)
              : movie.nameEN.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue);
          }
        }),
      ),
    );
  };

  const onChangeSearch = (event) => {
    setSearchTextInputValue(event.target.value.toLowerCase().replaceAll(' ', ''));
  };

  const onChangeToggle = () => {
    setIsShortVideos(isShortVideos ? false : true);
  };

  const etcFilms = () => {
    if (windowWidth >= 1280) {
      setCountFilms(countFilms + 3);
    } else if (windowWidth < 1280 && windowWidth >= 768) {
      setCountFilms(countFilms + 2);
    } else {
      setCountFilms(countFilms + 1);
    }
  };

  useEffect(() => {
    localStorage.setItem('isShortVideos', isShortVideos ? true : false);
    setSearchFilmsResult(
      movies.filter((movie) => {
        if (CYRILLIC_REGEX.test(searchTextInputValue)) {
          return isShortVideos
            ? movie.duration <= DURATION_SHORT_FILM &&
                movie.nameRU.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue)
            : movie.nameRU.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue);
        } else {
          return isShortVideos
            ? movie.duration <= DURATION_SHORT_FILM &&
                movie.nameEN.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue)
            : movie.nameEN.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue);
        }
      }),
    );
  }, [isShortVideos]);

  useEffect(() => {
    setSearchFilmsResult(
      movies.filter((movie) => {
        if (CYRILLIC_REGEX.test(searchTextInputValue)) {
          return isShortVideos
            ? movie.duration <= DURATION_SHORT_FILM &&
                movie.nameRU.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue)
            : movie.nameRU.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue);
        } else {
          return isShortVideos
            ? movie.duration <= DURATION_SHORT_FILM &&
                movie.nameEN.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue)
            : movie.nameEN.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue);
        }
      }),
    );

    localStorage.setItem('searchTextInputValue', searchTextInputValue);

    localStorage.setItem(
      'searchFilmsResult',
      JSON.stringify(
        movies.filter((movie) => {
          if (CYRILLIC_REGEX.test(searchTextInputValue)) {
            return isShortVideos
              ? movie.duration <= DURATION_SHORT_FILM &&
                  movie.nameRU.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue)
              : movie.nameRU.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue);
          } else {
            return isShortVideos
              ? movie.duration <= DURATION_SHORT_FILM &&
                  movie.nameEN.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue)
              : movie.nameEN.toLowerCase().replaceAll(' ', '').includes(searchTextInputValue);
          }
        }),
      ),
    );
  }, [isShortVideos]);

  return (
    <div className={styles.movies}>
      <SearchForm
        isShortVideos={isShortVideos}
        onClickButtonSearch={onClickButtonSearch}
        onChangeToggle={onChangeToggle}
        onChangeSearch={onChangeSearch}
        pathname={pathname}
        searchTextInputValue={searchTextInputValue}
      />
      {isPreloaderVisible ? (
        <Preloader />
      ) : (
        <MoviesCardList
          etcFilms={etcFilms}
          countFilms={countFilms}
          movies={searchFilmsResult || JSON.parse(localStorage.getItem('searchFilmsResult'))}
          handleCreateMovie={handleCreateMovie}
          handleDeleteMovie={handleDeleteMovie}
          savedMovies={savedMovies}
        />
      )}
    </div>
  );
};

export default Movies;
