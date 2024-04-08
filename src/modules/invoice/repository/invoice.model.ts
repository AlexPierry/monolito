import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import AddressModel from "./address.model";
import InvoiceItemModel from "./invoice.item.model";

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

    @ForeignKey(() => AddressModel)
    @Column({ allowNull: false })
    declare address_id: string;

    @BelongsTo(() => AddressModel)
    declare address: AddressModel;

    @HasMany(() => InvoiceItemModel)
    declare items: InvoiceItemModel[];

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;
}