import { isIOS } from '@nativescript/core';
import { ApplicationSettings, Http } from '@nativescript/core';
import { requests } from '~/stores/spinner';

const BASE_URL =
    isIOS ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const headers = () => ({
    'Content-Type': 'application/json',
    'Authorization': ApplicationSettings.getString('token')
});
const http = {
    get: async url => {
        requests.update(n => n+1);
        return await Http.request({
            url: BASE_URL + url,
            method: 'GET',
            headers: headers()
        })
        .then(response => response.content.toJSON())
        .catch(err => {
            console.log(err);
            return { err };
        })
        .finally(() => requests.update(n => n-1));
    },
    post: async (url, body) => {
        requests.update(n => n+1);
        return await Http.request({
            url: BASE_URL + url,
            method: 'POST',
            headers: headers(),
            content: JSON.stringify(body)
        })
        .then(response => response.content.toJSON())
        .catch(err => {
            console.log(err);
            return { err };
        })
        .finally(() => requests.update(n => n-1));
    },
    getString: async (url) => {
        return await Http.getString(url)
        .catch(err => {
            console.log(err);
            return { err };
        })
        .finally(() => requests.update(n => n-1));
    }
};

export default http;