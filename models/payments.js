module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("paymentsq", {
        user_id: {
            type: DataTypes.INTEGER
        },
        post_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        payment_id: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    }, {
        tableName: "paymentsq",
        underscored: true
    })

    return Post
}