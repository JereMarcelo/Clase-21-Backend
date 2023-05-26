import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../dao/models/user.model.js';
import { createHash, isValidPassword } from '../utils/crypto.js';
import github from 'passport-github2';
import jwt from 'passport-jwt';

const LocalStrategy = local.Strategy;
const GithubStrategy = github.Strategy;
const JWTStrategy = jwt.Strategy;

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
                    const { edad, apellido, nombre } = req.body;
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
                clientID:  process.env.github_client_id,
                clientSecret: process.env.github_secret,
                callbackURL: process.env.github_callback_url,
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
    passport.use(
        'jwt',
        new JWTStrategy({
            jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: "12345"
        }, (payload, done) => {
            try {
            console.log(payload)
            done(null, payload)
            } catch (error) {
                done(error, false)
            }

        })
    );


    function cookieExtractor(req) {
        return req?.cookies?.["AUTH"];
    }

    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findOne({ _id: id });
        done(null, user);
    });
}