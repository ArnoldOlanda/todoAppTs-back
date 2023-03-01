export class ValidationError extends Error {
    constructor(public message: string, public codeStatus: number) {
        super(message);
        this.name = "ValidationError";
    }
}
