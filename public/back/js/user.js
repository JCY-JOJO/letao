



$(function(){
    var currentId; // 用户id
    var isDelete; // 当前需要修改用户的状态
  
    var currentPage = 1;
    var pageSize = 5;
    render();

    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                var htmlstr = template('usersj' ,info);
                $('tbody').html(htmlstr);


                // 分页插件使用 
                // 分页初始 
                $('#paginator').bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage:info.page,
                    //总页数
                    totalPages:Math.ceil(info.total / info.size),
                    // 添加页码点击事件
                    onPageClicked:function(a,b,c,page){
                        // 更新到page页
                        currentPage = page;
                        // 重新调用 render渲染
                        render();

                    }
                })


            }
        })
    }


    // 2 启用禁用按钮事件
    $('tbody').on('click','.btn' , function(){
        // 弹出模态框
        $('#userModal').modal('show');

        // 获取当前用户id
        currentId = $(this).parent().data('id');

        // 获取将用户改成什么状态
        // 禁用按钮 ? 禁用状态 0 : 启用状态 1
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

    });


    // 3 点击模态框确认按钮 发送请求 修改用户状态
    $('#submitBtn').click(function(){

        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:currentId,
                isDelete:isDelete,
            },
            dataType:'json',
            success:function(info){
                // success 成功
                if(info.success){
                    //关闭模态框
                    $('#userModal').modal('hide');
                    // 重新渲染
                    render();
                }
            }
        })
    })




})