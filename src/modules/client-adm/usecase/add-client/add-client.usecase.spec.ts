import AddClientUsecase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    };
};

describe("Add client usecase unit test", () => {
    it("should add a client", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUsecase(repository);

        const input = {
            name: "Client 1",
            email: "x@x.com",
            document: "doc 1",
            street: "Street 1",
            number: "1",
            complement: "complement 1",
            city: "city 1",
            state: "state 1",
            zipCode: "zipcode 1"
        }

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.street).toBe(input.street);
    });
});

