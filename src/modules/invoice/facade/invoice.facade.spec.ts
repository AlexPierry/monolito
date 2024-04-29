import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../repository/invoice.item.model";
import AddressModel from "../repository/address.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeFactory from "../factory/facade.factory";

describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([InvoiceModel, AddressModel, InvoiceItemModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate an invoice test", async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "Zipcode 1",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 200
                }
            ]
        };

        const result = await facade.generate(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items[0].id).toStrictEqual(input.items[0].id);
        expect(result.items[0].name).toStrictEqual(input.items[0].name);
        expect(result.items[0].price).toStrictEqual(input.items[0].price);
        expect(result.items[1].id).toStrictEqual(input.items[1].id);
        expect(result.items[1].name).toStrictEqual(input.items[1].name);
        expect(result.items[1].price).toStrictEqual(input.items[1].price);
        expect(result.total).toStrictEqual(300);
    });

    it("should find an invoice test", async () => {
        const respository = new InvoiceRepository();
        const generateUsecase = new GenerateInvoiceUsecase(respository);
        const findUsecase = new FindInvoiceUsecase(respository);
        const facade = new InvoiceFacade({
            findUseCase: findUsecase,
            generateUseCase: generateUsecase
        });

        const input = {
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "Zipcode 1",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 200
                }
            ]
        };

        const generatedInvoice = await facade.generate(input);

        const findInput = {
            id: generatedInvoice.id
        }

        const result = await facade.find(findInput);

        expect(result.id).toBe(generatedInvoice.id);
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.address.street).toBe(input.street);
        expect(result.address.number).toBe(input.number);
        expect(result.address.complement).toBe(input.complement);
        expect(result.address.city).toBe(input.city);
        expect(result.address.state).toBe(input.state);
        expect(result.address.zipCode).toBe(input.zipCode);
        expect(result.items[0].id).toStrictEqual(input.items[0].id);
        expect(result.items[0].name).toStrictEqual(input.items[0].name);
        expect(result.items[0].price).toStrictEqual(input.items[0].price);
        expect(result.items[1].id).toStrictEqual(input.items[1].id);
        expect(result.items[1].name).toStrictEqual(input.items[1].name);
        expect(result.items[1].price).toStrictEqual(input.items[1].price);
        expect(result.total).toStrictEqual(300);
    });

});