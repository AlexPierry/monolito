import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client.model";
import ClientRepository from "./client.respository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Client Repository test", () => {
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
        const client = new Client({
            id: new Id("1"),
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1"
        });

        const repository = new ClientRepository();
        await repository.add(client);

        const clientDb = await ClientModel.findOne({ where: { id: "1" } });
        expect(clientDb.id).toBe(client.id.id);
        expect(clientDb.name).toBe(client.name);
        expect(clientDb.email).toBe(client.email);
        expect(clientDb.address).toBe(client.address);
        expect(clientDb.createdAt).toStrictEqual(client.createdAt);
        expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
    })

    it("should find all clients", async () => {
        await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await ClientModel.create({
            id: "2",
            name: "Client 2",
            email: "y@y.com",
            address: "Address 2",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const clientRepository = new ClientRepository();
        const clients = await clientRepository.findAll();

        expect(clients.length).toBe(2);
        expect(clients[0].id.id).toBe("1");
        expect(clients[0].name).toBe("Client 1");
        expect(clients[0].email).toBe("x@x.com");
        expect(clients[0].address).toBe("Address 1");
        expect(clients[1].id.id).toBe("2");
        expect(clients[1].name).toBe("Client 2");
        expect(clients[1].email).toBe("y@y.com");
        expect(clients[1].address).toBe("Address 2");
    });

    it("should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const repository = new ClientRepository();

        const result = await repository.find(client.id);

        expect(result.id.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
    });
});