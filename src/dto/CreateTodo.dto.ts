export class CreateTodoDto {
    title: string;
    date: Date;
    idUser: number;
    idCategory: number;
    withNotification: boolean;
}
