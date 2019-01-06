

$(function(){

    // 1 表单校验配置
    // 校验要求:
    // *        (1) 用户名不能为空, 长度为2-6位
    // *        (2) 密码不能为空, 长度为6-12位

    $('#form').bootstrapValidator({

        // 配置图标
        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },

        // 配置教研字段  注意点: 要先给校验的input配置name
        fields: {
            username:{
                // 校验规则
                validators:{
                    // 非空校验
                    notEmpty:{
                        message:"用户名不能为空"
                    },

                    // 长度校验
                    stringLength:{
                        min:2,
                        max:6,
                        message:"用户名长度必须是 2-6 位"
                    },

                    // callback 专门用于配置回调的提示
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },

            password:{
                //校验规则
                validators:{
                    // 非空校验
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    
                    // 长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须是 6-12 位"
                    },

                    // callback 专门用于配置回调的提示
                    callback:{
                        message:"密码错误"
                    }
                }
            }

            // password: {
            //     // 校验规则
            //     validators: {
            //       // 非空校验
            //       notEmpty: {
            //         message: "密码不能为空"
            //       },
            //       // 长度校验
            //       stringLength: {
            //         min: 6,
            //         max: 12,
            //         message: "密码长度必须是 6-12 位"
            //       },
            //       callback: {
            //         message: "密码错误"
            //       }
            //     }
            //   }
        }

    })


    // 注册表单验证成功事件
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑

        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            // jquery中提供了一个serialize的方法,可以把表单中的有name属性的表单项的值,
            // 直接拼接成一个键值对的字符串,返回出来. 对应的jquery中ajax方法的data属性,
            // 除了可以传对象,也可以传一个拼接好的键值对的字符串
            data:$('#form').serialize(),
            dataType:'json',
            success:function(info){
                // 用户名错误
                if (info.error === 1000){
                    // 调用插件实例方法, 更新校验状态成失败, 提示用户
                    // updateStatus( field, status, validator );
                    // 参数1: 校验字段
                    // 参数2: 校验状态  NOT_VALIDATED, VALIDATING, INVALID or VALID
                    // 参数3: 校验规则, 配置用于显示 message 提示
                    $('#form').data("bootstrapValidator").updateStatus("username",'INVALID','callback')
                    return;
                }
                // 密码错误
                if(info.error === 1001){
                    $('#form').data("bootstrapValidator").updateStatus("password",'INVALID','callback')
                    return;
                }

                // 都正确跳转首页
                if(info.success) {
                    location.href = 'index.html';
                    return;
                }
            }
        })
    });


    // 3 重置功能
    // 默认 type="reset" 按钮, 只会重置表单内容
    // *    此时, 内容和校验状态都需要重置, 需要调用插件的实例方法
    // *
    // *    $('#form').data("bootstrapValidator") 创建插件实例
    // *    resetForm();     不传参, 只重置校验状态
    // *    resetForm(true); 传true, 内容和状态都重置
    
    $('[type="reset"]').click(function(){
        $('#form').data('bootstrapValidator').resetForm();
    })

    
})