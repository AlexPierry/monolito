import express, { Express } from 'express';
import request from 'supertest';
import { Sequelize } from "sequelize-typescript";
import { productRoute } from "../routes/product.route";
import ProductModel from "../../modules/product-adm/repository/product.model";

describe("ProductAdm API tests", () => {
    const app: Express = express()
    app.use(express.json())
    app.use("/product", productRoute)

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        });

        sequelize.addModels([ProductModel])
        await sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {

        const response = await request(app).post("/product").send({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 50.99,
            stock: 10
        });

        expect(response.status).toBe(200);
        expect(response.body.stock).toBe(10);
    });
});