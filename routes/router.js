var mongoose = require('mongoose');
var userModel = require('../db/userschema')
var articleModel = require('../db/articleschema')

// 首页
exports.index = function (req, res, next) {
    var loginUser = req.session.loginUser;
    
    res.render('index',{
        'user':loginUser
    });
}
// 登录
exports.login = function (req, res, next) {
    res.render('HTML/user/login');
}
// 注册
exports.register = function (req, res, next) {
    res.render('HTML/user/register');
}
// 写文章
exports.wrtie = function (req, res, next) {
    var loginUser = req.session.loginUser;

    if (!loginUser) {
        res.redirect('/login');
        return false
    }
    res.render('HTML/write',{
        'user':loginUser
    });
}
exports.updata = function (req, res, next) {
    let _id = req.body.id 
    var loginUser = req.session.loginUser;

    if (!loginUser) {
        res.redirect('/login');
        return false
    }
    res.render('HTML/user/updata',{
        'user':loginUser
    });
}
// 文章列表页
exports.article = function (req, res, next) {
    res.render('HTML/article');
}
// 文章详情页
exports.paper = function (req, res, next) {
    var id = req.query.id;

    var _id = mongoose.Types.ObjectId(id);
    articleModel.find({
        _id: _id
    }, function (err, result) {
        res.render('HTML/paper', {
            "title": result[0].title,
            "authorAvatar": result[0].authorAvatar,
            "body": result[0].body,
            "time": result[0].time,
            "author": result[0].author,
        });
    });
}
// 主题活动页
exports.topic = function (req, res, next) {
    var loginUser = req.session.loginUser;

    if (!loginUser) {
        res.redirect('/login');
        return false
    }
    res.render('HTML/activity/topic',{
        'user':loginUser
    });
}
// 常规活动页
exports.regular = function (req, res, next) {
    var loginUser = req.session.loginUser;

    if (!loginUser) {
        res.redirect('/login');
        return false
    }
    res.render('HTML/activity/regular',{
        'user':loginUser
    });
}
// 个人中心
exports.user = function (req, res, next) {
    var loginUser = req.session.loginUser;
    var userinfo = ''
    if (!loginUser) {
        res.redirect('/login');
        return false
    } else {
        userModel.find({
            username: loginUser
        }, function (err, result) {
            if(err){
                return false
            }            
            res.render('HTML/user/user', {
                "user": result[0].username,
                "avatar": result[0].avatar,
                "email": result[0].email,
            });
        });
    }
}
// 栏目介绍页
exports.introduction = function (req, res, next) {
    res.render('HTML/footer/introduction');
}
// 历史页
exports.history = function (req, res, next) {
    res.render('HTML/footer/history');
}
// team页
exports.team = function (req, res, next) {
    res.render('HTML/footer/team');
}
// 友链页
exports.links = function (req, res, next) {
    res.render('HTML/footer/links');
}