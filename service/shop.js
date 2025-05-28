
const Shop = require('../repository/shop');
const Models = require('../config/database');
const { Op, where } = require('sequelize');

exports.list = async () => {

    const shopData = await Shop.findAll();
    
    return {
        success : true,
        message: "Success Retrieve shop list",
        data: {
            list : shopData,
            total : shopData.length,
        },
    }

}

exports.add = async (body) => {
    if(body.name && body.address){
        const shopData = {
                name: body.name,
                address: body.address,
            };  

        const createdShop = await Shop.create(shopData);
        return {
            success: true,
            code: 200,
            message: "success add shop",
            data: createdShop
        }
    }else{
        return {
            success: false,
            code: 400,
            message: "error payload"
        }
    }

}

exports.update = async (body) => {
    const trx = await Models.transaction();

    if(body.id!=null && body.name!=null && body.address!=null){

        const existingShop = await Shop.findOne({
                    id : body.id
                });
        
        if(existingShop){

            await Shop.update({
                      name : body.name,
                      address: body.address,
                  },{
                      id: body.id
                  }, trx);
            await trx.commit();
            return {
                success: true,
                code: 200,
                message: "update shop success"
            }

        }else{
            return {
                success: false,
                code: 500,
                message: "no shop exist"
            }
        }
    }

    await trx.rollback()
    return {
        success: false,
        code: 400,
        message: "error payload"
    }

}

exports.remove = async (body) => {
    const trx = await Models.transaction();

    if(body.id){
        const existingShop = await Shop.findOne({
                    id : body.id
                });
        
        if(existingShop){
            await Shop.update(
                {
                    deletedAt : new Date()
                },{
                    id : body.id
                })
            await trx.commit();
            return {
                success: true,
                code: 200,
                message: "remove shop success"
            }

        }else{
            return {
                success: false,
                code: 500,
                message: "no shop exist"
            }
        }
    }

    await trx.rollback()
    return {
        success: false,
        code: 400,
        message: "error payload"
    }

}

module.exports = exports;
