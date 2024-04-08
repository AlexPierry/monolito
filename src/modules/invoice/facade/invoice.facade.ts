import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCasesProps {
    findUseCase: UseCaseInterface;
    generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findInvoiceUsecase: UseCaseInterface;
    private _generateInvoiceUsecase: UseCaseInterface;

    constructor(useCasesProps: UseCasesProps) {
        this._findInvoiceUsecase = useCasesProps.findUseCase;
        this._generateInvoiceUsecase = useCasesProps.generateUseCase;
    }

    find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return this._findInvoiceUsecase.execute(input);
    }

    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateInvoiceUsecase.execute(input);
    }
};