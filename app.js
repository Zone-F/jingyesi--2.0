var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var ejs = require('ejs');
var session = require('express-session');

// 自己的包
var myRouter = require('./routes/router'),
    myIndex = require('./routes/index'), 
    myActivity = require('./routes/Activity'), 
    myTopic = require('./routes/Topic'), 
    myUser = require('./routes/User'); 

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
const fileUpload = require('express-fileupload');
app.use(fileUpload());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 86400000, // 设置 session 的有效时间，单位毫秒
    },
}));
/***********
 * 前端展示页
 * *********/
app.get('/',myRouter.index)
app.get('/login', myRouter.login);
app.get('/register', myRouter.register);
app.get('/article', myRouter.article);
app.get('/paper', myRouter.paper);
app.get('/topic', myRouter.topic);
app.get('/regular', myRouter.regular);
app.get('/write', myRouter.wrtie);
app.get('/updata', myRouter.updata);
app.get('/user', myRouter.user);
// 页脚相关
app.get('/links', myRouter.links);
app.get('/introduction', myRouter.introduction);
app.get('/history', myRouter.history);

// 涉及数据交互

// 文章渲染
app.get('/index/getarticle', myIndex.getIndexArticle);
app.get('/article/getarticle', myIndex.getArticle);
app.post('/getbyid', myIndex.getArticleById);
// 登录/注册
app.post('/userlogin', myIndex.doLogin);
app.post('/userregister', myIndex.doRegister);
app.get('/getuser', myIndex.getUser);
app.post('/newarticle', myUser.newArticle); // 新文章
app.post('/article/updata', myUser.updateArticle); // 修改文章

/***********
 * 个人中心api
 * *********/
app.post('/user/changeavatar',  function(req, res,next) {
    let avatar = req.files.avatar
    let user = req.session.loginUser
    // Use the mv() method to place the file somewhere on your server
    avatar.mv('public/img/avatar/'+user+'.jpg', function(err) {
      if (err)
        return res.status(500).send(err);
  
    //    res.send('File uploaded!');
       res.status(200).json({ msg: '头像更改成功' })

    });
  })
  app.get('/user/gettotle',myUser.getArticleTotle)  //获取文章总数
  app.post('/user/getarticle',myUser.getArticle)  //获取文章
  app.post('/user/newarticle',myUser.newArticle)  //提交文章
  app.post('/user/changeuser',myUser.changeUsername)  //修改用户名
  app.post('/user/changeemail',myUser.changeEmail)  //修改用户邮箱
  app.post('/user/updata',myUser.updateArticle)  //修改文章
  app.post('/user/delete',myUser.deleteArticle)  //删除文章
/***********
 * 常规活动api
 * *********/
app.post('/regular/newact',myActivity.newAct)
app.post('/regular/getactdata',myActivity.getActData)
app.post('/regular/userjoin',myActivity.userJoin)
app.post('/regular/newbooklist',myActivity.newBookList)
app.post('/regular/subarticle',myActivity.subArticle)
app.post('/regular/getold',myActivity.getOld)
app.post('/regular/gettotal',myActivity.getOldTotal)
app.post('/regular/changedate',myActivity.changeDate)
/***********
 * 主题阅读api
 * *********/
app.post('/topic/new',myTopic.newTopic)
app.post('/topic/getdata',myTopic.getTopiocData)
app.post('/topic/userjoin',myTopic.newTopicUser)
app.post('/topic/addbook',myTopic.addBook)
app.post('/topic/newlist',myTopic.newTopicList)
app.post('/topic/newarticle',myTopic.subTopicArticle)
app.post('/topic/getold',myTopic.getTopicOld)
app.post('/topic/changedate',myTopic.TopicChangeDate)
app.post('/topic/gettotal',myTopic.TopicOldTotal)



app.listen(3000, () => console.log('app listening on port 3000! http://127.0.0.1:3000'))