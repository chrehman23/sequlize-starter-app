module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        user_id: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        block: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    })

    return Post
}