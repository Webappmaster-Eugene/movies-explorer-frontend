import React from 'react';

import {Link} from 'react-router-dom';

import styles from './TemplateName.module.scss';

const TemplateName = () => {
  return (
  <div className={styles.templateName}>
    <a className={styles.link} to="/"></a>
  </div>
  );
};

export default TemplateName;
