import { analytics, getData } from "./api-util";
import { languages } from "./db";

export const globalInitialiserCallbacks = {}

if (!localStorage.getItem('uuid')) {
    localStorage.setItem('uuid', Math.random());
}
if (!localStorage.getItem('selectedLang')) {
    localStorage.setItem('selectedLang', languages[0]);
}
analytics({
    uuid: localStorage.getItem('uuid'),
});
if (!localStorage.getItem('langs')) {
    localStorage.setItem('langs', JSON.stringify(languages)); //Presettings option
}
getData('lang', (resp, err) => {
    if (!err) {
        localStorage.setItem('langs', JSON.stringify(resp.response));
        makeCallbacks({ 'langs': resp.response });
    }
})
getData('about', (resp, err) => {
    if (!err) {
        localStorage.setItem('about', JSON.stringify(resp.response));
        makeCallbacks({ 'about': resp.response });
    }
})
getData('social_icons', (resp, err) => {
    if (!err) {
        localStorage.setItem('icons', JSON.stringify(resp.response));
        makeCallbacks({ 'icons': resp.response });
    }
})
getData('experience', (resp, err) => {
    if (!err) {
        localStorage.setItem('experience', JSON.stringify(resp.response));
        makeCallbacks({ 'experience': resp.response });
    }
})
getData('contact', (resp, err) => {
    if (!err) {
        localStorage.setItem('contact', JSON.stringify(resp.response));
        makeCallbacks({ 'contact': resp.response });
    }
})
getData('blogs', (resp, err) => {
    if (!err) {
        localStorage.setItem('blogs', JSON.stringify(resp.response.blogs));
        localStorage.setItem('tags', JSON.stringify(resp.response.tags));
        makeCallbacks({ 'blogs': resp.response.blogs });
        makeCallbacks({ 'tags': resp.response.tags });
    }
})
function makeCallbacks(data) {
    for (let callbacks in globalInitialiserCallbacks) {
        globalInitialiserCallbacks[callbacks](data);
    }
}