import { Request, Response } from "express";
import { generateJWT } from "../helpers/generateJWT";
import { UserService } from "../services/user.service";
import { ValidationError } from "../errors/ValidationError";

declare module "express-serve-static-core" {
    interface Request {
        id: string;
        user: string;
    }
}

const userService = new UserService();

export const postLogin = async (req: Request, res: Response) => {
    const { user, password } = req.body;
    try {
        const { userValid, token } = await userService.login(user, password);

        return res.json({
            ok: true,
            user: userValid,
            token,
        });
    } catch (error: any) {
        if (error instanceof ValidationError) {
            return res.status(error.codeStatus).json({
                ok: false,
                message: error.message,
            });
        }
        return res
            .status(500)
            .json({ ok: false, message: "Hable con el administrador" });
    }
};

export const putNotificationToken = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { notificationToken } = req.body;

        const { message } = await userService.setNotificationToken(
            +id,
            notificationToken
        );

        return res.json({ message });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(error.codeStatus).json({
                ok: false,
                message: error.message,
            });
        }
        return res
            .status(500)
            .json({ ok: false, message: "Hable con el administrador" });
    }
};

export const postRegister = async (req: Request, res: Response) => {
    const { name, user, password } = req.body;

    try {
        const { user: newUser, token } = await userService.register(
            name,
            user,
            password
        );

        return res.json({
            ok: true,
            user: newUser,
            token,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ ok: false, message: "Hable con el administrador" });
    }
};

export const getRevalidateToken = async (req: Request, res: Response) => {
    const { id, user } = req;

    const token = await generateJWT(id, user);

    res.json({
        ok: true,
        id,
        user,
        token,
    });
};
