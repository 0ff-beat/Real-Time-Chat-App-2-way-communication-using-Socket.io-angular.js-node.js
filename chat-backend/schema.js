const schema = (mongoose)=>{
    userSchema  = mongoose.Schema(
        {
            username:String,
            password:String
        }
    )
    userModel = mongoose.model('user',userSchema);
    return {userModel};
}
module.exports = schema;