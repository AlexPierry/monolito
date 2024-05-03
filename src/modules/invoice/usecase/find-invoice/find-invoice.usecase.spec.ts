import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address";
import Invoice from "../../domain/invoice";
import InvoiceItem from "../../domain/invoice.item";
import FindInvoiceUsecase from "./find-invoice.usecase";

const invoiceItem1 = new InvoiceItem({
    name: "Item 1",
    price: 100
});

const invoiceItem2 = new InvoiceItem({
    name: "Item 2",
    price: 50
})

const invoice = new Invoice({
    id: new Id("1"),
    name: "Name 1",
    document: "Document 1",
    address: new Address("Street 1", "100", "Complement 1", "City 1", "State 1", "ZipCode 1"),
    items: [invoiceItem1, invoiceItem2]
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        generate: jest.fn()
    }
};

describe("Find Invoice usecase unit test", () => {
    it("should find an invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new FindInvoiceUsecase(invoiceRepository);

        const input = {
            id: "1"
        };

        const result = await usecase.execute(input);

        expect(result.id).toBe("1");
        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items[0].id).toStrictEqual(invoice.items[0].id.id);
        expect(result.items[0].name).toStrictEqual(invoice.items[0].name);
        expect(result.items[0].price).toStrictEqual(invoice.items[0].price);
        expect(result.items[1].id).toStrictEqual(invoice.items[1].id.id);
        expect(result.items[1].name).toStrictEqual(invoice.items[1].name);
        expect(result.items[1].price).toStrictEqual(invoice.items[1].price);
        expect(result.total).toStrictEqual(150);
        expect(result.createdAt).toStrictEqual(invoice.createdAt);
    });
});