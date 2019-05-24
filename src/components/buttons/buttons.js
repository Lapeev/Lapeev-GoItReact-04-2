import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './controls.module.css';

const ControlButtons = ({
  value,
  length,
  onHandleDecrement,
  onHandleIncrement,
}) => (
  <section className={style.controls}>
    {value > 1 && (
      <NavLink
        onClick={onHandleDecrement}
        to={{ pathname: `/reader`, search: `?item=${value - 1}` }}
        className={style.button}
      >
        Назад
      </NavLink>
    )}
    {value === 1 && (
      <span className={classNames(style.button, style.disabled)}>Назад</span>
    )}
    {value < length && (
      <NavLink
        onClick={onHandleIncrement}
        to={{ pathname: `/reader`, search: `?item=${value + 1}` }}
        className={style.button}
      >
        Вперед
      </NavLink>
    )}
    {value === length && (
      <span className={classNames(style.button, style.disabled)}>Вперёд</span>
    )}
  </section>
);

ControlButtons.propTypes = {
  value: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  onHandleDecrement: PropTypes.func.isRequired,
  onHandleIncrement: PropTypes.func.isRequired,
};

export default ControlButtons;
