const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        nama_usaha: 'string|empty:false',
        nama_pemilik: 'string|empty:false',
        email: 'email|empty:false',
        no_hp: 'string|empty:false',
        pin: 'string|min:4|max:4',
        password: 'string|min:6',
        alamat: 'string|optional',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    } 

    const email = await User.findOne({
        where: {email: req.body.email}
    });

    const no_hp = await User.findOne({
        where: {no_hp: req.body.no_hp}
    });

    if(email){
        return res.status(409).json({
            status: 'error',
            message: 'email sudah terdaftar!'
        });
    }
    if(no_hp){
        return res.status(409).json({
            status: 'error',
            message: 'no hp sudah terdaftar!'
        });
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const pin = await bcrypt.hash(req.body.pin, 10);
    const data = {
        namaUsaha: req.body.nama_usaha,
        namaPemilik: req.body.nama_pemilik,
        email: req.body.email,
        noHp: req.body.no_hp,
        role: 'member',
        password,
        pin, 
        alamat: req.body.alamat,
        saldo: 0

    }

    const createdUser = await User.create(data);
    return res.json({
        status: "success",
        data: {
            id: createdUser.id
        }
    })
    

    
}