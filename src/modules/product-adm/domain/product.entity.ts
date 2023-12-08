import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: Id;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Product extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _description: string;
    private _purchasePrice: number;
    private _stock: number;

    constructor(props: ProductProps) {
        super(props.id);
        this._name = props.name;
        this._description = props.description;
        this._purchasePrice = props.purchasePrice;
        this._stock = props.stock;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get purchasePrice(): number {
        return this._purchasePrice;
    }

    public get stock(): number {
        return this._stock;
    }

    public set name(name: string) {
        this._name = name;
    }

    public set description(description: string) {
        this._description = description;
    }

    public set purchasePrice(purchasePrice: number) {
        this._purchasePrice = purchasePrice;
    }

    public set stock(stock: number) {
        this._stock = stock;
    }
}