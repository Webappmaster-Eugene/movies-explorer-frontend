import styles from './NavTab.module.scss';

const NavTab = () => {
  return (
    <div className={styles.navtab}>
      <a className={styles.navtab__link} href="#about-project">
        О проекте
      </a>
      <a className={styles.navtab__link} href="#techs">
        Технологии
      </a>
      <a className={styles.navtab__link} href="#about-me">
        Студент
      </a>
    </div>
  );
};

export default NavTab;
