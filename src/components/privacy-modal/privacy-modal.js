import React, { useState } from 'react';
import styles from './privacy-modal.module.scss';
import TextInput from "../text-input/text-input";
import { putToken } from '../../utils/api-util';
import { languages, t } from '../../utils/db';

const PrivacyModal = (props) => {
  let [submit, setSubmit] = useState(false);
  let [text, setText] = useState(localStorage.getItem('name') || "");
  let [submitButtonState, setSubmitButtonState] = useState(0);
  let lang = localStorage.getItem('selectedLang') || languages[0];
  const onTextInput = (text, done) => {
    setSubmit(done);
    setText(text);
  }
  const clearPII = () => {
    localStorage.removeItem('name');
    props.dataCallback(true, null);
  }
  const showPII = () => {
    setSubmitButtonState(styles.active);
    localStorage.setItem('name', text)
    putToken((data, err) => {
      if (err) {
        setSubmitButtonState(styles.none);
        props.dataCallback(false, t(lang,'text.error'));
      } else {
        setSubmitButtonState(styles.finished);
        props.dataCallback(false, t(lang,"privacy.submitted"));
        if (data.result === 'success') {
          props.dataCallback(true, "success");
        } else if (data.result === 'submitted') {
          props.dataCallback(true, "Submitted for approval");
        }
      }
    })
  }
  let showClass = props.show ? styles.show : styles.hide;
  return (
    <div className={props.darkTheme ? styles.darkTheme : null}>
      <div className={styles.modal + ' ' + showClass}>
        <div className={styles.modalContent}>
          <span onClick={() => props.dataCallback(true)} className={styles.close}>&times;</span>
          <div className={styles.header}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M690.882 786q25.883 0 44-19Q753 748 753 722.118q0-25.883-18.118-44-18.117-18.118-44-18.118Q665 660 646 678.118q-19 18.117-19 44Q627 748 646 767q19 19 44.882 19ZM689.5 911q33.5 0 60.5-14t46-40q-26-14-51.962-21-25.961-7-54-7-28.038 0-54.538 7-26.5 7-51.5 21 19 26 45.5 40t60 14ZM480 976q-138-32-229-156.5T160 534V295l320-120 320 120v270q-14-7-30-12.5t-30-7.5V337l-260-96-260 96v197q0 76 24.5 140T307 786.5q38 48.5 84 80.5t89 46q6 12 18 27t20 23q-9 5-19 7.5t-19 5.5Zm212.5 0Q615 976 560 920.5T505 789q0-78.435 54.99-133.718Q614.98 600 693 600q77 0 132.5 55.282Q881 710.565 881 789q0 76-55.5 131.5t-133 55.5ZM480 577Z" /></svg>
            <span>{t(lang, 'settings.privacy_notice')}</span>
          </div>
          <p>{t(lang, 'settings.privacy_about')}</p>
          <TextInput regex={/^[a-z\d\-_\s]+$/i} onTextInput={onTextInput} text={text} label={t(lang, 'text.name')} />

          {submit &&
            <div onClick={showPII} className={styles.flex}>
              <button className={styles.button + ' ' + submitButtonState}>
              {t(lang, 'text.submit')}
              </button>
            </div>
          }

          <p className={styles.footer}>{t(lang, 'settings.privacy_footer')}</p>
        </div>
        {!submit &&
          <div onClick={clearPII} className={styles.flex}>
            <button className={styles.clearPII}><span>{t(lang, 'text.skip')}</span></button>
          </div>
        }
      </div>
    </div>
  );
}

PrivacyModal.propTypes = {};

PrivacyModal.defaultProps = {};

export default PrivacyModal;
