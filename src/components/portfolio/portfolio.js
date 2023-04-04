import React, { useEffect, useState } from 'react';
import { languages, loadingSvg, t } from '../../utils/db';
import PrivacyModal from '../privacy-modal/privacy-modal';
import SocialIcons from '../social-icons/social-icons';
import styles from './portfolio.module.scss';
import modalCss from '../privacy-modal/privacy-modal.module.scss';
import SettingsModal from '../settings-modal/settings-modal';
import { globalInitialiserCallbacks } from '../../utils/initializeSetup';
import TimelineItem from '../timeline-item/timeline-item';
import { useNavigate } from "react-router-dom";

function Portfolio() {


  let [toastmsg, setToastMsg] = useState("");
  const [language, setLang] = useState(localStorage.getItem('selectedLang') || languages[0]);
  let initial_sections = [
    { id: "about", button: "tab.about", className: styles.isActive, expandedTop: styles.isInitial },
    { id: "experience", button: "tab.experiance", expandedTop: styles.isActive },
    { id: "contact", button: "tab.contact", expandedTop: styles.isPassive }];
  const [sections, setSection] = useState(initial_sections);
  const [selected, setSelected] = useState(0);
  const [headerState, setHeaderState] = useState(initial_sections[0].expandedTop);
  const [theme, setTheme] = useState();
  const [experience, setExperience] = useState(JSON.parse(localStorage.getItem('experience'), "null"));
  const [about, setAbout] = useState(JSON.parse(localStorage.getItem('about'), "null"));
  const [showModal, setShowModal] = useState({ privacyModal: false, settingsModal: false });
  const [icons, setIcons] = useState(JSON.parse(localStorage.getItem('icons'), "null"));
  const [contact, setContacts] = useState(JSON.parse(localStorage.getItem('contact'), "null"));

  const changeTheme = (theme) => {
    if (!theme) {
      theme = localStorage.getItem('theme');
    } if (theme === 'auto' || theme === null) {
      theme = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light';
    }
    // eslint-disable-next-line default-case
    switch (theme) {
      case "dark":
        setTheme(styles.darkTheme);
        document.querySelector("meta[name='theme-color']").content = "#000";
        break;
      default:
        setTheme(undefined);
        document.querySelector("meta[name='theme-color']").content = "#fff";
        break;
    }
    document.title = t(about?.title, language) || 'Portfolio';
    document.querySelector('meta[name="description"]').content = t(about?.about, language) || 'Read about me!';
  }
  const navigate = useNavigate();

  function navigateBlogs() {
    navigate("/blogs");
  }
  useEffect(() => {
    changeTheme();
    globalInitialiserCallbacks.PortfolioCallBack = (data) => {
      if (data.icons) {
        setIcons(data.icons);
      } else if (data.about) {
        setAbout(data.about);
      } else if (data.experience) {
        setExperience(data.experience);
      } else if (data.contact) {
        setContacts(data.contact);
      }
    }
  });
  const openPrivacyModal = () => {
    setShowModal({ privacyModal: true, settingsModal: false });
  };
  const dataCallback = (close, msg) => {
    setShowModal({ ...showModal, privacyModal: !close });
    if (msg) {
      setToastMsg(msg);
      setTimeout(() => { setToastMsg(null) }, 8000);
    }
  };
  const dataCallbackSettings = (close, msg, data) => {
    setShowModal({ ...showModal, settingsModal: !close });
    switch (msg) {
      case "unMaskData":
        setShowModal({ privacyModal: true, settingsModal: !close });
        break;
      case "lang":
        setLang(data);
        break;
      case "theme":
        changeTheme(data);
        break;
      default:
    }
  };
  const openSettings = () => {
    setShowModal({ privacyModal: false, settingsModal: true });
  }
  const downloadResume = () => {
    if (about?.pdf.link) {
      const link = document.createElement('a');
      link.href = about?.pdf.link;
      link.setAttribute('download', 'Prasanna\'s resume for ' + localStorage.getItem('name') + '.pdf');
      document.body.appendChild(link);
      link.click();
    } else {
      setToastMsg(t(language, 'privacy.not_allowed'));
      openPrivacyModal();
      setTimeout(() => { setToastMsg(null) }, 8000);
    }
  }
  const buttonClick = (index) => {
    setSection(initial_sections.map((sec, i) =>
      i === index
        ? { ...sec, className: styles.isActive }
        : { ...sec, className: undefined }
    ));
    setSelected(index);
    setHeaderState(initial_sections[index].expandedTop);
  }
  return (
    <div className={theme}>
      <div className={styles.body}>
        <div className={styles.card + ' ' + headerState} data-state={'#' + sections[selected].id}>
          <div className={styles.cardHeader}>
            <div className={styles.cardCover} style={{ backgroundImage: "url('" + about?.link + "')" }}></div>
            <img className={styles.cardAvatar} src={about?.link} alt="avatar" />
            <h1 className={styles.cardFullname}>{t(about?.title, language) || t(language, "text.title_placeholder")}</h1>
            <h2 className={styles.cardJobtitle}>{t(about?.subtitle, language) || t(language, "text.subtitle_placeholder")}</h2>
            <div className={styles.nightToggle}>
              <div className={styles.themeIcon} onClick={openSettings}>
                <svg className={showModal.settingsModal ? styles.isActive : styles.isPassive} height="30px" width="30px" fill="#d4d3b7" viewBox="0 96 960 960" xmlns="http://www.w3.org/2000/svg">
                  <path d="m388 976-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185 576q0-9 .5-20.5T188 535L80 456l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669 346l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592 850l-20 126H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410 576q0-29 20.5-49.5T480 506q29 0 49.5 20.5T550 576q0 29-20.5 49.5T480 646Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715 576q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538 348l-14-112h-88l-14 112q-34 7-63.5 24T306 414l-106-46-40 72 94 69q-4 17-6.5 33.5T245 576q0 17 2.5 33.5T254 643l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z" /></svg>
              </div>
            </div>

          </div>
          <div className={styles.cardSocial}>
            {icons &&
              icons.map((item, i) =>
                <SocialIcons key={i} viewBox={item.viewBox} paths={item.paths} link={item.link}></SocialIcons>
              )}
          </div>
          <div>
            <div className={styles.cardSection + ' ' + sections[2].className} id={sections[2].id}>
              <div className={styles.cardContent}>
                <div className={modalCss.flex}>
                  <div className={styles.cardContactWrapper}>
                    {contact &&
                      Object.values(contact).map((item, i) =>
                        <div className={styles.cardContact} key={i}>
                          <SocialIcons key={i} viewBox={item.icon.viewBox} paths={item.icon.paths} link={item.link}></SocialIcons>
                          <a href={item.link} target="_blank" rel="noreferrer">{t(item.text, language)}</a>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className={styles.cardContactWrapper}>
                  <button onClick={downloadResume} className={styles.submit}>{t(language, "text.download_resume")}</button>
                </div>

              </div>
            </div>
          </div>
          <div className={styles.cardButtons}>
            {sections.map((sec, i) =>
              <button
                key={i}
                onClick={() => buttonClick(i)}
                className={sec.className}>
                {t(language, sec.button)}
              </button>
            )}
          </div>
          <div className={styles.cardMain}>
            <div className={styles.cardSection + ' ' + sections[0].className} id={sections[0].id}>
              <div className={styles.cardContent}>
                <div className={styles.cardSubtitle}><p>{t(language, "about.title")}</p></div>
                {about &&
                  <p className={styles.cardDesc}>{t(about.about, language)}
                  </p>}

                {!about && loadingSvg}
                <div className={modalCss.flex}>
                  <button onClick={navigateBlogs} className={styles.submit}>{t(language, "text.blogs")}</button>
                </div>
              </div>
            </div>
            <div className={[styles.cardSection, sections[1].className].join(' ')} id={sections[1].id}>
              <div className={styles.cardContent}>
                {
                  experience && experience.map((exp, i) => <TimelineItem language={language} data={exp} key={i}/>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <SettingsModal changeTheme={changeTheme} show={showModal.settingsModal} dataCallback={dataCallbackSettings} darkTheme={theme} />
      <PrivacyModal show={showModal.privacyModal} dataCallback={dataCallback} darkTheme={theme} />
      <div id="snackbar" className={toastmsg ? 'show' : ''}>{toastmsg}</div>
    </div>
  );
}

Portfolio.propTypes = {};

Portfolio.defaultProps = {};

export default Portfolio;
