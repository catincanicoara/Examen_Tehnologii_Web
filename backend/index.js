import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import mysql from "mysql2/promise";
import { DB_USERNAME, DB_PASSWORD } from "./Const.js";
import db from "./dbConfig.js";
import FavouriteList from "./entities/FavouriteList.js";
import Video from "./entities/Video.js";
import LikeOperator from "./Operators.js";

import fs from "fs";
("use strict");

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

//Conexiune baza de date
let conn;

mysql
  .createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD,
  })
  .then((connection) => {
    conn = connection;
    return connection.query("CREATE DATABASE IF NOT EXISTS Examen");
  })
  .then(() => {
    return conn.end();
  })
  .catch((err) => {
    console.log(err);
  });

//legatura one to many intre cele doua entitati
FavouriteList.hasMany(Video, { as: "Videos", foreignKey: "FavouriteListId" });
Video.belongsTo(FavouriteList, { foreignKey: "FavouriteListId" });



//POST

//Adaugare FavouriteList
async function createFavouriteList(favouriteList) {
  return await FavouriteList.create(favouriteList);
}
router.route("/addFavouriteList").post(async (req, res) => {
  try {
    return res.status(201).json(await createFavouriteList(req.body));
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({
        error_message: "Eroare! Nu s-a inserat FavouriteList!",
      });
  }
});

//Adaugare video pentru un anumit FavouriteList
async function createVideo(video, idFavouriteList) {
  if (!(await getFavouriteListById(idFavouriteList))) {
    console.log("Nu exista FavouriteList-ul pe care l-ati cautat");
    return;
  }
  video.FavouriteListId = idFavouriteList;
  return await Video.create(video);
}
router.route("/addVideo/:idFavouriteList").post(async (req, res) => {
  try {
    return res
      .status(201)
      .json(await createVideo(req.body, req.params.idFavouriteList));
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({
        error_message: "Eroare! Nu s-a inserat Video!",
      });
  }
});

//PUT

//Update FavouriteList
async function updateFavouriteList(updatedFavouriteList, idFavouriteList) {
  if (parseInt(idFavouriteList) !== updatedFavouriteList.FavouriteListId) {
    console.log("ID diferit intre ruta si body");
    return;
  }
  let favouriteList = await getFavouriteListById(idFavouriteList);
  if (!favouriteList) {
    console.log("Nu s-a gasit FavouriteList-ul cu id-ul cautat");
    return;
  }

  return await favouriteList.update(updatedFavouriteList);
}
router.route("/updateFavouriteList/:idFavouriteList").put(async (req, res) => {
  try {
    return res.json(await updateFavouriteList(req.body, req.params.idFavouriteList));
  } catch (err) {
    console.log(err.message);
  }
});

//Update Video al unui FavouriteList
async function updateVideo(updatedVideo, idFavouriteList, idVideo) {
  if (parseInt(idVideo) !== updatedVideo.VideoId) {
    console.log("ID video diferit intre ruta si body");
    return;
  }

  let favouriteList = await getFavouriteListById(idFavouriteList);
  if (!favouriteList) {
    console.log("Nu s-a gasit FavouriteList-ul cu id-ul cautat");
    return;
  }

  let video = await getVideoByFavouriteList(idFavouriteList, idVideo);
  if (!video) {
    console.log("Nu s-a gasit un video cu id-ul cautat pentru acest FavouriteList");
    return;
  }

  return await video.update(updatedVideo);
}
router
  .route("/updateVideo/:idFavouriteList/:idVideo")
  .put(async (req, res) => {
    try {
      return res.json(
        await updateVideo(
          req.body,
          req.params.idFavouriteList,
          req.params.idVideo
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  });

//GET

//Afisare FavouriteLists impreuna cu Videos aferente
async function getFavouriteListsFull() {
  return await FavouriteList.findAll({ include: ["Videos"] });
}
router.route("/getFavouriteListsFull").get(async (req, res) => {
  try {
    return res.json(await getFavouriteListsFull());
  } catch (err) {
    console.log(err.message);
  }
});

//Afisare doar favouriteLists, fara Videos pe care le au
async function getFavouriteLists() {
  return await FavouriteList.findAll();
}
router.route("/getFavouriteLists").get(async (req, res) => {
  try {
    return res.json(await getFavouriteLists());
  } catch (err) {
    console.log(err.message);
  }
});

//Afisare FavouriteList cu un anumit id
async function getFavouriteListById(id) {
  return await FavouriteList.findOne({
    where: id ? { FavouriteListId: id } : undefined,
  });
}
router.route("/getFavouriteListById/:id").get(async (req, res) => {
  try {
    return res.json(await getFavouriteListById(req.params.id));
  } catch (err) {
    console.log(err.message);
  }
});

//Afisare toate Videos
async function getVideos() {
  return await Video.findAll();
}
router.route("/getVideos").get(async (req, res) => {
  try {
    return res.json(await getVideos());
  } catch (err) {
    console.log(err.message);
  }
});

//Afisare Videos ale unui anumit FavouriteList
async function getVideosByFavouriteList(idFavouriteList) {
  if (!(await getFavouriteListById(idFavouriteList))) {
    console.log("Nu exista FavouriteLis-ul!");
    return;
  }
  return await Video.findAll({
    include: [
      {
        model: FavouriteList,
        attributes: ["FavouriteListTitlu"],
        where: idFavouriteList ? { FavouriteListId: idFavouriteList } : undefined,
      },
    ],
  });
}
router.route("/getVideosByFavouriteList/:idFavouriteList").get(async (req, res) => {
  try {
    return res.json(await getVideosByFavouriteList(req.params.idFavouriteList));
  } catch (err) {
    console.log(err.message);
  }
});

//Afisarea unui anumit video dintr-un FavouriteList
async function getVideoByFavouriteList(idFavouriteList, idVideo) {
  if (!(await getFavouriteListById(idFavouriteList))) {
    console.log("Nu exista FavouriteList-ul!");
    return;
  }
  return await Video.findOne({
    include: [
      {
        model: FavouriteList,
        attributes: ["FavouriteListTitlu"],
        where: idFavouriteList ? { FavouriteListId: idFavouriteList } : undefined,
      },
    ],
    where: idVideo ? { VideoId: idVideo } : undefined,
  });
}
router
  .route("/getVideoByFavouriteList/:idFavouriteList/:idVideo")
  .get(async (req, res) => {
    try {
      return res.json(
        await getVideoByFavouriteList(
          req.params.idFavouriteList,
          req.params.idVideo
        )
      );
    } catch (err) {
      console.log(err.message);
    }
  });

//Afisare toate FavouriteLists cu filtrare dupa titlu si descriere 
async function getFavouriteListsFilter(filterQuery) {
  let whereClause = {};

  if (filterQuery.titlu)
    whereClause.FavouriteListTitlu = { [LikeOperator]: `%${filterQuery.titlu}%` };
  if (filterQuery.descriere)
    whereClause.FavouriteListDescriere = {
      [LikeOperator]: `%${filterQuery.descriere}%`,
    };

  return await FavouriteList.findAll({
    where: whereClause,
  });
}
router.route("/getFavouriteListsFilter").get(async (req, res) => {
  try {
    return res.json(await getFavouriteListsFilter(req.query));
  } catch (err) {
    console.log(err.message);
  }
});

//Afisare FavouriteLists sortate descrescator dupa data
async function getFavouriteListsSortateDupaData() {
  return await FavouriteList.findAll({
    order: [["FavouriteListData", "DESC"]],
  });
}
router.route("/getFavouriteListsSortateDupaData").get(async (req, res) => {
  try {
    return res.json(await getFavouriteListsSortateDupaData());
  } catch (err) {
    console.log(err.message);
  }
});

//DELETE

//Stergerea FavouriteList implica si stergerrea elementelor videos pe care le are
async function deleteFavouriteList(idFavouriteList) {
  let favouriteListToBeDeleted = await getFavouriteListById(idFavouriteList);

  if (!favouriteListToBeDeleted) {
    console.log("Nu s-a gasit FavouriteList-ul cu acest id");
    return;
  }

  return await favouriteListToBeDeleted.destroy();
}
router.route("/deleteFavouriteList/:idFavouriteList").delete(async (req, res) => {
  try {
    return res.json(await deleteFavouriteList(req.params.idFavouriteList));
  } catch (err) {
    console.log(err.message);
  }
});

//Stergerea unui video al unui anumit FavouriteList
async function deleteVideo(idFavouriteList, idVideo) {
  let favouriteList = await getFavouriteListById(idFavouriteList);
  if (!favouriteList) {
    console.log("Nu s-a gasit FavouriteList-ul cu acest id");
    return;
  }

  let videoToBeDeleted = await getVideoByFavouriteList(
    idFavouriteList,
    idVideo
  );

  if (!videoToBeDeleted) {
    console.log("Nu s-a gasit un video cu acest id la acest FavouriteList");
    return;
  }

  return await videoToBeDeleted.destroy();
}
router
  .route("/deleteVideo/:idFavouriteList/:idVideo")
  .delete(async (req, res) => {
    try {
      return res.json(
        await deleteVideo(req.params.idFavouriteList, req.params.idVideo)
      );
    } catch (err) {
      console.log(err.message);
    }
  });

let port = process.env.PORT || 8000;
app.listen(port, async () => {
  await db.sync({ alter: true });
  console.log("Baza de date functioneaza !");
});
console.log("PORT: " + port);
