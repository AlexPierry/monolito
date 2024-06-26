import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUsecase {
    private _clientRepository: ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const props = {
            id: new Id(input.id) || new Id(),
            name: input.name,
            email: input.email,
            document: input.document,
            street: input.street,
            complement: input.complement,
            number: input.number,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode
        }

        const client = new Client(props);

        this._clientRepository.add(client);

        return {
            id: client.id.id,
            name: client.name,
            document: client.document,
            email: client.email,
            street: client.street,
            complement: client.complement,
            number: client.number,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
            createdAt: client.createdAt,
            updateAt: client.updatedAt
        }
    }
}