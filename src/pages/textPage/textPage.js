import React from 'react';
import PropTypes from 'prop-types';
import style from './textPage.module.css';

const TextPage = ({ title, text }) => (
  <section className={style.publication}>
    <h2>{title}</h2>
    <p>{text}</p>
  </section>
);

TextPage.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TextPage;
