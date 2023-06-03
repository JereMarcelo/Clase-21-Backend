import { userModel } from "../../dao/models/user.model.js";
import { createHash, isValidPassword } from "../../utils/crypto.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export function localStrategy() {
    passport.use(
        'register',
        new localStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email',
            },
            async (req, username, password, done) => {
                try {
                    const { edad, apellido, nombre } = req.body;
                    const userExists = await userModel.findOne({ email: username });
                    if (userExists) { return done(null, false, { message: "User already exists" });
                }
                const createdCart = await fetch("http://localhost:8080/api/carts", {
                    method: "POST",
                });
                const cartData = await createdCart.json();
                const cartId = cartData.result._id;
                console.log(cartId);
                const newUser = await userModel.create({
                    nombre,
                    edad,
                    apellido,
                    cartId,
                    email: username,
                    password: createHash(password),
                });
                return done(null, newUser);
            } catch (error) {
                done(error);
            }
        }
    )
);
passport.use( 'login',
new LocalStrategy(
    {
        usernameField: 'email',
    },
    async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            if (!user) {
                console.log('User not found');
                return done(null, false);
            }
            if (!isValidPassword(password, user.password)) {
                console.log('wrong password');
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
    )
);
}