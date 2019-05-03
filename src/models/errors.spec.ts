import { 
    ArgumentError,
    ArgumentNullError,
    NotFoundError
} from './errors'

describe("Model ArgumentError: ", () => {
    let sut: ArgumentError;
    let errParam: string;
    let errMessage: string;

    beforeEach(() => {
        errParam = 'test';
        errMessage = 'cannot be greater than 2';
        sut = new ArgumentError(errParam, errMessage);
    });

    it("should have its correct constructor.name", () => {
        expect(sut.name).toEqual('ArgumentError');
    });

    it("should print the correct toString()", () => {
        expect(sut.toString()).toEqual(`ArgumentError: Argument: '${errParam}' ${errMessage}`);
    });
});

describe("Model ArgumentNullError: ", () => {
    let sut: ArgumentNullError;
    let errParam: string;

    beforeEach(() => {
        errParam = 'test';
        sut = new ArgumentNullError(errParam);
    });

    it("should have its correct constructor.name", () => {
        expect(sut.name).toEqual('ArgumentNullError');
    });

    it("should print the correct toString()", () => {
        expect(sut.toString()).toEqual(`ArgumentNullError: Argument: '${errParam}' cannot be null`);
    });
});

describe("Model NotFoundError: ", () => {
    let sut: NotFoundError;
    let contentType: string;

    describe("When contentType is given", () => {
        beforeEach(() => {
            contentType = 'test';
            sut = new NotFoundError(contentType);
        });

        it("should have its correct constructor.name", () => {
            expect(sut.name).toEqual('NotFoundError');
        });

        it("should print the correct toString()", () => {
            expect(sut.toString()).toEqual(`NotFoundError: ${contentType} not found`);
        });
    });

    describe("When contentType is not given", () => {
        beforeEach(() => {
            sut = new NotFoundError();
        });

        it("should have its correct constructor.name", () => {
            expect(sut.name).toEqual('NotFoundError');
        });

        it("should print the correct toString()", () => {
            expect(sut.toString()).toEqual(`NotFoundError: Content not found`);
        });
    });
});