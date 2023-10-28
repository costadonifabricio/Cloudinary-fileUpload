import { DataTypes } from "sequelize";
import { sequelize } from '../database/db.js';

export const ImgModel = sequelize.define("image",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
)

ImgModel.sync({ force: false }).then(() => {
    console.log("Tabla ImgModel creada");
});

export default ImgModel ;
