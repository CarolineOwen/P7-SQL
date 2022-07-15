const PasswordValidator = require("password-validator");
//creation d'un mot de passe fort pour renforcer la sécurité
const passwordSchema = new PasswordValidator();

//shchema mot de passe
passwordSchema
.is().min(6)                                    
.is().max(20)                                  
.has().uppercase()                              
.has().lowercase()                              
.has().digits(1)                                
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']); 

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    }else{
        return res.status(400).json({error: `Le mot de passe est insuffisant ${passwordSchema.validate('req.body.password', {list:true})}`})
    }
}