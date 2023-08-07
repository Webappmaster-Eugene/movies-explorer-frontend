import { useState, useEffect, useRef } from 'react';

import useResize from 'use-resize';

import { cleanup } from '@testing-library/react';

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
  isShortVideos,
  onChangeToggle,
  onClickButtonSearch,
}) => {
  const [countFilms, setCountFilms] = useState(0);
  const windowWidth = useResize().width;

  useEffect(() => {
    if (windowWidth >= 1280) {
      setCountFilms(12);
    } else if (windowWidth < 1280 && windowWidth >= 768) {
      setCountFilms(8);
    } else {
      setCountFilms(5);
    }
  }, [windowWidth]);

  const etcFilms = () => {
    if (windowWidth >= 1280) {
      setCountFilms(countFilms + 3);
    } else if (windowWidth < 1280 && windowWidth >= 768) {
      setCountFilms(countFilms + 2);
    } else {
      setCountFilms(countFilms + 2);
    }
  };

  useEffect(() => {
    localStorage.setItem('searchFilmsResult', JSON.stringify(searchFilmsResult));
  }, [searchFilmsResult]);

  const onChangeSearch = (event) => {
    setSearchTextInputValue(event.target.value.toLowerCase().replaceAll(' ', ''));
  };

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
          movies={searchFilmsResult ?? JSON.parse(localStorage.getItem('searchFilmsResult'))}
          handleCreateMovie={handleCreateMovie}
          handleDeleteMovie={handleDeleteMovie}
          savedMovies={savedMovies}
        />
      )}
    </div>
  );
};

export default Movies;
