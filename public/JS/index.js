var index = {
    // 初始化
    init: function () {
        var me = this
        me.target()
        me.created()
        me.render()
    },
    // 相关DOM节点存储
    target: function () {
        var me = this;
        me.barItem = $('.bar-item') // banner切换按钮 
        me.contentWarp = $('#content-box') //文章内容块
    },
    // 页面初始化数据获取
    created: function () {
        var me = this;
        // 获取文章数据
        $.ajax({
            url: "http://127.0.0.1:3000/index/getarticle",
            success: function (result) {
                var articleData = result,
                    dataLength = articleData.length
                //文章块渲染        
                me.contentWarp.html("")
                console.log(articleData);

                for (var i = 0; i < dataLength; i++) {
                    me.contentWarp.append('<a class="content-item" href="/paper?id='+articleData[i]._id +'" target="_blank">' +
                        '<div class="box" style="display:flex;align-items:center;"><img class="author-photo" src="/img/avatar/'+ articleData[i].authorAvatar +'" />' +
                        '<div class="author-name">' + articleData[i].author + '</div> ' +
                        '<div class="author-name" style="padding-left: 10px;">' + articleData[i].time + '</div></div>' +
                        '<div class="content-title">' + articleData[i].title + '</div>' +
                        '<div class="content-body">' + articleData[i].body.substring(0, 200) + '...</div></a>')
                }
            }
        });
    },
    // 事件绑定
    render: function () {
        var me = this
        // 切换banner事件
        me.barItem.click(function () {
            $(this).attr('class', "bar-item bar-cur").siblings().attr('class', "bar-item")
            $(".banner a").eq($(this).attr("index")).fadeIn(1800).siblings().fadeOut();
        })
    }
}
$(function () {
    index.init();
});