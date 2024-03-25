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
            address: client.address,
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
                email: client.email,
                address: client.address
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
            email: client.email,
            address: client.address
        });
    }
}