import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import Address from "../domain/address";
import Invoice from "../domain/invoice";
import InvoiceItem from "../domain/invoice.item";
import InvoiceRepository from "./invoice.repository";

describe("Invoice repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should generate an invoice", async () => {
        const repository = new InvoiceRepository();

        const address = new Address("Street 1", "1", "Complement 1", "City 1", "State 1", "Zipcode 1");
        const item1 = new InvoiceItem({ name: "Item 1", price: 100 });
        const item2 = new InvoiceItem({ name: "Item 2", price: 50 });
        const invoice = new Invoice({
            name: "Invoice 1",
            document: "Document 1",
            address: address,
            items: [item1, item2]
        });

        await repository.generate(invoice);

        const result = await InvoiceModel.findOne({ where: { id: invoice.id.id } })

        expect(result.id).toBeDefined();
        expect(result.id).toBe(invoice.id.id);
        expect(result.createdAt).toBeDefined();
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.street).toBe(invoice.address.street);
        expect(result.number).toBe(invoice.address.number);
        expect(result.complement).toBe(invoice.address.complement);
        expect(result.city).toBe(invoice.address.city);
        expect(result.state).toBe(invoice.address.state);
        expect(result.zipcode).toBe(invoice.address.zipCode);
        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBe(item1.id.id);
        expect(result.items[0].name).toBe(item1.name);
        expect(result.items[0].price).toBe(item1.price);
        expect(result.items[1].id).toBe(item2.id.id);
        expect(result.items[1].name).toBe(item2.name);
        expect(result.items[1].price).toBe(item2.price);
    });

    it("shoudl find an invoice", async () => {
        const repository = new InvoiceRepository();

        const address = new Address("Street 1", "1", "Complement 1", "City 1", "State 1", "Zipcode 1");
        const item1 = new InvoiceItem({ name: "Item 1", price: 100 });
        const item2 = new InvoiceItem({ name: "Item 2", price: 50 });
        const invoice = new Invoice({
            name: "Invoice 1",
            document: "Document 1",
            address: address,
            items: [item1, item2]
        });

        await repository.generate(invoice);

        const foundInvoice = await repository.find(invoice.id.id);

        expect(foundInvoice.id).toBeDefined();
        expect(foundInvoice.id.id).toBe(invoice.id.id);
        expect(foundInvoice.createdAt).toBeDefined();
        expect(foundInvoice.name).toBe(invoice.name);
        expect(foundInvoice.document).toBe(invoice.document);
        expect(foundInvoice.address.street).toBe(invoice.address.street);
        expect(foundInvoice.address.number).toBe(invoice.address.number);
        expect(foundInvoice.address.complement).toBe(invoice.address.complement);
        expect(foundInvoice.address.city).toBe(invoice.address.city);
        expect(foundInvoice.address.state).toBe(invoice.address.state);
        expect(foundInvoice.address.zipCode).toBe(invoice.address.zipCode);
        expect(foundInvoice.items.length).toBe(2);
        expect(foundInvoice.items[0].id.id).toBe(item1.id.id);
        expect(foundInvoice.items[0].name).toBe(item1.name);
        expect(foundInvoice.items[0].price).toBe(item1.price);
        expect(foundInvoice.items[1].id.id).toBe(item2.id.id);
        expect(foundInvoice.items[1].name).toBe(item2.name);
        expect(foundInvoice.items[1].price).toBe(item2.price);
        expect(foundInvoice.total).toBe(invoice.total);
    });
});