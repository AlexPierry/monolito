import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "adresses",
    timestamps: false,
})
export default class AddressModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare street: string;

    @Column({ allowNull: false })
    declare number: number;

    @Column({ allowNull: false })
    declare complement: string;

    @Column({ allowNull: false })
    declare city: string;

    @Column({ allowNull: false })
    declare state: string;

    @Column({ allowNull: false })
    declare zipcode: string;
}