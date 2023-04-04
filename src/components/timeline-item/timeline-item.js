import React from 'react';
import styles from '../portfolio/portfolio.module.scss';
import { t } from '../../utils/db';

function convertStringToLink(inputString) {
  const splitRegex = /\[\((.+?)\)(.+?)\]/g; // regular expression to match [(link)title] pattern
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  const parts = inputString.split(splitRegex); // split the string based on the regex pattern
  const elements = [];
  let link = undefined;
  parts.forEach((part, index) => {
    if (part.match(urlRegex)) {
      link = part;
    } else if (link) {
      elements.push(
        <a key={index} href={link} target="_blank" rel="noreferrer">
          {part}
        </a>
      )
      link = undefined;
    } else {
      elements.push(<span key={index}>{part}</span>);
    }
  });
  return elements; // return the array of elements wrapped in a container
}

const TimelineItem = (props) => (
  <div>
    <div className={styles.cardSubtitle}>
      <a href={props.data.link} target="_blank" rel="noreferrer">
        <img width={96} src={props.data.image} alt={t(props.data.heading, props.language)} />
      </a>
      <span>{t(props.data.title, props.language)}</span>
    </div>
    <div className={styles.cardTimeline}>
      {props.data.timeline.map((item, i) =>
        <div key={i} className={styles.cardItem} data-year={item.year}>
          <div className={styles.cardItemTitle}>{t(item.title, props.language)}</div>
          <div className={styles.cardItemDesc}>
            {
              convertStringToLink(t(item.description, props.language)).map(elem => elem)
            }
            {item.image &&
              <a href={item.image.link} target="_blank" rel="noreferrer">
                <img src={item.image.src} alt={item.title} />
              </a>
            }
          </div>
        </div>
      )}
    </div>
  </div>
);

TimelineItem.propTypes = {};

TimelineItem.defaultProps = {};

export default TimelineItem;
