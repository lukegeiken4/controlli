export class NotFoundError extends Error {
    /**
     * Error when content requested is not found
     * @param contentType 
     */
    constructor(contentType: any = null) {
        super(`${!!contentType ? contentType : 'Content'} not found`);
        this.name = 'NotFoundError';
        this.stack = Error().stack;
    }
}

export class ArgumentNullError extends Error {
    /**
     * Error when expected argument is null
     * @param argName Expected argument that was null
     */
    constructor(argName: string) {
        super(`Argument: '${argName}' cannot be null`);
        this.name = 'ArgumentNullError';
        this.stack = Error().stack;
    }
}


export class ArgumentError extends Error {
    /**
     * Error when argument is invalid due to logic
     * Ex: Expect arg to be a number between 1-5. Arg given is 10.
     * @param argName The argument that is invalid
     * @param message The failure message
     */
    constructor(argName: string, message: string) {
        super(`Argument: '${argName}' ${message}`);
        this.name = 'ArgumentError';
        this.stack = Error().stack;
    }
}