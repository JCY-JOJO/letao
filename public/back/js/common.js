


// 添加进度条效果:
// 1. 在第一个ajax开始发送时, 开启进度条
// 2. 在所有的ajax完成时, 结束进度条

// ajax 全局事件
// .ajaxComplete()   每个ajax完成时, 都会调用  (不管成功还是失败都调用)
// .ajaxSuccess()    每个成功的ajax, 都会调用
// .ajaxError()      每个失败的ajax, 都会调用
// .ajaxSend()       每个ajax准备发送时, 调用

// .ajaxStart()      第一个ajax发送时, 调用   (开启进度条)
// .ajaxStop()       当所有的ajax都完成时, 调用  (结束进度条)

$(document).ajaxStart(function(){

    // 开启进度条
    NProgress.start();
})

$(document).ajaxStop(function(){
    // 模拟网络延迟
    setTimeout(function(){
        NProgress.done();
    },500)
})



// 入口函数 等待当前dom加载完成后 执行
$(function(){

    // 功能1 侧边栏导航切换
    $('.lt_aside .category').click(function(){

        // next() 下一个兄弟元素
        $(this).next().stop().slideToggle();
    })


    // 功能2 左边侧边栏切换功能
    $('.icon_menu').click(function(){
        $('.lt_aside').toggleClass('hidemenu')
        $('.lt_main').toggleClass('hidemenu')
        $('.lt_topbar').toggleClass('hidemenu')
    })

    
    // 功能3 退出功能

    $('#logoutBtn').click(function(){
        //发送ajax请求
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success: function(info){
                if(info.success){
                    location.href = 'login.html';
                }
            }

        })
    })
})

