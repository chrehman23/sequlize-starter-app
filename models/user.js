module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.TEXT
        },
        block: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    }, {
        paranoid: true,
        deletedAt: 'soft_delete'
    })

    return User

}