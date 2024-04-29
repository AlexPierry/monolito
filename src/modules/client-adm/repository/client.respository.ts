import Id from "../../@shared/domain/value-object/id.value-object";
import ClientEntity from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientGateway {
    async add(client: ClientEntity): Promise<void> {

        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            street: client.street,
            document: client.document,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
    }

    async findAll(): Promise<ClientEntity[]> {
        const clients = await ClientModel.findAll();

        return clients.map((client) =>
            new ClientEntity({
                id: new Id(client.id),
                name: client.name,
                document: client.document,
                email: client.email,
                street: client.street,
                complement: client.complement,
                number: client.number,
                city: client.city,
                state: client.state,
                zipCode: client.zipCode
            })
        )
    };

    async find(id: string): Promise<ClientEntity> {
        const client = await ClientModel.findOne({
            where: { id },
        });

        if (!client) {
            throw new Error(`Client with id ${id} not found`);
        }

        return new ClientEntity({
            id: new Id(client.id),
            name: client.name,
            document: client.document,
            email: client.email,
            street: client.street,
            complement: client.complement,
            number: client.number,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode
        });
    }
}