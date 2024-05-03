import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        generate: jest.fn()
    }
};

describe("Generate Invoice usecase unit test", () => {
    it("should generate an invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUsecase(invoiceRepository);

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
                    price: 50
                }
            ]
        };

        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();
        expect(invoiceRepository.generate).toHaveBeenCalled();
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
        expect(result.total).toStrictEqual(150);
    });
});