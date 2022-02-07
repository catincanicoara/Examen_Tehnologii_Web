import { useState, useEffect } from "react";
import { get, getQuery, remove } from "../Calls.js";
import { useNavigate } from "react-router-dom";
import {
  routeGetFavouriteLists,
  routeGetFavouriteListsFilter,
  routeGetFavouriteListsSortate,
  routeDeleteFavouriteList,
} from "../ApiRoutes";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  IconButton,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export default function TabelFavouriteLists() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [needToUpdate, setNeedToUpdate] = useState(false);
  const [filtrare, setFiltrare] = useState({
    FavouriteListTitlu: "",
    FavouriteListDescriere: "",
  });

  useEffect(async () => {
    let data = await get(routeGetFavouriteLists);
    setRows(data);
  }, [needToUpdate]);
  useEffect(async () => {
    sessionStorage.clear();
  }, []);

  const onChangeFiltrare = (e) => {
    setFiltrare({ ...filtrare, [e.target.name]: e.target.value });
  };
  const filtrareFavouriteLists = async () => {
    let data = await getQuery(
      routeGetFavouriteListsFilter,
      filtrare.FavouriteListTitlu,
      filtrare.FavouriteListDescriere
    );
    setRows(data);
  };
  const goToFormularModificareFavouriteList = (id) => {
    sessionStorage.setItem("putScreen", true);
    sessionStorage.setItem("idFavouriteList", id);
    navigate("/formularFavouriteList");
  };
  const goToFormularAdaugareFavouriteList = () => {
    sessionStorage.setItem("putScreen", "false");
    navigate("/formularFavouriteList");
  };
  
  const deleteFavouriteList = async (id, index) => {
    await remove(routeDeleteFavouriteList, id);

    rows.splice(index, 1);
    setRows(rows);
    setNeedToUpdate(!needToUpdate);
  };
  const sortare = async () => {
    let data = await get(routeGetFavouriteListsSortate);
    setRows(data);
  };

  const goToFormularAdaugareVideo = (idFavouriteList) => {
    sessionStorage.setItem("putScreen", "false");
    sessionStorage.setItem("idFavouriteList", idFavouriteList);
    navigate("/formularVideo");
  };

  const goToTabelVideos = (idFavouriteList) => {
    sessionStorage.setItem("idFavouriteList", idFavouriteList);
    navigate("/Videos");
  };

  return (
    <div>
      <Grid
      style={{marginTop: "10vh"}}
        container
        spacing={2}
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid
          container
          item
          spacing={1}
          xs={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            margin="dense"
            id="FavouriteListTitlu"
            name="FavouriteListTitlu"
            label="Filtrare dupa titlu"
            variant="filled"
            fullWidth
            value={filtrare.FavouriteListTitlu}
            onChange={(e) => onChangeFiltrare(e)}
          />
          <TextField
            margin="dense"
            id="FavouriteListDescriere"
            name="FavouriteListDescriere"
            label="Filtrare dupa descriere"
            variant="filled"
            fullWidth
            value={filtrare.FavouriteListDescriere}
            onChange={(e) => onChangeFiltrare(e)}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => filtrareFavouriteLists()}
          >
            Filtrare
          </Button>
        </Grid>

        

        <Grid item xs={4}>
          <Button color="primary" variant="contained" onClick={() => sortare()}>
            Sorteaza dupa data
          </Button>
        </Grid>


        <Grid  item xs={4}>
          <Button
            style={{backgroundColor: "#1b8d22", color:"white", borderRadius: "50px"}}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => goToFormularAdaugareFavouriteList()}
          >
            Adauga FavouriteList
          </Button>
        </Grid>
      </Grid>

      <br />

      <TableContainer style={{
          marginTop: "8vh",
          marginBottom: "20vh",
          marginRight: "8vw",
          marginLeft: "8vw",
          maxWidth: "80vw",
        }} component={Paper}>
        <Table style={{borderBottom: "5px solid #1a2c38"}} aria-label="simple table">
          <TableHead >
            <TableRow style={{backgroundColor: "#1a2c38"}}>
              <TableCell  style={{
                  color: "white",
                  fontSize: 19,
                }}>ID FavouriteList</TableCell>
              <TableCell   style={{
                  color: "white",
                  fontSize: 19
                  
                }} align="left">Titlu FavouriteList</TableCell>
              <TableCell   style={{
                  color: "white",
                  fontSize: 19,
                }} align="left">Descriere FavouriteList</TableCell>
              <TableCell   style={{
                  color: "white",
                  fontSize: 19,
                }} align="left">Data FavouriteList</TableCell>
              <TableCell   style={{
                  color: "white",
                  fontSize: 19,
                }} align="left">Videos</TableCell>
              <TableCell   style={{
                  color: "white",
                  fontSize: 19,
                }} align="left">Actiuni FavouriteList</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow style={{backgroundColor: "#DEDEDE"}} key={row.FavouriteListId}>
                <TableCell component="th" scope="row">
                  {row.FavouriteListId}
                </TableCell>
                <TableCell style={{textDecoration: "underline"}} align="center">{row.FavouriteListTitlu}</TableCell>
                <TableCell align="center">{row.FavouriteListDescriere}</TableCell>
                <TableCell align="center">{row.FavouriteListData}</TableCell>
                <TableCell align="center">
                  <Button
                  style={{backgroundColor: "#1b8d22", color:"white",  borderRadius: "50px"}}
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => goToFormularAdaugareVideo(row.FavouriteListId)}
                  >
                    Adauga Video
                  </Button>
                  <br /> <br />
                  <Button
                  style={{backgroundColor: "#d6421f", color:"white", borderRadius: "50px"}}
                    color="primary"
                    variant="contained"
                    onClick={() => goToTabelVideos(row.FavouriteListId)}
                  >
                    Vezi Videos
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => deleteFavouriteList(row.FavouriteListId, index)}
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                  <IconButton
                    onClick={() => goToFormularModificareFavouriteList(row.FavouriteListId)}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
