import express, { Request, Response } from "express"
import OrderRepository from "../../modules/checkout/repository/order.repository";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../modules/store-catalog/factory/facade.factory";
import PaymentFacadeFactory from "../../modules/payment/factory/facade.factory";
import InvoiceFacadeFactory from "../../modules/invoice/factory/facade.factory";
import PlaceOrderUseCase from "../../modules/checkout/usecase/place-order/place-order.usecase";
import { PlaceOrderInputDto } from "../../modules/checkout/usecase/place-order/place-order.dto";

export const checkoutRoute = express.Router()
const repository = new OrderRepository();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();

    const usecase = new PlaceOrderUseCase(
        clientFacade,
        productFacade,
        catalogFacade,
        repository,
        invoiceFacade,
        paymentFacade
    );

    try {
        const input: PlaceOrderInputDto = {
            clientId: req.body.clientId,
            products: req.body.products,
        };

        const output = await usecase.execute(input);

        res.send(output);

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
});