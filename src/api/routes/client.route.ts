import express, { Request, Response } from "express"
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import { AddClientFacadeInputDto } from "../../modules/client-adm/facade/client-adm.facade.interface";

export const clientRoute = express.Router()

clientRoute.post("/", async (req: Request, res: Response) => {

    const clientFacade = ClientAdmFacadeFactory.create();

    try {
        const addClientDto: AddClientFacadeInputDto = {
            id: req.body.id,
            name: req.body.name,
            document: req.body.document,
            email: req.body.email,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode
        }

        await clientFacade.add(addClientDto);

        res.send();

    } catch (err) {
        res.status(500).send(err)
    }
});