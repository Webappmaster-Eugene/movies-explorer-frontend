import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// import { films } from '../../utils/fakedb';
// import { savedFilms } from '../../utils/fakedb';

import {
  loginUser,
  createUser,
  getUserInfo,
  updateUser,
  createMovie,
  getMovies,
  deleteMovie,
} from '../../utils/MainApi';

import { getAllMovies } from '../../utils/MoviesApi';

import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';
import InfoToolTip from '../InfoToolTip';
import Movies from '../Movies';
import SavedMovies from '../SavedMovies';
import Register from '../Register';
import Login from '../Login';
import Profile from '../Profile';
import NotFound from '../NotFound';
import LoadingAnimation from '../LoadingAnimation';

import ProtectedRoute from '../ProtectedRoute';

import styles from './App.module.scss';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isInfoToolTipVisible, setIsInfoToolTipVisible] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState('');
  const [isLoadingVisible, setIsLoadingVisible] = React.useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);

  const [logedIn, setLogedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({ email: '', name: '' });

  const [savedMovies, setSavedMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);

  const [searchTextInputValue, setSearchTextInputValue] = React.useState('');
  const [searchFilmsResult, setSearchFilmsResult] = React.useState([]);

  useEffect(() => {
    const TOKEN = localStorage.getItem('jwt');

    if (TOKEN) {
      setLogedIn(true);
      handleGetInfoUser();
      handleGetAllMovies();
      handleGetMovies();
      navigate('/movies', { replace: true });
    }
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem('searchFilmsResult') === 'null') {
  //     localStorage.setItem('searchFilmsResult', JSON.stringify([]));
  //     console.log(localStorage.getItem('searchFilmsResult'));
  //   }
  //   if (localStorage.getItem('searchTextInputValue') === 'null') {
  //     localStorage.setItem('searchTextInputValue', JSON.stringify(''));
  //   }
  //    //setSearchTextInputValue(localStorage.getItem('searchTextInputValue') || '');
  //    //setSearchFilmsResult(JSON.parse(localStorage.getItem('searchFilmsResult')) || []);
  //    //setIsShortVideos(localStorage.getItem('isShortVideos') === 'true' ? true : false);
  // }, []);

  //Получить все фильмы из стороннего API для дальнейшей работы с ними
  async function handleGetAllMovies() {
    setIsLoadingVisible(true);
    try {
      const allMoviesResponse = await getAllMovies();
      setAllMovies(allMoviesResponse);
    } catch (err) {
      console.log(err);
      setIsInfoToolTipVisible(true);
      setInfoMessage('Произошла ошибка при попытке получения всех фильмов из стороннего API!');
    } finally {
      setIsLoadingVisible(false);
      isInfoToolTipVisible &&
        setTimeout(() => {
          setIsInfoToolTipVisible(false);
          setInfoMessage('');
        }, 4500);
    }
  }

  //ЮЗЕРЫ

  async function handleGetInfoUser() {
    setIsLoadingVisible(true);
    try {
      const response = await getUserInfo();
      setUserInfo({ email: response.email, name: response.name });
    } catch (err) {
      console.log(err);
      setIsInfoToolTipVisible(true);
      setInfoMessage('Произошла ошибка при попытке запроса инофрмации о пользователе!');
    } finally {
      setIsLoadingVisible(false);
      isInfoToolTipVisible &&
        setTimeout(() => {
          setIsInfoToolTipVisible(false);
          setInfoMessage('');
        }, 4500);
    }
  }

  async function handleLoginUser({ email, password }) {
    setIsLoadingVisible(true);
    try {
      console.log({ email, password });
      const response2 = await loginUser({ email, password });
      const token = await response2.token;
      localStorage.setItem('jwt', token);
      setLogedIn(true);
      await handleGetInfoUser();
      navigate('/movies', { replace: true });
    } catch (err) {
      console.log(err);
      setIsInfoToolTipVisible(true);
      setInfoMessage('Произошла ошибка при попытке логина! Исправьте логин/пароль');
    } finally {
      setIsLoadingVisible(false);
      isInfoToolTipVisible &&
        setTimeout(() => {
          setIsInfoToolTipVisible(false);
          setInfoMessage('');
        }, 4500);
    }
  }

  async function handleRegisterUser({ email, password, name }) {
    setIsLoadingVisible(true);
    try {
      const response = await createUser({ email, password, name });
      const response2 = await loginUser({ email, password });
      const token = await response2.token;
      localStorage.setItem('jwt', token);
      setLogedIn(true);
      await handleGetInfoUser(token);
      navigate('/movies', { replace: true });
    } catch (err) {
      console.log(err);
      setIsInfoToolTipVisible(true);
      setInfoMessage(
        'Произошла ошибка при попытке регистрации профиля! Исправьте логин/пароль/имя',
      );
    } finally {
      setIsLoadingVisible(false);
      setTimeout(() => {
        setIsInfoToolTipVisible(false);
        setInfoMessage('');
      }, 4500);
    }
  }

  async function handleUpdateUser({ email, name }) {
    setIsLoadingVisible(true);
    try {
      const response = await updateUser({ email, name });
      setUserInfo({ email: response.email, name: response.name });
    } catch (err) {
      console.log(err);
      setIsInfoToolTipVisible(true);
      setInfoMessage('Произошла ошибка при попытке изменения профиля! Исправьте логин/имя');
    } finally {
      setIsLoadingVisible(false);
      isInfoToolTipVisible &&
        setTimeout(() => {
          setIsInfoToolTipVisible(false);
          setInfoMessage('');
        }, 4500);
    }
  }

  async function handleLogOut() {
    setIsLoadingVisible(true);

    try {
      setUserInfo({ email: '', name: '' });
      localStorage.removeItem('jwt');
      setLogedIn(false);
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
      setIsInfoToolTipVisible(true);
      setInfoMessage('Произошла ошибка при попытке выхода из профиля');
    } finally {
      setIsLoadingVisible(false);
      isInfoToolTipVisible &&
        setTimeout(() => {
          setIsInfoToolTipVisible(false);
          setInfoMessage('');
        }, 4500);
    }
  }

  //ФИЛЬМЫ
  async function handleCreateMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  }) {
    setIsLoadingVisible(true);
    try {
      const response = await createMovie({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        nameRU,
        nameEN,
        movieId,
      });
      console.log(response);
      setSavedMovies([response, ...savedMovies]);
    } catch (err) {
      console.log(err);
      setIsInfoToolTipVisible(true);
      setInfoMessage('Произошла ошибка при попытке добавления фильма в избранное!');
    } finally {
      setIsLoadingVisible(false);
      isInfoToolTipVisible &&
        setTimeout(() => {
          setIsInfoToolTipVisible(false);
          setInfoMessage('');
        }, 4500);
    }
  }

  async function handleGetMovies() {
    setIsLoadingVisible(true);
    try {
      setIsPreloaderVisible(true);
      const response = await getMovies();
      setSavedMovies(response);
    } catch (err) {
      console.log(err);
      setIsInfoToolTipVisible(true);
      setInfoMessage('Произошла ошибка при попытке получения информации о сохраненных фильмах!');
    } finally {
      setIsLoadingVisible(false);
      setIsPreloaderVisible(false);
      isInfoToolTipVisible &&
        setTimeout(() => {
          setIsInfoToolTipVisible(false);
          setInfoMessage('');
        }, 4500);
    }
  }

  async function handleDeleteMovie(movieId) {
    setIsLoadingVisible(true);
    try {
      const getResponse = await getMovies();
      const findedMovieId = getResponse.filter((movie) => movie.movieId === movieId)[0]._id;
      console.log(getResponse);
      const response = await deleteMovie(findedMovieId);

      setSavedMovies([...getResponse.filter((movie) => movie.movieId !== movieId)]);
    } catch (err) {
      setIsInfoToolTipVisible(true);
      setInfoMessage('Произошла ошибка при попытке удаления фильма!');
    } finally {
      setIsLoadingVisible(false);
      isInfoToolTipVisible &&
        setTimeout(() => {
          setIsInfoToolTipVisible(false);
          setInfoMessage('');
        }, 4500);
    }
  }

  return (
    <CurrentUserContext.Provider value={userInfo}>
      {isLoadingVisible && <LoadingAnimation />}
      <div className={styles.app}>
        {isInfoToolTipVisible && (
          <InfoToolTip
            infoMessage={infoMessage}
            setIsInfoToolTipVisible={setIsInfoToolTipVisible}
          />
        )}
        {(pathname === '/movies' ||
          pathname === '/saved-movies' ||
          pathname === '/' ||
          pathname === '/profile') && <Header pathname={pathname} logedIn={logedIn} />}

        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                logedIn={logedIn}
                isPreloaderVisible={isPreloaderVisible}
                movies={allMovies}
                handleCreateMovie={handleCreateMovie}
                handleDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
                searchTextInputValue={searchTextInputValue}
                setSearchTextInputValue={setSearchTextInputValue}
                searchFilmsResult={searchFilmsResult}
                setSearchFilmsResult={setSearchFilmsResult}
                pathnam={pathname}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                isPreloaderVisible={isPreloaderVisible}
                logedIn={logedIn}
                movies={savedMovies}
                handleDeleteMovie={handleDeleteMovie}
                pathnam={pathname}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                logedIn={logedIn}
                handleLogOut={handleLogOut}
                handleUpdateUser={handleUpdateUser}
              />
            }
          />
          {!logedIn && (
            <Route
              path="/signin"
              element={<Login isLogedIn={logedIn} handleLoginUser={handleLoginUser} />}
            />
          )}
          {!logedIn && (
            <Route
              path="/signup"
              element={<Register isLogedIn={logedIn} handleRegisterUser={handleRegisterUser} />}
            />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {(pathname === '/movies' || pathname === '/saved-movies' || pathname === '/') && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
