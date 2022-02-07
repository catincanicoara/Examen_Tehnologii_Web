import { useState, useEffect } from 'react';
import { get, put, post } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import { routePostVideo, routePutVideo, routeGetVideoByFavouriteList } from '../ApiRoutes';

import SaveIcon from '@material-ui/icons/Save'
import { Grid, TextField, Button } from '@material-ui/core';

export default function FormularVideo() {

    const navigate = useNavigate();

    const [video, setVideo] = useState({
        VideoId: 0,
        VideoTitlu: "",
        VideoDescriere: "",
        VideoURL: "",
        FavouriteListId: JSON.parse(sessionStorage.getItem("idFavouriteList"))
    })

    const onChangeVideo = e => {
        setVideo({ ...video, [e.target.name]: e.target.value });
    }

    const saveVideo = async () => {
        if (!JSON.parse(sessionStorage.getItem("putScreen")))
            await post(routePostVideo, video, JSON.parse(sessionStorage.getItem("idFavouriteList")));  //cand sunt pe insert
        else
            await put(routePutVideo, video, video.FavouriteListId, video.VideoId);   //cand sunt pe update

        navigate('/videos');
    }

    useEffect(async () => {
        if (JSON.parse(sessionStorage.getItem('putScreen'))) {  //cand sunt pe formularul cu update
            let data = await get(routeGetVideoByFavouriteList, JSON.parse(sessionStorage.getItem("idFavouriteList")), JSON.parse(sessionStorage.getItem("idVideo")));
            setVideo(data);
        }
    }, [])

    return (
        <div >
            <Grid style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10vh",
        }} container
                spacing={3}
                direction="column"
                justifyContent="flex-start">

                <Grid item xs={2}>
                    <TextField
                    variant="outlined"
                        id="VideoId"
                        name="VideoId"
                        label="Id video"
                        fullWidth
                        disabled={true}
                        value={video.VideoId}
                        onChange={e => onChangeVideo(e)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    autoComplete='off'
                    variant="outlined"
                        id="VideoTitlu"
                        name="VideoTitlu"
                        label="Titlu video"
                        fullWidth
                        value={video.VideoTitlu}
                        onChange={e => onChangeVideo(e)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    autoComplete='off'
                    variant="outlined"
                        id="VideoDescriere"
                        name="VideoDescriere"
                        label="Descriere Video"
                        fullWidth
                        multiline
                        minRows={8}
                        value={video.VideoDescriere}
                        onChange={e => onChangeVideo(e)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    autoComplete='off'
                    variant="outlined"
                        id="VideoURL"
                        name="VideoURL"
                        label="Link Video"
                        fullWidth
                        value={video.VideoURL}
                        onChange={e => onChangeVideo(e)} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                    
                    variant="outlined"
                        id="FavouriteListId"
                        name="FavouriteListId"
                        label="Id-ul FavouriteListului de care apartine"
                        fullWidth
                        disabled={true}
                        value={video.FavouriteListId}
                        onChange={e => onChangeVideo(e)} />
                </Grid>
            </Grid>

            <br />

            <Button style={{backgroundColor: "#1b8d22", color:"white", borderRadius: "50px"}} variant='contained' startIcon={<SaveIcon />} onClick={() => saveVideo()}>
                Save
            </Button>
        </div>
    )
}