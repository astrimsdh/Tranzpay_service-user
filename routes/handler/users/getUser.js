const {User} = require('../../../models');

module.exports = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id, {
        attributes: ['id', 'nama_usaha','nama_pemilik', 'email', 'no_hp', 'role', 'avatar', 'alamat', 'saldo']
    });
    if(!user){
        return res.status(404).json({
            status: 'error',
            message: 'User tidak ditemukkan!'
        });
    }

    return res.json({
        status: 'success',
        data: user
    });
}