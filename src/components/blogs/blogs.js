import React from 'react';
import PropTypes from 'prop-types';
import styles from './blogs.module.scss';

const Blogs = () => (
  <div className={styles.Blogs}>
    <div className={styles.blogSlider}>
      <div className={[styles.blogSlider__wrp, styles.swiperWrapper].join(' ')}>
        <div className={[styles.blogSlider__item, styles.swiperSlide].join(' ')}>
          <div className={styles.blogSlider__img}>
            <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp" alt="" />
          </div>
          <div className={styles.blogSlider__content}>
            <span className={styles.blogSlider__code}>26 December 2019</span>
            <div className={styles.blogSlider__title}>Lorem Ipsum Dolor</div>
            <div className={styles.blogSlider__text}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi? </div>
            <a href="#" className={styles.blogSlider__button}>READ MORE</a>
          </div>
        </div>
        <div className={[styles.blogSlider__item, styles.swiperSlide].join(' ')}>
          <div className={styles.blogSlider__img}>
            <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp" alt="" />
          </div>
          <div className={styles.blogSlider__content}>
            <span className={styles.blogSlider__code}>26 December 2019</span>
            <div className={styles.blogSlider__title}>Lorem Ipsum Dolor2</div>
            <div className={styles.blogSlider__text}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</div>
            <a href="#" className={styles.blogSlider__button}>READ MORE</a>
          </div>
        </div>

        <div className={styles.blogSlider__item + ' ' + styles.swiperSlide}>
          <div className={styles.blogSlider__img}>
            <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp" alt="" />
          </div>
          <div className={styles.blogSlider__content}>
            <span className={styles.blogSlider__code}>26 December 2019</span>
            <div className={styles.blogSlider__title}>Lorem Ipsum Dolor</div>
            <div className={styles.blogSlider__text}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</div>
            <a href="#" className={styles.blogSlider__button}>READ MORE</a>
          </div>
        </div>

      </div>
      <div class="blog-slider__pagination"></div>
    </div>  </div>
);

Blogs.propTypes = {};

Blogs.defaultProps = {};

export default Blogs;
