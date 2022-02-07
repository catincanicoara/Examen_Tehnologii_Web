import { useState, useEffect } from 'react';
import { get, put, post } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import { routePostFavouriteList, routeGetFavouriteListById, routePutFavouriteList } from '../ApiRoutes';

import SaveIcon from '@material-ui/icons/Save'
import { Grid, TextField, Button } from '@material-ui/core';

export default function FormularFavouriteList() {

    const navigate = useNavigate();

    const [favouriteList, setFavouriteList] = useState({
        FavouriteListId: 0,
        FavouriteListTitlu: "",
        FavouriteListDescriere: "",
        FavouriteListData: ""
    })

    const onChangeFavouriteList = e => {
        setFavouriteList({ ...favouriteList, [e.target.name]: e.target.value });
    }

    const saveFavouriteList = async () => {
        if (!JSON.parse(sessionStorage.getItem("putScreen")))
            await post(routePostFavouriteList, favouriteList);
        else
            await put(routePutFavouriteList, favouriteList, favouriteList.FavouriteListId);

        navigate('/');
    }

    useEffect(async () => {
        if (JSON.parse(sessionStorage.getItem('putScreen'))) {
            let data = await get(routeGetFavouriteListById, JSON.parse(sessionStorage.getItem("idFavouriteList")));
            setFavouriteList(data);
        }
    }, [])

    return (
        <div>
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
                        margin="dense"
                        id="FavouriteListId"
                        name="FavouriteListId"
                        label="Id-ul FavouriteListului"
                        fullWidth
                        disabled={true}
                        value={favouriteList.FavouriteListId}
                        onChange={e => onChangeFavouriteList(e)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                    autoComplete='off'
                    variant="outlined"
                        id="FavouriteListTitlu"
                        name="FavouriteListTitlu"
                        label="Titlul FavouriteList"
                        fullWidth
                        value={favouriteList.FavouriteListTitlu}
                        onChange={e => onChangeFavouriteList(e)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        autoComplete='off'
                        variant="outlined"
                        id="FavouriteListDescriere"
                        name="FavouriteListDescriere"
                        label="Descrierea FavouriteList"
                        fullWidth
                        multiline
                        minRows={8}
                        value={favouriteList.FavouriteListDescriere}
                        onChange={e => onChangeFavouriteList(e)} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        autoComplete='off'
                        variant="outlined"
                        id="FavouriteListData"
                        name="FavouriteListData"
                        label="Data FavouriteList"
                        fullWidth
                        value={favouriteList.FavouriteListData}
                        onChange={e => onChangeFavouriteList(e)} />
                </Grid>
            </Grid>

            <br />

            <Button style={{backgroundColor: "#1b8d22", color:"white", borderRadius: "50px"}} variant='contained' startIcon={<SaveIcon />} onClick={() => saveFavouriteList()}>
                Save
            </Button>
        </div>
    )
}