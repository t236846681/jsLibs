/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 13-5-29
 * Time: 下午5:31
 * To change this template use File | Settings | File Templates.
 */

(function(){
    function mask(config){
        var defaultConfig = {
            opacity:"30",
            bgColor:"#000",
            zIndex:9998
        };
        this.setting = $.extend(defaultConfig, config || {});
        var br =$.browser;
        this.UAIe6 = br.msie && br.version < 7;
    }

    $.extend(mask.prototype,{
        //创建mask
        createMask : function () {
            var self = this;
            if(self.setting.self){
                setting.self.show();
            }else{
                //判断是否是ie6
                var isIE6 = self.UAIe6;
                //在body下生产mask div
                //在ie6的情况下，必须设置宽高
                var _dom = $(document), d_width = _dom.width(), d_height = document.body.clientHeight;
                var _ie_style = "",_iframe = "";
                //ie6 下最好和 mask 平行

                if(isIE6 == true){
                    _ie_style = "width=" + getDocWidth() + "px;" + "height:" + getDocHeight() + "px;";
                    _iframe = "<" + "iframe " +
                        "style='position:absolute;" +
                        "left:" + "0px" + ";" +
                        "top:" + "0px" + ";" +
                        "width:" + getDocWidth() + "px;" +
                        "height:" + getDocHeight() + "px;" +
                        "filter:alpha(opacity=0);" +
                        "z-index:-1;'/>";
                }
                self.setting.self = $('<div id="J_ov_mask" class="ov_mask" style="position:fixed;_position:absolute;left:0px;top:0px;width:100%;height:100%;'+_ie_style+ 'z-index:'+ self.setting.zIndex +';background-color: '+ self.setting.bgColor +';opacity:'+ self.setting.opacity/100 +';filter: alpha(opacity='+ self.setting.opacity +');">' + _iframe + '</div>');
                $("body").prepend(self.setting.self);
                if(isIE6 == true){
                    $(window).bind("resize",function(){
                        //mask存在并且显示，延时
                        resizeMask();
                    });
                }

            }
        },

        show: function(){
            var self = this;
            if(self.setting.self){
                self.setting.self.css({
                    width:getDocWidth() + "px",
                    height:getDocHeight() + "px"
                });
                self.setting.self.show();
                //判断是否是ie6
                var isIE6 = $.browser.msie && $.browser.version < 7;
                if(isIE6 == true){
                    $(window).bind("resize scroll",function(){
                        //mask存在并且显示，延时
                        resizeMask();
                    });
                }
            }else{
                self.createMask();
            }
        },

        hide :function(){
            var self = this;
            if(self.setting.self){
                self.setting.self.hide();
                //判断是否是ie6
                var isIE6 = $.browser.msie && $.browser.version < 7;
                if(isIE6 == true){
                    $(window).unbind("resize scroll");
                }
            }else{
                createMask();
                self.setting.self.hide();
            }
        }
    });

//    $.masked = mask


//延迟fn方法，在time毫秒之后，才执行该方法，主要是为了性能。返回值是闭包。
var throttle = function(fn,ms,context){
    ms = ms || 150;
    if(ms === -1){
        return (function(){
            fn.apply(context || this,arguments);
        });
    }
    //获取当前时间毫秒
    var last = new Date().getTime();
    return (function (){
        var now = new Date().getTime();
        if (now - last >= ms){
            last = now;
            fn.apply(context || this,arguments);
        }
    })
};

//重置mask，主要是针对ie6
var resizeMask =throttle(function(){
        $("#J_ov_mask").css({
            width:getDocWidth() + "px",
            height:getDocHeight() + "px"
        })
},50,this);


//获取页面的宽度
var getDocWidth = function(){
    var doc_el = document.documentElement;
    return Math.max(
        document.body.scrollWidth,doc_el.scrollWidth,doc_el.clientWidth
    );
};

//获取页面的高度
var getDocHeight =function(){
    var doc_el = document.documentElement;
    return Math.max(
        document.body.scrollHeight,doc_el.scrollHeight,doc_el.clientHeight
    );
}

$.mask = mask;
})(jQuery);