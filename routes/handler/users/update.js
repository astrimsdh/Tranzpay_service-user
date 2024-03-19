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
        avatar: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if(validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const id = req.params.id;
    const user = await User.findByPk(id);
    if(!user){
        return res.status(404).json({
            status: 'error',
            message: 'user tidak ditemukkan!'
        })
    }

    

    const email = req.body.email;
    if(email){
        const checkEmail = await User.findOne({
            where: {email}
        });

        if(checkEmail && email !== user.email){
            return res.status(409).json({
                status: 'error',
                message: 'email sudah terdaftar!'
            });
        }
    }

    const no_hp = req.body.no_hp;
    if(no_hp){
        const checkNoHp = await User.findOne({
            where: {no_hp}
        });

        if(checkNoHp && no_hp !== user.noHp){
            return res.status(409).json({
                status: 'error',
                message: 'email sudah terdaftar!'
            });
        }
    }

    

    const password = await bcrypt.hash(req.body.password, 10);
    const pin = await bcrypt.hash(req.body.pin, 10);
    const {
        nama_usaha, nama_pemilik, alamat, avatar
    } = req.body;

    await user.update({
        email,
        password,
        avatar,
        nama_usaha, 
        nama_pemilik,
        alamat,
        pin,
        no_hp
    });

    return res.json({
        status: 'success',
        data: {
            id: user.id,
            nama_usaha,
            nama_pemilik,
            email,
            no_hp,
            alamat,
            avatar
        }
    });
}