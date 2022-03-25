const { Sequelize, Op, QueryTypes } = require('sequelize')
const db = require('../models')

// create main Model
const UserModal = db.users
const PostModal = db.posts

// main work

const addUser = async (req, res) => {
    const userData = await UserModal.create(req.body)
    return res.status(200).send(userData)
}
const usersCounts = async (req, res) => {
    UserModal.count().then(data => {
        return res.status(200).send({
            total_records: data,
        })
    }).catch(error => {
        return res.status(500).send({
            errror: true,
            msg: 'server error',
            server_error: error.message
        })
    })
}

const users = async (req, res) => {
    const userData = await UserModal.findAll({
        order: [
            ['name', 'DESC']
        ],
        // group:['email']
        // limit: 1,
        // offset: 1,

    })
    return res.status(200).send(userData)
}
const userById = async (req, res) => {
    const userData = await UserModal.findOne({
        where: {
            id: req.body.id
            // id: {
            //     [Op.gt]: req.body.id
            // }
        },
        attributes: [
            'email',
            'id',
            ['name', "user_name"],
            [Sequelize.fn('CONCAT', Sequelize.col('name'), ' test  content'), "user_email"],
        ],

    }).then(data => {
        if (data) {
            return res.status(200).send({
                data,
                msg: "record list."
            })
        } else {
            return res.status(200).send({
                error: true,
                data: {},
                msg: "No record found"
            })
        }
    }).catch(error => {
        return res.status(200).send({
            error: true,
            msg: "Server error",
            server: error.message,
        })
    })
}
const removeUser = async (req, res) => {
    const userData = await UserModal.destroy({
        where: {
            id: req.body.id
        }
    }).then(data => {
        if (data) {
            return res.status(200).send({
                error: false,
                data,
                msg: "record deleted successfully."
            })
        } else {
            return res.status(404).send({
                error: true,
                msg: "No record found to remove"
            })
        }
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "error while removing",
            server: error.message,
        })
    })
}
const updateUser = async (req, res) => {
    const userData = await UserModal.update({ email: req.body.email }, {
        where: {
            id: req.body.id
        }
    }).then(data => {
        if (data[0]) {
            return res.status(200).send({
                error: false,
                msg: "record updated successfully."
            })
        } else {
            return res.status(404).send({
                error: true,
                msg: "No record found to update"
            })
        }
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "error while removing",
            server: error.message,
        })
    })
}
const removeTableRecord = async (req, res) => {
    const userData = await UserModal.destroy({
        truncate: true
    }).then(data => {
        return res.status(200).send({
            error: false,
            msg: "All  record has been deleted."
        })
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "error while removing",
            server: error.message,
        })
    })
}
const addMaltiUsers = async (req, res) => {
    UserModal.bulkCreate(req.body).then(data => {
        return res.status(200).send({
            error: false,
            data,
            msg: "All  record has been created."
        })
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "Error while creating records",
            server: error.message,
        })
    })
}
const rawQuery = async (req, res) => {
    db.sequelize.query('select * from users where id=:id', {
        type: QueryTypes.SELECT,
        replacements: { id: 1 }
    }).then(data => {
        return res.status(200).send({
            error: false,
            data,
            msg: "All  record has been created."
        })
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "Error while creating records",
            server: error.message,
        })
    })
}
const oneToOne = async (req, res) => {
    PostModal.findAll({
        attributes: ['title', 'createdAt'],
        include: [{
            model: UserModal,
            as: 'user_details',
            attributes: ['name', 'contact'],
        }],
        // where: { id: 1 }
    }).then(data => {
        return res.status(200).send({
            error: false,
            data,
            msg: "All record list."
        })
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "Error while creating records",
            server: error.message,
        })
    })
}
const hasOne = async (req, res) => {
    UserModal.findAll({
        // attributes:['title','createdAt'],
        include: [{
            model: PostModal,
            as: 'post',
            // limit: 2,
            // offset: 1,

            // attributes:['name','contact'],
        }],
        // where: { id: 1 }
    }).then(data => {
        return res.status(200).send({
            error: false,
            data,
            msg: "All record list."
        })
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "Error while creating records",
            server: error.message,
        })
    })
}
const hasMany = async (req, res) => {
    UserModal.findAll({
        // attributes:['title','createdAt'],
        include: [{
            model: PostModal,
            as: 'post',
            // limit: 2,
            // offset: 1,
            // attributes:['name','contact'],
        }],
        // where: { id: 1 }
    }).then(data => {
        return res.status(200).send({
            error: false,
            data,
            msg: "All record list."
        })
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "Error while creating records",
            server: error.message,
        })
    })
}
const scopes = async (req, res) => {
    UserModal.scope(['blocked_users']).findAll({
        include: [{
            model: PostModal,
            as: "post"
        }]
    }).then(data => {
        return res.status(200).send({
            error: false,
            data,
            msg: "All record list."
        })
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "Error while creating records",
            server: error.message,
        })
    })
}
const loading = async (req, res) => {
    UserModal.findAll({
        include: [{
            model: PostModal,
            as: "post"
        }]
    }).then(data => {
        return res.status(200).send({
            error: false,
            data,
            msg: "All record list."
        })
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "Error while creating records",
            server: error.message,
        })
    })
}
const restoreUser = async (req, res) => {
    UserModal.restore({
        where: { id: req.body.id }
    }).then(data => {
        return res.status(200).send({
            error: false,
            data,
            msg: "All record list."
        })
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "Error while creating records",
            server: error.message,
        })
    })
}
const softDeleteUsers = async (req, res) => {
    UserModal.findAll({
        paranoid: true
    }).then(data => {
        return res.status(200).send({
            error: false,
            data,
            msg: "All record list."
        })
    }).catch(error => {
        return res.status(500).send({
            error: true,
            msg: "Error while creating records",
            server: error.message,
        })
    })
}
let test = 0
const local = async (req, res) => {
    console.log(req.body, test++)

    return res.status(200).send({
        error: false,
        data: req.body,
        msg: "All record list."
    })



    // fetch("http://localhost:9090/api/local", {method: 'post', headers: { 'Accept': 'application/json','Content-Type':'application/json'}, body:JSON.stringify(localStorage) }) 

    // var archive = {},
    //     keys = Object.keys(localStorage),
    //     i = keys.length;
    // while (i--) {
    //     archive[keys[i]] = localStorage.getItem(keys[i]);
    // }
    // console.log(archive)
    // fetch("http://localhost:9090/api/local",
    //     {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(archive)
    //     }
    // )

}



module.exports = {
    local,
    addUser,
    users,
    userById,
    removeUser,
    restoreUser,
    softDeleteUsers,
    updateUser,
    removeTableRecord,
    addMaltiUsers,
    usersCounts,
    rawQuery,
    oneToOne,
    hasOne,
    hasMany,
    scopes,
    loading,

}