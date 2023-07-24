import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <section className={styles.notfound}>
      <h2 className={styles.notfound__header}>404</h2>
      <p className={`${styles.notfound__text}`}>Страница не найдена</p>
      <Link to="/" className={`${styles.notfound__link}`}>
        Назад
      </Link>
    </section>
  );
};

export default NotFound;
