import styles from '../components/portfolio/portfolio.module.scss';

const English = require('../lang/English.json');
const Bengali = require('../lang/Bengali.json');
const Hindi = require('../lang/Hindi.json');
const Tamil = require('../lang/Tamil.json');
const Telugu = require('../lang/Telugu.json');

const loadingSvg = <div className={styles.loading} title="Loading"><svg version="1.1" id="loading-dots" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" space="preserve"><path d="M60.952,195.048C27.343,195.048,0,222.391,0,256s27.343,60.952,60.952,60.952 s60.952-27.343,60.952-60.952S94.562,195.048,60.952,195.048z">
    <animate
        attributeName="fill"
        dur="3s"
        begin="0s"
        repeatCount="indefinite"
        values="#000000;#f3f3f3;#000000;" />
</path>
    <path d="M256,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952 s60.952-27.343,60.952-60.952S289.609,195.048,256,195.048z">      <animate
        attributeName="fill"
        dur="3s"
        begin="1s"
        repeatCount="indefinite"
        values="#000000;#f3f3f3;#000000;" />
    </path>
    <path d="M451.048,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952 S512,289.609,512,256S484.657,195.048,451.048,195.048z">
        <animate
            attributeName="fill"
            dur="3s"
            begin="2s"
            repeatCount="indefinite"
            values="#000000;#f3f3f3;#000000;" />
    </path>
</svg>
</div>
const socialIconsList = [
]
const languages = ["English", "Hindi"];
const themes = ["auto", "light", "dark"];
const t = (lang, msg) => {
    if (typeof lang === 'string') {
        let fallBack = English;
        switch (lang) {
            case 'English':
                return English[msg] || msg;
            case 'Bengali':
                return Bengali[msg] || fallBack[msg] || msg;
            case 'Hindi':
                return Hindi[msg] || fallBack[msg] || msg;
            case 'Tamil':
                return Tamil[msg] || fallBack[msg] || msg;
            case 'Telugu':
                return Telugu[msg] || fallBack[msg] || msg;
            default:
                return English[msg] || msg;
        }
    } else {
        let fallBack = languages[0];
        if (lang)
            return lang[msg] || lang[fallBack] || ' ';
        return null;
    }
}


let tags = [
    {
        text: { English: "Angular" },
        icon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg"
    },
    {
        text: { English: "React" },
        icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
    },
    {
        text: { English: "Java" },
        icon: "/tag-icons/java.svg"
    },
    {
        text: { English: "Android" },
        icon: "/tag-icons/android.svg"
    },
    {
        text: { English: "C++" },
        icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"
    },
    {
        text: { English: "NodeJS" },
        icon: "/tag-icons/nodeJS.png"
    },
    {
        text: { English: "Economics" },
        icon: "/tag-icons/economics.png"
    },
    {
        text: { English: "Adventure" },
        icon: "/tag-icons/economics.png"
    },
]

export { languages, socialIconsList, themes, t, loadingSvg, tags };
export default socialIconsList;