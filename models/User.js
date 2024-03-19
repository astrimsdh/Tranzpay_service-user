module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        namaUsaha: {
            field: 'nama_usaha',
            type: DataTypes.STRING,
            allowNull: false
        },
        namaPemilik: {
            field: 'nama_pemilik',
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        noHp: {
            field: 'no_hp',
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'member'],
            allowNull: false,
            defaultValue: 'member'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        saldo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: true
    });

    return User;
}