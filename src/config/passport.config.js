import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils/crypto.js'
import github from 'passport-github2';
import { config } from "../config.js"

const LocalStrategy = local.Strategy;
const GithubStrategy = github.Strategy;

export function configurePassport() {
    passport.use(
        'register',
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email'
            },
            async (req, username, password, done) => {
                try {
                    const { edad, email, apellido, nombre } = req.body;
                    const userExists = await userModel.findOne({ email: username })
                    if (userExists) {
                        return done(null, false);
                    }
                    const newUser = await userModel.create({
                        nombre,
                        edad,
                        apellido,
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
    passport.use('login', new LocalStrategy(
        {
            usernameField: 'email'
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                if (!user) {
                    console.log('Usuario no existente en el login')
                    return done(null, false);
                }
                if (!isValidPassword(password, user.password)) {
                    console.log('Contraseña incorrecta');
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                done(error);
            }

        }))


    passport.use('github',
        new GithubStrategy(
            {
                clientID: config.github_client_id,
                clientSecret: config.github_client_secret,
                callbackURL: config.github_callback_url,
            },
            async (accesToken, refreshToken, profile, done) => {
                try {
                    console.log({ login: 'github', profile });
                    const email = profile._json.email;
                    const user = await userModel.findOne({ email });
                    if (!user) {
                        const newUser = await userModel.create({
                            email,
                            nombre: profile._json.name,
                            apellido: '-',
                            password: '-',
                            edad: 24,
                        });
                        return done(null, newUser);
                    }

                    return done(null, user);
                }
                catch (error) {
                    done(error, false);
                }
            }
        )
    );


    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findOne({ _id: id });
        done(null, user);
    });
}