const link = "http://localhost:8000/api";

const routeGetFavouriteListsFull = link + '/getFavouriteListsFull';
const routeGetFavouriteLists = link + '/getFavouriteLists';
const routeGetFavouriteListById = link + '/getFavouriteListById'; 
const routeGetVideos = link + '/getVideos';
const routeGetVideosByFavouriteList = link + '/getVideosByFavouriteList'; 
const routeGetVideoByFavouriteList = link + '/getVideoByFavouriteList'; 
const routeGetFavouriteListsFilter = link + '/getFavouriteListsFilter'; 
const routeGetFavouriteListsSortate = link + '/getFavouriteListsSortateDupaData';

const routePostFavouriteList = link + '/addFavouriteList';
const routePostVideo = link + '/addVideo'; 

const routeDeleteFavouriteList = link + '/deleteFavouriteList';  
const routeDeleteVideo = link + '/deleteVideo'; 

const routePutFavouriteList = link + '/updateFavouriteList'; 
const routePutVideo = link + '/updateVideo'; 


export {
    routeGetFavouriteListsFull, routeGetFavouriteLists, routeGetFavouriteListById, routeGetVideos, routeGetVideosByFavouriteList,
    routeGetVideoByFavouriteList, routeGetFavouriteListsFilter, routeGetFavouriteListsSortate,
    routePostFavouriteList, routePostVideo,
    routeDeleteFavouriteList, routeDeleteVideo,
    routePutFavouriteList, routePutVideo
}