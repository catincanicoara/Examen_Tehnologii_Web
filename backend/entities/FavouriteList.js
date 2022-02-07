import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const FavouriteList = db.define("FavouriteList", {
    FavouriteListId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    FavouriteListTitlu: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [5, 100],
                msg: "Titlul atribuit FavouriteList trebuie sa aiba intre 5 si 100 caractere!"
            }
        },
        allowNull: false
    },
    FavouriteListDescriere: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [5, 500],
                msg: "Descrierea completata trebuie sa se incadreze intre 5 si 500 de caractere."
            }
        },
        allowNull: false
    },
    FavouriteListData: {
        type: Sequelize.DATEONLY,
        validate: {
            isDate: {
                msg: "Data atribuita FavouriteList nu respecta formatul YYYY-MM-DD!"
            }
        },
        allowNull: false
    }
})

export default FavouriteList;