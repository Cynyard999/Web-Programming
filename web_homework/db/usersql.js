// mysql操作
var UserSQL = {
    insert: 'INSERT INTO user_tbl(user_name,user_email,user_password) VALUES(?,?,?)', // 插入数据
    drop: 'DROP TABLE user_tbl', // 删除表中所有的数据
    queryAll: 'SELECT * FROM user_tbl', // 查找表中所有数据
    getUserByEmailAndPWD: 'SELECT * FROM user_tbl WHERE user_email =? and  user_password = ?',
    getUserByEmail: 'SELECT * FROM user_tbl WHERE user_email =?',
    getUserByName: 'SELECT * FROM user_tbl WHERE user_name =?',
};

module.exports = UserSQL;