import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Video = db.define("Video", {
    VideoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    VideoTitlu: {
        type: Sequelize.STRING,
        allowNull: false
    },
    VideoDescriere: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [5, 500],
                msg: "Descrierea trebuie sa se incadreze intre 5 si 500 de caractere!"
            }
        },
        allowNull: false
    },
    VideoURL: {
        type: Sequelize.STRING,
        validate: {
            isUrl: {
                msg: "Introduceti un link valid!"
            }
        },
        allowNull: true
    },
    FavouriteListId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Video;