var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var dbConfig = require('../db/dbconfig');
var userSQL = require('../db/usersql');
var argon2 = require('argon2');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/home');
});
router.get('/home', function (req, res, next) {
    res.render('home');
});

// 使用DBConfig.js的配置信息创建一个MySql链接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据

var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

router.get('/login', function (req, res, next) {
    res.render('login');
}).post('/login', function (req, res) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        var param = req.body || req.query || req.params;
        var user_email = param.login_email;
        var user_password = param.login_pwd;
        var _res = res;
        connection.query(userSQL.getUserByEmail, user_email, function (err, result1) {
            var returnRes;
            if (result1.length !== 0) {
                var encrypted_password = result1[0].user_password;
                argon2.verify(encrypted_password, user_password).then(match => {
                    if (match) {
                        returnRes = {
                            code: 200,
                            msg: "succeed"
                        };
                    } else {
                        returnRes = {
                            code: -1,
                            msg: "请输入正确的账号密码"
                        };
                    }
                    responseJSON(_res, returnRes);
                }).catch(err => {
                    console.log(err)
                    returnRes = {
                        code: -1,
                        msg: err
                    };
                    responseJSON(_res, returnRes);
                });
            } else {
                console.log(result1);
                returnRes = {
                    code: -1,
                    msg: "账号不存在，请先注册"
                };
                responseJSON(_res, returnRes);
            }
        });
        connection.release();
    });
});
router.get('/register', function (req, res, next) {
    res.render('register');
}).post('/register', function (req, res) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        var param = req.body || req.query || req.params;
        var user_name = param.register_name;
        var user_email = param.register_email;
        var user_password = param.register_pwd;
        var _res = res;
        connection.query(userSQL.getUserByName, user_name, function (err, result1) {
            if (result1.length === 0) {
                connection.query(userSQL.getUserByEmail, user_email, function (err, result2) {
                    if (result2.length === 0) {
                        var hash_pwd;
                        argon2.hash(user_password, {
                            type: argon2.argon2i,
                            hashLength: 8, // 哈希函数输出的字节长度(请注意，生成的哈希是使用Base64编码的，因此长度将增加约1/3)
                            timeCost: 3, // 时间成本是哈希函数使用的通过次数（迭代次数）
                            memoryCost: 2 ** 16, // 默认 4096（单位 KB，即 4MB）
                            parallelism: 1, //用于计算哈希值的线程数量。每个线程都有一个具有memoryCost大小的内存池
                        }).then(hash => {
                            hash_pwd = hash;
                            console.log(hash);
                            connection.query(userSQL.insert, [user_name, user_email, hash_pwd], function (err, result) {
                                var returnRes;
                                if (!err) {
                                    returnRes = {
                                        code: 200,
                                        msg: 'succeed'
                                    };
                                } else {
                                    returnRes = {
                                        code: -1,
                                        msg: err
                                    };
                                }
                                responseJSON(_res, returnRes)
                            });
                        });
                    } else {
                        console.log(result2);
                        var returnRes;
                        returnRes = {
                            code: -1,
                            msg: "邮箱已存在"
                        };
                        responseJSON(_res, returnRes);
                    }
                });
            } else {
                console.log(result1);
                var returnRes;
                returnRes = {
                    code: -1,
                    msg: "用户名已存在"
                };
                responseJSON(_res, returnRes);
            }
        });
        connection.release();
    });

});


router.get('/subpage', function (req, res, next) {
    res.render('subpage');
});
router.get('/watermark', function (req, res, next) {
    res.render('watermark');
});


module.exports = router;
