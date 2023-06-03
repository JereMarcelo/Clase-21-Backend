import passport from 'passport';
import jwt from "jsonwebtoken";

export function authenticated(){
  return passport.authenticate("jwt", {
    session:false
  })
}

export function authorized(role) {
  return (req, res, next) => {
    console.log(req.user);
    if (!role || role.length === 0 || role.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send({
        message: `you do not have any of the required roles (${role})`,
      });
    }
  };
}

export function generateToken(user) {
  return jwt.sign( user , "12345", { expiresIn: '24h' });
  }