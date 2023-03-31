import React from 'react';
import PropTypes from 'prop-types';
import styles from './social-icons.module.scss';

const SocialIcons = (props) => (
  <a target="_blank" href={props.link} rel="noreferrer">
    <svg viewBox={props.viewBox} xmlns="http://www.w3.org/2000/svg">
      {props.paths.map((path,i) => (
        <path key={i} d={path} />
      ))}
    </svg>
  </a>
);

SocialIcons.propTypes = {};

SocialIcons.defaultProps = {};

export default SocialIcons;
