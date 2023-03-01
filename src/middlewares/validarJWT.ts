import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";

interface JwtPayload {
    id: string;
}

declare module "express-serve-static-core" {
    interface Request {
        id: string;
        user: string;
    }
}

// interface IGetUserAuthInfo extends Request {
//   autenthicatedUser: object; // or any other type
// }

export const validarJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header("access-token");

    if (!token) {
        return res.status(401).json({
            msg: "Se necesita enviar el token de autenticacion",
        });
    }
    try {
        const { id } = jwt.verify(
            token,
            process.env.SECRETORPRIVATEKEY as string
        ) as JwtPayload;

        const usuario = await User.findOneBy({ id: parseInt(id) });

        //Validar que el usuario exista en la base de datos
        if (!usuario) {
            return res.status(401).json({
                msg: "Token no valido - usuario eliminado de la BD",
            });
        }

        req.id = usuario.id.toString();
        req.user = usuario.user;

        next();
        return;
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Token invalido",
        });
    }
};
