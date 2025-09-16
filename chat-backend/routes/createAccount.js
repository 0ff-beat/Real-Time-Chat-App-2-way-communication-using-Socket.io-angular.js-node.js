const argon2 = require('argon2');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const createAccount = (socket,userModel,keys)=>{
socket.on('createAccount',async (data,cb)=>{
    if(await isUsernameUnique(data,userModel)){
        
        try{
        const salt = await fs.readFileSync('keys/passwordSalt.key')
        const hashedPassword =await  argon2.hash(data.password,{salt:salt});
        const model = await new userModel({
            username:data.username,
            password:hashedPassword
        });
        await model.save();
        const TOKEN = await jwt.sign(JSON.parse(JSON.stringify(model)),keys.private,{algorithm:'RS256',expiresIn:'7d'});
        cb({status:'200',token:TOKEN});

    }catch(error){console.log(error);cb({status:'404'})}
}else{
cb({status:'201',message:"username exists"})
}
});
}

async function isUsernameUnique(data,userModel){
    const existedData = await userModel.find({"username":data.username})
    if(existedData.length == 0){
        return true;
    }else{
        return false;
    }
}
module.exports = createAccount;