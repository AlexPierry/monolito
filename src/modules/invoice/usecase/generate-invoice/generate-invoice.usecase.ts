import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Address from "../../domain/address";
import Invoice from "../../domain/invoice";
import InvoiceItem from "../../domain/invoice.item";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUsecase implements UseCaseInterface {
    constructor(private generateUsecaseRepository: InvoiceGateway) { }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const props = {
            name: input.name,
            document: input.document,
            address: new Address(input.street, input.number, input.complement, input.city, input.state, input.zipCode),
            items: input.items.map(item => new InvoiceItem({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            }))
        }

        const invoice = new Invoice(props);

        await this.generateUsecaseRepository.generate(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: invoice.total
        }
    }
};