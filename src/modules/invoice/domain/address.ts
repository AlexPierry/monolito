import BaseEntity from "../../@shared/domain/entity/base.entity";

export default class Address extends BaseEntity {
    private _street: string;
    private _number: number;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(street: string, number: number, complement: string, city: string, state: string, zipcode: string) {
        super();
        this._street = street;
        this._number = number;
        this._complement = complement;
        this._city = city;
        this._state = state;
        this._zipCode = zipcode;
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }
}