import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../entity";
import { generateJWT } from "../helpers/generateJWT";
import { UserService } from "../services/user.service";
import { ValidationError } from "../errors/ValidationError";

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

export const postRegister = async (req: Request, res: Response) => {
    const { name, user, password } = req.body;

    try {
        const newUser = await userService.register(name, user, password);

        return res.json({
            ok: true,
            user: newUser,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ ok: false, message: "Hable con el administrador" });
    }
};

export const getRevalidateToken = async (req: Request, res: Response) => {
    //@ts-ignore
    const { id, user } = req;

    const token = await generateJWT(id, user);

    res.json({
        ok: true,
        id,
        user,
        token,
    });
};
