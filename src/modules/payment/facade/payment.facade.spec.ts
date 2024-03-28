import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUsecase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacade from "./payment.facade";
import PaymentFacadeFactory from "../factory/facade.factory";

describe("PaymentFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([TransactionModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a transaction", async () => {
        const respository = new TransactionRepository();
        const usecase = new ProcessPaymentUsecase(respository);
        const facade = new PaymentFacade(usecase);

        const input = {
            orderId: "order-1",
            amount: 100
        };

        const result = await facade.process(input);

        expect(result.transactionId).toBeDefined();
        expect(result.orderId).toBe(input.orderId);
        expect(result.amount).toBe(input.amount);
        expect(result.status).toBe("approved");
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })

    it("should create a transaction using a factory", async () => {
        const facade = PaymentFacadeFactory.create();

        const input = {
            orderId: "order-1",
            amount: 100
        };

        const result = await facade.process(input);

        expect(result.transactionId).toBeDefined();
        expect(result.orderId).toBe(input.orderId);
        expect(result.amount).toBe(input.amount);
        expect(result.status).toBe("approved");
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })

});