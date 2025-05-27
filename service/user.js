
const User = require('../repository/user')
const Models = require('../config/database')

exports.list = async () => {

    const userList = await User.findAll();
    
    return {
        success : true,
        message: "Success Retrieve product list",
        data : userList
    }

}

exports.findById = async (id) => {

    const userList = await User.findOne({
        id : id
    });
    
    return {
        success : true,
        message: "Success Retrieve product list",
        data : userList
    }

}

exports.register = async (body) => {

    if(body.name && body.email && body.address && body.password){
        const existingUser = await User.findOne({
            email : body.email
        });
        
        if(existingUser){
          return {
              success: false,
              code: 403,
              message: `already registered with ${body.email}, please login`
          }
        }
        
        const userData = {
          name: body.name,
          email: body.email,
          password: body.password,
          address: body.address,
          isLogin: body.isLogin || false,
          role: body.role || 'user',
        };  
        
        const createdUser = await User.create(userData);
        return {
          success: true,
          code: 200,
          message: "success created profile",
          data: createdUser
      }
    }
    
    return {
        success: false,
        code: 400,
        message: "error payload"
    }

}

exports.update = async (body) => {
    const trx = await Models.transaction();
    console.log("body", body);
    if(body.id && body.name && body.email && body.address && body.password && body.isLogin!== undefined){
        const existingUser = await User.findOne({
            email : body.email
        });
        
        if(!existingUser){
          trx.rollback()
          return {
              success: false,
              code: 403,
              message: `account with ${body.email} not found, please register`
          }
        }
        
        const userData = {
          id: existingUser.id,
          name: body.name,
          email: body.email,
          password: body.password,
          address: body.address,
          isLogin: body.isLogin || false,
        };  
        
        const updateUser = await User.update(
            userData,
        {
            id: existingUser.id
        }, trx);
        await trx.commit()
        return {
          success: true,
          code: 200,
          message: "success update profile",
          data: updateUser
      }
    }
    await trx.rollback();
    return {
        success: false,
        code: 400,
        message: "error payload"
    }
}

exports.remove = async (body) => {
    const trx = await Models.transaction();
    console.log("body id", body.id);
    if(body.id!== null){
        const existingUser = await User.findOne({
            id : body.id
        });
        
        if(!existingUser){
          trx.rollback()
          return {
              success: false,
              code: 403,
              message: `account with ${body.email} not found, please register`
          }
        }
        
        const deleteUser = await User.delete({
            id : body.id
        }, trx);
        await trx.commit()
        return {
          success: true,
          code: 200,
          message: "success delete profile",
          data: deleteUser
      }
    }
    await trx.rollback()
    return {
        success: false,
        code: 400,
        message: "error payload"
    }
}

exports.login = async (body) => {

  const trx = await Models.transaction();

  if(body.email && body.password){
      const existingUser = await User.findOne({
          email : body.email,
          password : body.password
      });
      
      if(!existingUser){
        return {
            success: false,
            code: 401,
            message: `wrong password or email`
        }
      }
      
      if(existingUser && existingUser.isLogin){
          await trx.rollback()
          return {
              success: false,
              code: 401,
              message : `already Login`
          }
      }else{
          await User.update({
              isLogin : true
          },{
              email: body.email
          }, trx);
          await trx.commit()
          const existingUserLogin = await User.findOne({
              email : body.email,
              password : body.password
          });
          return {
            success: true,
            code: 200,
            message : `success Login`,
            data: existingUserLogin
        }
      }
  }
  
  return {
      success: false,
      code: 400,
      message: "error payload"
  }

}

exports.logout = async (body) => {

  const trx = await Models.transaction();

  if(body.id){
      const existingUser = await User.findOne({
          id : body.id,
      });
      
      if(!existingUser){
        await trx.rollback()
        return {
            success: false,
            code: 401,
            message: `user ${body.email} not found, logout failure`
        }
      }

      await User.update({
          isLogin : false
      },{
          id: body.id
      }, trx);
      await trx.commit()
      return {
        success: true,
        code: 200,
        message : `success Logout`
    }
      
  }
  
  return {
      success: false,
      code: 400,
      message: "error payload"
  }

}
  
  

module.exports = exports;
