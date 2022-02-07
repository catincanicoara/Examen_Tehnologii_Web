import axios from 'axios'
import {
    routeGetFavouriteListsFull, routeGetFavouriteLists, routeGetFavouriteListById, routeGetVideos, routeGetVideosByFavouriteList,
    routeGetVideoByFavouriteList, routeGetFavouriteListsSortate,
    routePostFavouriteList, routePostVideo,
    routeDeleteFavouriteList, routeDeleteVideo,
    routePutFavouriteList, routePutVideo
} from './ApiRoutes.js'

async function get(p_url, searchAfter1 = null, searchAfter2 = null) {
    try {
        let newUrl;
        if (searchAfter1) {
            newUrl = p_url + "/" + searchAfter1;
            if (searchAfter2) {
                newUrl = newUrl + "/" + searchAfter2;
            }
        } else {
            newUrl = p_url;
        }

        return (await axios.get(newUrl)).data;

    } catch (err) {
        if (p_url === routeGetFavouriteListsFull)
            alert('FavouriteLists full nu au putut fi preluate corespunzator.');
        if (p_url === routeGetFavouriteLists)
            alert('FavouriteLists nu au putut fi preluaet corespunzator.');
        if (p_url === routeGetVideos)
            alert('Videos nu au putut fi preluate corespunzator.');
        if (p_url === routeGetFavouriteListsSortate)
            alert('FavouriteLists sortate nu au putut fi preluate corespunzator.');
        if (p_url === routeGetFavouriteListById)
            alert('FavouriteList-ul cu acest id nu a putut fi preluat corespunzator.');
        if (p_url === routeGetVideosByFavouriteList)
            alert('Videos din acest FavouriteList nu au putut fi preluare corespunzator .');
        if (p_url === routeGetVideoByFavouriteList)
            alert('Acest video nu a putut fi preluat corespunzator din acest FavouriteList.');
    }
}

async function getQuery(p_url, p_titlu, p_descriere) {
    try {
        const params = new URLSearchParams({ titlu: p_titlu, descriere: p_descriere });
        let urlFilter = p_url + "?";
        return (await axios.get(`${urlFilter}${params}`)).data;
    } catch (err) {
        alert("Nu s-au putut prelua FavouriteListsle filtrate dupa titlu si/sau descriere.");
    }
}

async function post(p_url, item, id = null) {
    try {
        let newUrl = id ? p_url + "/" + id : p_url;
        return (await axios.post(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (err) {
        if (p_url === routePostFavouriteList) {
            alert('Eroare! Nu s-a introdus FavouriteList!');
        }
        if (p_url === routePostVideo) {
            alert('Eroare! Nu s-a introdus Video!');
        }
    }
}

async function put(p_url, item, searchAfter1, searchAfter2 = null) {
    try {
        let newUrl;
        newUrl = p_url + "/" + searchAfter1;
        if (searchAfter2) {
            newUrl = newUrl + "/" + searchAfter2;
        }

        return (await axios.put(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (err) {
        if (p_url === routePutFavouriteList) {
            alert('Eroare! Nu s-a modificat FavouriteList!');
        }
        if (p_url === routePutVideo) {
            alert('Eroare! Nu s-a modificat Video!');
        }
    }
}

async function remove(p_url, searchAfter1, searchAfter2 = null) {
    try {
        let newUrl;
        newUrl = p_url + "/" + searchAfter1;
        if (searchAfter2) {
            newUrl = newUrl + "/" + searchAfter2;
        }

        return (await axios.delete(newUrl)).data;
    } catch (err) {
        if (p_url === routeDeleteFavouriteList) {
            alert('Eroare! Nu s-a sters FavouriteList!');
        }
        if (p_url === routeDeleteVideo) {
            alert('Eroare! Nu s-a sters Video!');
        }
    }
}

export { get, getQuery, post, put, remove }