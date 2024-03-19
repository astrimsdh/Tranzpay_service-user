const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6'
    }

    const validate = v.validate(req.body, schema);
    if(validate.length){
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const user = await User.findOne({
        where: {email: req.body.email}
    });

    if(!user){
        return res.status(404).json({
            status: 'error', 
            message: 'User tidak terdaftar!'
        });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword){
        return res.status(404).json({
            status: 'error', 
            message: 'Password salah!'
        });
    }

    return res.json({
        status: 'success',
        data: {
            id: user.id,
            nama_usaha: user.namaUsaha,
            nama_pemilik: user.namaPemilik,
            email: user.email,
            no_hp: user.noHp,
            role: user.role,
            avatar: user.avatar,
            saldo: user.saldo,
            alamat: user.alamat
        }
    });
}