import { DataTypes } from "sequelize";
import { sequelize } from "sequelize";

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

export { ImgModel };
