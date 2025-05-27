
const Product = require('../repository/product')
const Models = require('../config/database');
const { Op, where } = require('sequelize');

exports.productList = async (req) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page) ;
    const find = req.query.find;
    const offset = (page - 1) * limit;
    const where = {
        name : {
            [Op.like]: `%${find}%`
        },
        deletedAt: null
      };
    const order = [['updatedAt', 'DESC']];

    const { rows: data, count: total } = await Product.findAndCountAll(where, {
        limit,
        offset,
        order
      });
    
    return {
        success : true,
        message: "Success Retrieve product list",
        data: {
            data,
            total,
        },
    }

}

exports.dashboard = async () => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const is30daysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
      
    const dataAlmostExpired = await Product.findAll({ 
          expiredAt: {
              [Op.between]: [
                  now ,
                  is30daysFromNow 
              ]
          }
     });

    const dataExpired = await Product.findAll({ 
        expiredAt: {
            [Op.lte]: now
        }
   });

   const dataAlmostEmptyStock = await Product.findAll({ 
        stock: {
            [Op.lt]: 5
        }
    });

    const dataEmptyStock = await Product.findAll({ 
        stock: {
            [Op.eq]: 0
        }
    });

    const dataAll = await Product.findAll({});
  
    return {
      success: true,
      message: "Success Retrieve expired product list",
      data: { 
        dataExpired : dataExpired,
        totalProduct : dataAll.length,
        totalExpired : dataExpired.length,
        totalAlmostExpired : dataAlmostExpired.length,
        totalAlmostEmptyStock : dataAlmostEmptyStock.length,
        totalEmptyStock : dataEmptyStock.length,
     },
    };
  };

exports.expired = async () => {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const is30daysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

  const data = await Product.findAll({ 
        expiredAt: {
            [Op.between]: [
                now ,
                is30daysFromNow 
            ]
        }
   });

  return {
    success: true,
    message: "Success Retrieve expired product list",
    data: { list: data, total : data.length },
  };
};

exports.add = async (body) => {
    if(body.name && body.price && body.stock){
        const productData = {
                name: body.name,
                price: body.price,
                stock: body.stock,
                expiredAt: new Date(body.expiredAt)
            };  
                
        const createdProduct = await Product.create(productData);
        return {
            success: true,
            code: 200,
            message: "success add product",
            data: createdProduct
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

    if(body.id!=null && body.name!=null && body.stock!=null && body.price!=null && body.expiredAt!=null){

        const existingProduct = await Product.findOne({
                    id : body.id
                });
        
        if(existingProduct){

            await Product.update({
                      name : body.name,
                      stock: body.stock,
                      price: body.price,
                      expiredAt: body.expiredAt
                  },{
                      id: body.id
                  }, trx);
            await trx.commit();
            return {
                success: true,
                code: 200,
                message: "update product success"
            }

        }else{
            return {
                success: false,
                code: 500,
                message: "no product exist"
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
        const existingProduct = await Product.findOne({
                    id : body.id
                });
        
        if(existingProduct){
            await Product.delete({
                id : body.id
            })
            await trx.commit();
            return {
                success: true,
                code: 200,
                message: "Hapus product success"
            }

        }else{
            return {
                success: false,
                code: 500,
                message: "no product exist"
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
