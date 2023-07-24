// import pic from '../../images/avatar.png';
import flaggray from '../../images/flaggray.png';
import flagwhite from '../../images/flagwhite.png';
import deleteicon from '../../images/deleteicon.png';

import styles from './MoviesCard.module.scss';

const MoviesCard = ({ movieInfo }) => {
  const {
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
    _id,
  } = movieInfo;

  const secToTime = (duration) => {
    const hours = Math.floor(duration / 60);
    const min = Math.floor(duration % 60);
    return `${hours}ч ${min}м`;
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__top}>
        <div className={styles.card__left}>
          <p className={styles.card__name}>{nameRU}</p>
          <p className={styles.card__duration}>{secToTime(duration)}</p>
        </div>

        {/* <div className={`${styles.card__right} ${styles.card__right_active}`}> */}
        <div className={`${styles.card__right}`}>
          <img
            // className={`${styles.card__favorite} ${styles.card__favorite_active}`}
            className={`${styles.card__favorite}`}
            alt="добавить в избранное"
            src={flaggray}></img>
        </div>
      </div>

      <div className={styles.card__bottom}>
        <img className={styles.card__image} src={image} alt={description}></img>
      </div>
    </div>
  );
};

export default MoviesCard;
