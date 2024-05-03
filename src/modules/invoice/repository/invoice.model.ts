import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

interface ItemData {
    id: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

@Table({
    tableName: "invoices",
    timestamps: false,
})
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare document: string;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

    @Column({ allowNull: false, type: DataType.JSON })
    declare items: ItemData[];

    @Column({ allowNull: false })
    declare street: string;

    @Column({ allowNull: false })
    declare number: string;

    @Column({ allowNull: false })
    declare complement: string;

    @Column({ allowNull: false })
    declare city: string;

    @Column({ allowNull: false })
    declare state: string;

    @Column({ allowNull: false })
    declare zipcode: string;
}