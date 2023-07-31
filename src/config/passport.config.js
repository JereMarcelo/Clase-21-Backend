import passport from 'passport';
import { userModel } from '../dao/models/user.model.js';
import { createHash, isValidPassword } from '../utils/crypto.js';
import { jwtStrategy } from './strategies/jwt.strategy.js';
import { localStrategy } from './strategies/local.strategy.js';
import { gitHubStrategy } from './strategies/gitHub.strategy.js';


/*const LocalStrategy = local.Strategy;
const GithubStrategy = github.Strategy;
const JWTStrategy = jwt.Strategy;*/

export function configurePassport() {
    localStrategy();
    jwtStrategy();
    gitHubStrategy();
    
    passport.use(
        'register',
        new localStrategy(
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
    passport.use('login', new localStrategy(
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


    /*passport.use('github',
        new githubStrategy(
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
                            edad: 45,
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
        new jwtStrategy({
            jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: "753159"
        }, (payload, done) => {
            try {
            console.log(payload)
            done(null, payload)
            } catch (error) {
                done(error, false)
            }

        })
    );
    */
}