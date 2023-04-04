import React, { useEffect, useState } from 'react';
import styles from './blogs.module.scss';
import Search from '../search/search';
import { useNavigate } from "react-router-dom";
import { globalInitialiserCallbacks } from '../../utils/initializeSetup';

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
  let [blogs, setBlogs] = useState(JSON.parse(localStorage.getItem('blogs')||null));
  let [tags, setTags] =  useState(JSON.parse(localStorage.getItem('tags')||null));

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
  useEffect(() => {
    globalInitialiserCallbacks.BlogsCallBack = (data) => {
      if (data.blogs) {
        setBlogs(data.blogs);
      }
      if (data.tags) {
        setTags(data.tags);
      }
    }
  });
  return (
    <div className={[styles.Blogs, styles[theme]].join(" ")}>
      <Search onTextUpdate={searchTextUpdate} tags={tags} buttonClick={buttonClick} theme={theme} />
      <div className={styles.content}>
        <div className={styles.blogWrapper}>
          {blogs && blogs.map((item, i) =>
            <div className={styles.verticalItem} key={i}>
              <div className={styles.item}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              </div>
              <div style={{ display: 'flex', margin: '0 auto' }}>
                {item.blog && item.blog.length > 0 &&
                  <button onClick={() => window.open(item.blog.length, "_blank")}>
                    Read Blog
                  </button>
                }

                {item.download && item.download.length > 0 &&
                  <button onClick={() => window.open(item.download.length, "_blank")}>
                    Checkout App
                  </button>
                }
              </div>
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
