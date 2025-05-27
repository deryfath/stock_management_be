
const User = require('../repository/user')
const Product = require('../repository/product')
const Checkout = require('../repository/checkout')
const Models = require('../config/database')

exports.checkoutList = async (query) => {

    if(query){
        const checkoutList = await Checkout.findAll({
            userId: query.userId
        })

        if(checkoutList.length==0){
            return {
                success: true,
                code: 200,
                message: "success retrieve checkout List",
                data : []
            }
        }
        
        const user = await User.findOne({
            id: query.userId
        })

        return {
            success: true,
            code: 200,
            message: "success retrieve checkout List",
            data : {
                checkoutList : checkoutList,
                user : user
            }
        }

    }

    return {
        success: false,
        code: 400,
        message: "error params empty"
    }

}

exports.add = async (body) => {
    const trx = await Models.transaction();

    if(body.productId && body.qty && body.userId){

        const existingProduct = await Product.findOne({
            id : body.productId
        });

        if(existingProduct){
            const checkoutData = {
                productId : existingProduct.id,
                productName : existingProduct.name,
                quantity : body.qty,
                userId : body.userId
            }
             
            const checkoutExisting = await Checkout.findOne({
                productId : existingProduct.id
            })
            if(checkoutExisting){
                await Checkout.update({
                    quantity : checkoutExisting.quantity + body.qty
                },{
                    productId: body.productId,
                    userId: body.userId
                }, trx);
            }else{
                await Checkout.create(checkoutData)
            }
        }else{
            await trx.rollback()
            return {
                success: false,
                code: 403,
                message: "there is invalid product",
            } 
        }
        
        await trx.commit()

        return {
            success: true,
            code: 200,
            message: "success add to checkout List",
        }
    }

    await trx.rollback()
    return {
        success: false,
        code: 400,
        message: "error payload"
    }
   

}

exports.submit = async (body) => {
    const trx = await Models.transaction();

    if(body.userId){
        const checkoutList = await Checkout.findAll({
            userId : body.userId
        })

        if(checkoutList.length==0){
            await trx.rollback()
            return {
                success: true,
                code: 404,
                message: "data checkout empty",
            }
        }

        for (const checkout of checkoutList){
            const existingProduct = await Product.findOne({
                id : checkout.productId,
                deletedAt: null
            });

            if(existingProduct){
                await Product.update({
                    stock : existingProduct.stock - checkout.quantity
                },{
                    id: checkout.productId
                }, trx);
            }
        }

        await Checkout.delete({
            userId : body.userId
        })

        await trx.commit()

        return {
            success: true,
            code: 200,
            message: "success submit checkout List",
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
