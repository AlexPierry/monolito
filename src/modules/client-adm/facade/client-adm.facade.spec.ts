import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientRepository from "../repository/client.respository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("Client Adm Facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ClientModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const repository = new ClientRepository();
        const addUsecase = new AddClientUsecase(repository);
        const facade = new ClientAdmFacade({
            addUsecase: addUsecase,
            findUsecase: undefined
        });

        const input = {
            id: "1",
            name: "Client 1",
            document: "doc 1",
            email: "x@x.com",
            street: "street 1",
            number: "1",
            complement: "complement 1",
            city: "city 1",
            state: "state 1",
            zipCode: "zipcode 1"
        }

        await facade.add(input);

        const clientDb = await ClientModel.findOne({ where: { id: "1" } });
        expect(clientDb.id).toBe(input.id);
        expect(clientDb.name).toBe(input.name);
        expect(clientDb.email).toBe(input.email);
        expect(clientDb.street).toBe(input.street);
    });

    it("should find a client", async () => {
        // const repository = new ClientRepository();
        // const findUsecase = new FindClientUsecase(repository);
        // const addUsecase = new AddClientUsecase(repository);

        // const facade = new ClientAdmFacade({
        //     addUsecase: addUsecase,
        //     findUsecase: findUsecase
        // });

        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Client 1",
            document: "doc 1",
            email: "x@x.com",
            street: "street 1",
            number: "1",
            complement: "complement 1",
            city: "city 1",
            state: "state 1",
            zipCode: "zipcode 1"
        }

        await facade.add(input);

        const client = await facade.find({ id: "1" });
        expect(client).toBeDefined();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.street).toBe(input.street);
    });

});