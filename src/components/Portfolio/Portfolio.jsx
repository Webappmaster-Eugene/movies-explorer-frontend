import linkportfolio from '../../images/linkportfolio.svg';

import styles from './Portfolio.module.scss';

const Portfolio = () => {
  return (
    <div className={styles.portfolio}>
      <h2 className={styles.portfolio__header}>Портфолио</h2>

      <div className={styles.portfolio__links}>
        <div className={styles.portfolio__linkBlock}>
          <a
            className={styles.portfolio__link}
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Numarta/russian-travel">
            Статичный сайт
          </a>
          <img
            className={styles.portfolio__linkImage}
            src={linkportfolio}
            alt="стрелка ссылки"></img>
        </div>

        <div className={styles.portfolio__linkBlock}>
          <a
            className={styles.portfolio__link}
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Numarta/how-to-learn">
            Адаптивный сайт
          </a>
          <img
            className={styles.portfolio__linkImage}
            src={linkportfolio}
            alt="стрелка ссылки"></img>
        </div>

        <div className={styles.portfolio__linkBlock}>
          <a
            className={styles.portfolio__link}
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Numarta/react-mesto-api-full-gha">
            Одностраничное приложение
          </a>
          <img
            className={styles.portfolio__linkImage}
            src={linkportfolio}
            alt="стрелка ссылки"></img>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
