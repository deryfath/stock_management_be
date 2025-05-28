
const Shop = require('../repository/shop');
const Warehouse = require('../repository/warehouse');
const Models = require('../config/database');
const { Op, where } = require('sequelize');

exports.list = async () => {

    const warehouseData = await Warehouse.findAll();
    
    return {
        success : true,
        message: "Success Retrieve warehouse list",
        data: {
            list : warehouseData,
            total : warehouseData.length,
        },
    }

}

exports.add = async (body) => {
    if(body.name && body.address && body.shopId){
        const existingShop = await Shop.findOne({
            id: body.shopId    
        });
        if(existingShop == null){
            return {
                success: false,
                code: 404,
                message: `shop with id ${body.shopId} not found`
            }
        }
        const warehouseData = {
                name: body.name,
                address: body.address,
                shopId: body.shopId
            };
        const createdWarehouse = await Warehouse.create(warehouseData);

        return {
            success: true,
            code: 200,
            message: "success add shop",
            data: createdWarehouse
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

    if(body.id!=null && body.name!=null && body.address!=null && body.shopId!=null){

        const existingShop = await Shop.findOne({
                    id : body.shopId
                });
        
        if(existingShop == null){
            return {
                success: false,
                code: 404,
                message: `shop with id ${body.shopId} not found`
            }
        }

        const existingWarehouse = await Warehouse.findOne({
                    id : body.id
                });
        if(existingWarehouse){
            await Warehouse.update({
                       name : body.name,
                       address: body.address,
                       shopId: body.shopId
                   },{
                       id: body.id
                   }, trx);
            await trx.commit();
            return {
                success: true,
                code: 200,
                message: "update warehouse success"
            }

        }else{
            return {
                success: false,
                code: 500,
                message: "no warehouse exist"
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
        const existingWarehouse = await Warehouse.findOne({
                    id : body.id
                });
        
        if(existingWarehouse){
            await Warehouse.update(
                {
                  deletedAt : new Date(),
                },
                {
                  id : body.id
                });
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
