
const User = require('../repository/user')
const Product = require('../repository/product')
const Order = require('../repository/order')
const Models = require('../config/database')

exports.checkoutList = async (query) => {

    if(query){
        const checkoutList = await Order.findAll({
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

    if(body.product && body.product.length > 0 && body.userId && body.shopId){
       body.product.forEach(async (product, index) => {
            const existingProduct = await Product.findOne({
                id : product.id,   
                deletedAt: null
            });
            if(existingProduct){
                const checkoutData = {
                    productId : existingProduct.id,
                    productName : existingProduct.name,
                    quantity : product.qty,
                    userId : body.userId,
                    shopId : body.shopId,
                }
                
                const checkoutExisting = await Order.findOne({
                    productId : existingProduct.id,
                    userId: body.userId
                })
                if(checkoutExisting){
                    await Order.update({
                        quantity : checkoutExisting.quantity + product.qty
                    },{
                        productId: existingProduct.id,
                        userId: body.userId
                    });
                }else{
                    await Order.create(checkoutData, trx)
                }

            }else{
                await trx.rollback()
                return {
                    success: false,
                    code: 403,
                    message: "there is invalid product",
                } 
            }
         
        })

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
        const checkoutList = await Order.findAll({
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

        await Order.update({
            status: "paid"
        },
        {
            id: body.userId
        }, trx);

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
