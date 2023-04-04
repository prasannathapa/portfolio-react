import React, { useState } from 'react';
import styles from './blogs.module.scss';
import Search from '../search/search';
import { useNavigate } from "react-router-dom";
import { tags } from '../../utils/db';

const searchTextUpdate = (text, tags) => {
  console.log(text, tags);
}
function getTheme() {
  let theme = localStorage.getItem('theme');
  if (theme === 'auto' || theme === null) {
    theme = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light';
  }
  return theme;
}

const Blogs = () => {
  const navigate = useNavigate();
  let [theme, setTheme] = useState(getTheme());

  const changeTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
      document.querySelector("meta[name='theme-color']").content = "#000";
    } else if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
      document.querySelector("meta[name='theme-color']").content = "#fff";
    }
  }
  const buttonClick = (id) => {
    switch (id) {
      case 'changeTheme':
        changeTheme();
        break;
      case 'back':
        navigate('/');
        break;
      default:
    }
  }
  return (
    <div className={[styles.Blogs, styles[theme]].join(" ")}>
      <Search onTextUpdate={searchTextUpdate} tags={tags} buttonClick={buttonClick} theme={theme} />
      <div className={styles.content}>
        <div className={styles.blogWrapper}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => <div className={styles.verticalItem}>
            <div className={styles.item}>
              <img src="https://makaut-student.web.app/static/media/result-prev.fcf063a6.png" />
              <div>
                <h3>MAKAUT API</h3>
                <p>This is an analytics tool for your semester results as well as a rating card for your profile</p>
              </div>
            </div>
            <button>
              Read More
            </button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

Blogs.propTypes = {};

Blogs.defaultProps = {};

export default Blogs;
