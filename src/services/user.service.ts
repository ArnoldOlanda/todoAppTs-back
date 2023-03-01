import bcrypt from "bcryptjs";
import { User } from "../entity";
import { ValidationError } from "../errors/ValidationError";
import { generateJWT } from "../helpers/generateJWT";

export class UserService {
    async login(
        user: string,
        password: string
    ): Promise<{ token: unknown; userValid: User }> {
        const userValid = await User.findOneBy({ user });
        if (!userValid) {
            throw new ValidationError("the user doesn´t exists", 404);
        }

        const passwordvalid = bcrypt.compareSync(password, userValid.password);
        if (!passwordvalid) {
            throw new ValidationError(
                "the password is incorrect for this user",
                401
            );
        }

        const token = await generateJWT(
            userValid.id.toString(),
            userValid.user
        );
        return { token, userValid };
    }

    async register(
        name: string,
        user: string,
        password: string
    ): Promise<User> {
        try {
            const salt = bcrypt.genSaltSync(10);
            const encryptedPassword = bcrypt.hashSync(password, salt);

            const newUser = new User();
            newUser.name = name;
            newUser.user = user;
            newUser.password = encryptedPassword;

            await newUser.save();
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}
