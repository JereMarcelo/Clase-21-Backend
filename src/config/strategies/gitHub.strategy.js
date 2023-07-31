import passport from 'passport';
import userModel from '../../dao/models/user.model.js';
import github from 'passport-github2';
//import { client } from 'websocket';



const GithubStrategy = github.Strategy;

export function gitHubStrategy(){
    passport.use('github', new GithubStrategy(
        {
            clientID: process.env.github_client_id,
            clientSecret: process.env.github_secret,
            callbackURL: process.env.github_callback_url,
        },
        async (accesToken, refreshToken, profile, done) => {
            try {
                console.log({ login: 'github', profile });
                const email = profile._json.email;
                const user = await userModel.findOne({ email });
                if(!user) {
                    const newUser = await userModel.create({
                        email,
                        nombre: profile._json.nombre,
                        apellido: '-',
                        password: '-',
                        edad: 45,
                    });
                    return done(null, newUser);
                }
                return done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
        )
    );
}