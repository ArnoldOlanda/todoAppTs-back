export class NotFoundError extends Error {
    constructor(
        public message: string,
        public name: string = "NotFoundError",
        public codeStatus: number = 404
    ) {
        super(message);
    }
}
