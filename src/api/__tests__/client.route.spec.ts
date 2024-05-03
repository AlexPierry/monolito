import express, { Express } from 'express';
import request from 'supertest';
import { Sequelize } from "sequelize-typescript";
import { clientRoute } from '../routes/client.route';
import ClientModel from '../../modules/client-adm/repository/client.model';

describe("ClientAdm API tests", () => {
    const app: Express = express()
    app.use(express.json())
    app.use("/client", clientRoute)

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ClientModel])
        await sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {

        const response = await request(app).post("/client").send({
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
        });

        expect(response.status).toBe(200);
    });
});