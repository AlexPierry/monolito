import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable("orders", {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false,
        },
        client: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        products: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable('clients')
} 
