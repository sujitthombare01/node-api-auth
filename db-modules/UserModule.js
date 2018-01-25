
const mongoose =require('mongoose');
 const db = require('../db-config/mongodb').mongoose.connection;

const schema = mongoose.Schema;

const userSchema   = schema({
 clnt : { type :String , default :'4500' }  ,
 lang : { type :String , default :'EN' } ,
 cmpn :  { type :String , default :'1000' } ,
 username : {type :String , unique : true, required :true} ,
 firstName : {type :String ,  required : [true,'required first name'] } ,
 lastName : {type :String ,  required : [true,'required last name'] } ,
 email : {type :String ,  required : [true,'required email'] } ,
 age : {type :String ,  required : [true,'required age'] } 
});

const userModule =mongoose.model('users',userSchema);

const findUserByUsername = (user,callback)=>{

                            userModule.findOne({username:new RegExp('^'+user.username+'$' ,'i') },(err,user)=>{
                                                if(err)
                                                {
                                                    console.log('User Find by Username Error')
                                                    console.log(err)
                                                    callback(err)
                                                }
                                                else{

                                                    
                                                    callback(null,user);
                                                    
                                                }
                                                                                
                                                });

}

const saveuser =(user,callback)=>{

                                    if(user.tcode==='create')
                                    {
                                            console.log('User Creation');
                                            let userObj = new userModule({
                                                    username :user.username ,
                                                    firstName:user.firstName,
                                                    lastName:user.lastName,
                                                    email :user.email,
                                                    age:user.age

                                                    });

                                findUserByUsername(user,(err,user)=>{
                                    if(err) {  
                                        console.log('User Error :' );
                                        console.log(err);
                                        callback(err)  
                                        return
                                        }
                                    if(user){
                                        callback({error_message:'user exist',user},null);

                                    }  else{
                                                    userObj.save(err=>{
                                                        if(err){
                                                            console.log('User Error :' );
                                                            console.log(err);
                                                            callback(err)
                                                        }
                                                        else{
                                                            callback(null,userObj);
                                                        }

                                                    });

                                    } 


                                });
                                        

                                    }
                                    else if   (user.tcode==='update'){
                                        console.log('User Update');


                                    }
                                    else {

                                        callback({error_message:'NO TCODE FOUND'});
                                    }
};

const getUserDetails=(query,callback)=>{
    userModule.find({},(err,users)=>{
        if(err)
        {
            console.log('User Find all Error')
            console.log(err)
            callback(err)
        }
        else{

            
            callback(null,users);
            
        }
                                        
        });

}

module.exports ={  userModule ,findUserByUsername,saveuser,getUserDetails  }