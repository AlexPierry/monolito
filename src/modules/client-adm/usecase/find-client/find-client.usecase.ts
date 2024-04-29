import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClientUsecase {
    private _clientRepository: ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {

        const result = await this._clientRepository.find(input.id);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            email: result.email,
            street: result.street,
            complement: result.complement,
            number: result.number,
            city: result.city,
            state: result.state,
            zipCode: result.zipCode,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    }
}