import { useState, useEffect } from 'react';
import { get, remove } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import { routeGetVideosByFavouriteList, routeDeleteVideo } from '../ApiRoutes';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from "@material-ui/core";

export default function TabelFavouriteLists() {

    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [needToUpdate, setNeedToUpdate] = useState(false)

    useEffect(async () => {
        let data = await get(routeGetVideosByFavouriteList, JSON.parse(sessionStorage.getItem("idFavouriteList")));
        setRows(data);
    }, [needToUpdate]);
    useEffect(async () => {
        sessionStorage.setItem("putScreen", "");
        sessionStorage.setItem("idVideo", "");
    }, [])

    const goToFormularModificareVideo = (idRef) => {
        sessionStorage.setItem("putScreen", true);
        sessionStorage.setItem("idVideo", idRef);
        navigate('/formularVideo');
    }

    const deleteVideo = async (idRef, index) => {
        await remove(routeDeleteVideo, JSON.parse(sessionStorage.getItem("idFavouriteList")), idRef);

        rows.splice(index, 1);
        setRows(rows);
        setNeedToUpdate(!needToUpdate);
    }

    const goToFormularAdaugareVideo = () => {
        sessionStorage.setItem("putScreen", "false");
        navigate('/formularVideo');
    }

    return (
        <div>
            <TableContainer style={{
          marginTop: "8vh",
          marginBottom: "5vh",
          marginRight: "8vw",
          marginLeft: "8vw",
          maxWidth: "80vw",
        }} component={Paper}>
                <Table style={{borderBottom: "5px solid #1a2c38"}} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor: "#1a2c38"}}>
                            <TableCell style={{
                  color: "white",
                  fontSize: 15,
                }}>ID Video</TableCell>
                            <TableCell style={{
                  color: "white",
                  fontSize: 15,
                }} align="center">Titlu Video</TableCell>
                            <TableCell style={{
                  color: "white",
                  fontSize: 15,
                }} align="center">Descriere Video</TableCell>
                            <TableCell style={{
                  color: "white",
                  fontSize: 15,
                }} align="center">URL Video</TableCell>
                            <TableCell style={{
                  color: "white",
                  fontSize: 15,
                }} align="center">Id FavouriteList de care apartine</TableCell>
                            <TableCell style={{
                  color: "white",
                  fontSize: 15,
                }} align="center">Actiuni Video</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow style={{backgroundColor: "#DEDEDE"}} key={row.VideoId}>
                                <TableCell component="th" scope="row">
                                    {row.VideoId}
                                </TableCell>
                                <TableCell align="center">{row.VideoTitlu}</TableCell>
                                <TableCell align="center">{row.VideoDescriere}</TableCell>
                                <TableCell align="center">{row.VideoURL}</TableCell>
                                <TableCell align="center">{row.FavouriteListId}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => goToFormularModificareVideo(row.VideoId)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteVideo(row.VideoId, index)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <Button style={{backgroundColor: "#1b8d22", color:"white", borderRadius: "50px"}} color="primary" variant='contained' startIcon={<AddIcon />} onClick={() => goToFormularAdaugareVideo()}>
                Adauga Video
            </Button>
            <br />
            <br />
            <Button style={{backgroundColor: "#d6421f", color:"white", borderRadius: "50px"}} color="primary" variant='contained' onClick={() => navigate('/')}>
                Inapoi la FavouriteLists
            </Button>
        </div >
    )
}