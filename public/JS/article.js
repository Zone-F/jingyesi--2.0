var article = {
    // 初始化
    init: function () {
        var me = this;
        me.page = 1 // 文章分页页数
        me.target()
        me.created()
        me.render()
    },
    // 获取目标节点
    target: function () {
        var me = this;
        me.next = $('.more')
        me.warp = $('.article-warp')
        me.box = $('.article-box')
    },
    // 页面初始化
    created: function () {
        var me = this;
        // 获取文章数据
        $.ajax({
            url: "http://127.0.0.1:3000/article/getarticle",
            data: {
                page: 1
            },
            success: function (result) {
                var data = result,
                    dataLength = data.length

                me.warp.html("")
                for (var i = 0; i < dataLength; i++) {
                    me.warp.append('<div class="article-box"><a  href="/paper?id='+data[i]._id +'"><div class="article-info">' +
                        '<div class="author-photo"><img src="/img/avatar/' + data[i].authorAvatar + '" alt=""></div>' +
                        ' <div class="article-title" style="margin: 0 30px"><h3>' + data[i].title + '</h3></div>' +
                        '<div class="author-name"><div>' + data[i].author + '</div><div>' + data[i].time + '</div></div></div>' +
                        '<div class="article-body">' + data[i].body.substring(0, 80) + '...</div></a></div>')
                }
            }
        });
    },
    // 事件绑定
    render: function () {
        var me = this;
        // 点击下一页
        me.next.click(function () {
            me.page += 1

            $.ajax({
                url: "http://127.0.0.1:3000/article/getarticle",
                data: {
                    page: me.page
                },
                success: function (result) {
                    var data = result,
                        dataLength = data.length
                    if (dataLength === 0) {
                        me.warp.append('<div style="text-alight:center;">已经是最后一页了！！！</div>')
                        me.next.attr("disabled", true);
                        me.next.css("pointer-events", "none");
                        return false
                    }
                    me.warp.append('<div class="theme-bg-color logo-icon" style="position: relative;width:50px;height:50px;margin: 100px auto;border-radius: 30%;margin-bottom:100px;"> ' +
                        '<span style="position:absolute;top: 35%;left: 35%;">' + me.page + '</span> </div>')

                    for (var i = 0; i < dataLength; i++) {
                        me.warp.append('<div class="article-box"><a  href="/paper?id='+data[i]._id +'"><div class="article-info">' +
                            '<div class="author-photo"><img src="/img/avatar/' + data[i].authorAvatar + '" alt=""></div>' +
                            ' <div class="article-title" style="margin: 0 30px"><h3>' + data[i].title + '</h3></div>' +
                            '<div class="author-name"><div>' + data[i].author + '</div><div>' + data[i].time + '</div></div></div>' +
                            '<div class="article-body">' + data[i].body.substring(0, 80) + '...</div></a></div>')
                    }
                }
            });
        })
    }
}
$(function () {
    article.init()
})