export const roleValidation = (roles) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({
                message: "Este Usuario no esta autorizado"
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).send({ 
                message: "No posee los permisos de rol necesarios" 
            });
        }
        next()
    }
}