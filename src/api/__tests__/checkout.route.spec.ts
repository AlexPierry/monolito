import request from "supertest";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import OrderModel from "../../modules/checkout/repository/order.model";
import ClientModel from "../../modules/client-adm/repository/client.model";
import ProductModel from "../../modules/checkout/repository/product.model";
import ProductAdmModel from "../../modules/product-adm/repository/product.model";
import ProductStoreModel from "../../modules/store-catalog/repository/product.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { checkoutRoute } from "../routes/checkout.route";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import { Umzug } from "umzug";
import { migrator } from "../../test-migrations/config/migrator";

describe("Checkout API tests", () => {
    const app: Express = express();
    app.use(express.json());
    app.use("/checkout", checkoutRoute);

    let sequelize: Sequelize;

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([
            OrderModel,
            ClientModel,
            ProductModel,
            ProductAdmModel,
            ProductStoreModel,
            TransactionModel,
            InvoiceModel
        ]);

        migration = migrator(sequelize);
        await migration.up();
    });

    afterEach(async () => {
        if (!migration || !sequelize) {
            return;
        }
        migration = migrator(sequelize);
        await migration.down();
        await sequelize.close();
    });

    it("should do the checkout", async () => {
        await ClientModel.create({
            id: "1",
            name: "Client 1",
            document: "doc 1",
            email: "x@x.com",
            street: "street 1",
            number: "1",
            complement: "complement 1",
            city: "city 1",
            state: "state 1",
            zipCode: "zipcode 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        try {
            await ProductModel.create({
                id: "1",
                name: "Product 1",
                description: "Product 1 description",
                purchasePrice: 80,
                salesPrice: 100,
                stock: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        } catch (error) {
            console.log(error)
        }

        await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Product 2 description",
            purchasePrice: 170,
            salesPrice: 200,
            stock: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1",
                products: [{ productId: "1" }, { productId: "2" }],
            });

        expect(response.status).toEqual(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.total).toEqual(300);
        expect(response.body.status).toEqual("approved");
    });
});