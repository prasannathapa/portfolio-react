import React, { useState } from 'react';
import styles from './search.module.scss';


const Search = (props) => {

  let [searchState, setSearchState] = useState(false);
  let [selectedTags, setSelectedTags] = useState({});
  let [text, setText] = useState("");
  let [isExpanded, setExpanded] = useState(true);

  const onTextUpdate = (e) => {
    let text = e.target.value;
    setText(text);
    props.onTextUpdate(text, selectedTags);
    setSearchState(text.length > 0)
  }
  const onClick = (e) => {
    props.buttonClick(e.target.getAttribute('data'));
  }
  const expand = () => {
    setExpanded(!isExpanded);
  }
  const tagClick = (i) => {
    setSelectedTags({
      ...selectedTags,
      [i]: !selectedTags[i]
    })
    props.onTextUpdate(text, selectedTags);
  }
  let icon = <img onClick={onClick} data="search" src='/util-icons/search.svg' alt='search' />;
  if (!searchState) {
    icon = <img onClick={onClick} data="back" src='/util-icons/back.svg' alt='back' />;
  }
  return (
    <div className={styles.Search}>
      <div className={styles[props.theme]}>
        <div className={styles.searchwrapper}>
          {icon}

          <input onChange={onTextUpdate} value={text} className={styles.searchinput} type="text" placeholder="Search" />
          <svg onClick={onClick} data="changeTheme" className={styles.moon} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
            <defs></defs>
            <path onClick={onClick} data="changeTheme" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </svg>
        </div>
        <div className={[styles.tagsWrapper, isExpanded?styles.maxHeight40:styles.maxHeightAuto].join(" ")}>
          {props.tags && props.tags.map((item, i) =>
            <div onClick={() => tagClick(i)} className={[styles.tags, selectedTags[i] ? styles.active : null].join(' ')} key={i}>
              <img width={24} height={24} src={item.src} alt={item.title} />
              <span>{item.title}</span>
            </div>
          )}
        </div>
        <div style={{display:'grid'}} onClick={expand}>
          <svg className={[styles.expand, isExpanded?styles.rotate:styles.straight].join(' ')} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="48"><path d="m283 711-43-43 240-240 240 239-43 43-197-197-197 198Z" /></svg>
        </div>
      </div>
    </div>
  );
}

Search.propTypes = {};

Search.defaultProps = {};

export default Search;
