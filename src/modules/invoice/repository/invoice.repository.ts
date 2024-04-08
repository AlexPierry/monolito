import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address";
import Invoice, { InvoiceId } from "../domain/invoice";
import InvoiceItem from "../domain/invoice.item";
import InvoiceGateway from "../gateway/invoice.gateway";
import AddressModel from "./address.model";
import InvoiceItemModel from "./invoice.item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(entity: Invoice): Promise<void> {
        await InvoiceModel.create(
            {
                id: entity.id.id,
                name: entity.name,
                document: entity.document,
                address_id: entity.address.id.id,
                address: {
                    id: entity.address.id.id,
                    street: entity.address.street,
                    number: entity.address.number,
                    complement: entity.address.complement,
                    city: entity.address.city,
                    state: entity.address.state,
                    zipcode: entity.address.zipCode
                },
                items: entity.items.map(item => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                })),
                createdAt: entity.createdAt,
                updatedAt: entity.updatedAt
            },
            {
                include: [{ model: InvoiceItemModel }, { model: AddressModel }]
            }
        )
    }

    async find(id: string): Promise<Invoice> {
        const invoiceModel = await InvoiceModel.findOne({
            where: { id: id },
            include: [InvoiceItemModel, AddressModel],
        });

        if (invoiceModel == null) {
            throw new Error("Invoice not found");
        }

        return new Invoice({
            id: new InvoiceId(invoiceModel.id),
            name: invoiceModel.name,
            document: invoiceModel.document,
            address: new Address(
                invoiceModel.address.street,
                invoiceModel.address.number,
                invoiceModel.address.complement,
                invoiceModel.address.city,
                invoiceModel.address.state,
                invoiceModel.address.zipcode
            ),
            items: invoiceModel.items.map(item => new InvoiceItem({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            }))
        });
    };
};