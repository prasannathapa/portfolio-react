import React, { useState } from 'react';
import styles from './settings-modal.module.scss';
import { languages, themes, t} from '../../utils/db';

const SettingsModal = (props) => {
  const [themeSelected, setThemeSelected] = useState(localStorage.getItem('theme') || themes[0]);
  const [langSelected, setLangSelected] = useState(localStorage.getItem('selectedLang') || languages[0]);

  const changeTheme = (event) => {
    localStorage.setItem('theme', event.target.value);
    props.dataCallback(true, "theme", event.target.value);
    setThemeSelected(event.target.value);
  }
  const changeLang = (event) => {
    localStorage.setItem('selectedLang', event.target.value);
    props.dataCallback(false, "lang", event.target.value);
    setLangSelected(event.target.value);
  }
  let langs = JSON.parse(localStorage.getItem('langs'));
  let showClass = props.show ? styles.show : styles.hide;
  return (
    <div className={props.darkTheme ? styles.darkTheme : null}>
      <div className={styles.modal + ' ' + showClass}>
        <div className={styles.modalContent}>
          <span onClick={() => props.dataCallback(true)} className={styles.close}>&times;</span>
          <div className={styles.header}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m388 976-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185 576q0-9 .5-20.5T188 535L80 456l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669 346l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592 850l-20 126H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410 576q0-29 20.5-49.5T480 506q29 0 49.5 20.5T550 576q0 29-20.5 49.5T480 646Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715 576q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538 348l-14-112h-88l-14 112q-34 7-63.5 24T306 414l-106-46-40 72 94 69q-4 17-6.5 33.5T245 576q0 17 2.5 33.5T254 643l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z" /></svg>
            <span>{t(langSelected, 'settings.title')}</span>
          </div>
          <div className={styles.select}>
            <span>{t(langSelected, 'settings.theme')}</span>
            <select onChange={changeTheme} value={themeSelected} >
              {themes.map((theme, i) =>
                <option key={i} value={theme}>{t(langSelected,theme)}</option>
              )}
            </select>
          </div>

          <div className={styles.select}>
            <span>{t(langSelected, 'settings.language')}</span>
            <select onChange={changeLang}  value={langSelected}>
              {langs.map((lang, i) =>
                <option key={i} value={lang}>{t(langSelected,lang)}</option>
              )}
            </select>
          </div>
          <div className={styles.flex}>
            <button onClick={() => props.dataCallback(false, "unMaskData")} className={styles.clearPII}><span>{t(langSelected, 'settings.unmask_data')}</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}

SettingsModal.propTypes = {};

SettingsModal.defaultProps = {};

export default SettingsModal;
