export class NotFoundError extends Error {
    constructor(contentType: any = null) {
        super(`${!!contentType ? contentType : 'Content'} not found`);
        this.name = 'NotFoundError';
        this.stack = Error().stack;
    }
}

export class ArgumentNullError extends Error {
    constructor(argName: string) {
        super(`Argument: '${argName}' cannot be null`);
        this.name = 'ArgumentNullError';
        this.stack = Error().stack;
    }
}


export class ArgumentError extends Error {
    constructor(argName: string, message: string) {
        super(`Argument: '${argName}' ${message}`);
        this.name = 'ArgumentError';
        this.stack = Error().stack;
    }
}