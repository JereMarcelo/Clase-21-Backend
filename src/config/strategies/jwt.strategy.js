import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

export function jwtStrategy() {
    passport.use(
        'jwt', new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: '753159'
        },(payload, done) => {
            try {
                console.log(payload)
                done(null, payload)
            } catch (error) {
                done(error, false)
            }
        })
    );
}
function cookieExtractor(req) {
    return req?.cookies?.['jwt'];
}