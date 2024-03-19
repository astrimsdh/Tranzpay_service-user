const {User} = require('../../../models');

module.exports = async (req, res) => {

    const userIds = req.query.user_ids || [];

    SqlOptions = {
        attributes: ['id', 'nama_usaha','nama_pemilik', 'email', 'no_hp', 'avatar', 'alamat', 'saldo']
    } 

    if(userIds.length){
        SqlOptions.where = {
            id: userIds
        }
    }
    const users = await User.findAll(SqlOptions);

    res.json({
        status: 'success',
        data: users
    })
}