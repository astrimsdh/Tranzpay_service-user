
const {User} = require('../../../models');

module.exports = async (req, res) => {
    const userId = req.body.user_id;
    const amount = req.body.amount;
    const user = await User.findByPk(userId);
    if(!user){
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }
    
    const saldo = parseInt(amount)

    await user.update({
        saldo
    });

    return res.json({
        status: 'success',
        data: user,
    });
}