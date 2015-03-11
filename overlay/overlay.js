/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 13-5-29
 * Time: 下午2:27
 * To change this template use File | Settings | File Templates.
 */

//浮层组件
(function ($,_mask) {
    var con_out = -9999;
    var ov_html =
        '<div  class="ov-ct" style="left: -9999px;top:-9999px; z-index: 9999">' +
            '<a class="J_ov_close ov-close" href="javascript:void(0);">关闭</a>' +
        '</div>';
    function overlay(config){
        var defaultConfig = {
            el: "",           //浮层元素
            elCls:"J_ov_ct",  //根元素样式
            ovEl:"",          //浮层内部元素
            trigger: "",      //触发器
            triggerType: "",  //触发类型
            width: "",        //浮层宽度
            height: "",       //浮层高度
            mask: true,       //遮罩层
            offset:['cc','cc'],                //相对于触发器的偏移坐标
            offsetType:"fixed"         //定位方式  fixed  absolute
        };
        this.setting =  $.extend(defaultConfig, config || {});
        this.exist = false;
    }

    $.extend(overlay.prototype,{
        /**
         * 创建浮层
         */
        createOv:function(){
            var self = this;
            if(self.exist == false){
                var _elcls = self.setting.elCls;
                $(ov_html).addClass(_elcls).prepend($(self.setting.el).html()).appendTo($("body"));
                if(self.setting.mask){
                    _mask.show();
                }
                self.fixOv();
                self.exist = true;
            }
        },

        /**
         * 浮层居中的坐标
         * @returns {Array} 返回居中坐标
         */
        getCenter:function(){
            var self = this;
            var _clientHeight = document.documentElement.clientHeight;
            var _clientWidth =getDocWidth();
            var setting = self.setting;
            var _width = setting.width;
            var _height = setting.height;
            var _dom = $(document);
            var _left =_clientWidth/2 - _width/2 + _dom.scrollLeft();
            var _top =  _clientHeight/2 - _height/2 ;
            return [_left,_top];
        },

        //浮层的定位
        fixOv:function(){
            var self = this, offset = self.setting.offset;
            if(offset[0] === "cc" && offset[1] === "cc"){
                var _point = self.getCenter();
                self.fixEl(_point[0],_point[1]);
            }
        },
        //根据浮层，定位元素
        fixEl:function(x,y){
            var self = this;
            $("." + self.setting.elCls).css({
                left:x+"px",
                top:y+"px"
            })
        },
        //浮层的显示
        show:function(){
            var self = this;
            if(self.exist == false){
                self.createOv();
            }
            if(self.setting.mask){
                _mask.show();
            }
            self.fixOv();
        },

        //浮层的消失
        hide:function(){
            var self = this;
            if(self.setting.mask){
                _mask.hide();
            }
            self.fixEl(con_out,con_out);
        }
    });

    //获取页面的宽度
    var getDocWidth = function(){
        var doc_el = document.documentElement;
        return Math.max(
            document.body.scrollWidth,doc_el.scrollWidth,doc_el.clientWidth
        );
    };
    //获取页面的高度
    var getDocHeight = function(){
        var doc_el = document.documentElement;
        return Math.max(
            document.body.scrollHeight,doc_el.scrollHeight,doc_el.clientHeight
        );
    }
    $.overlay = overlay;
})(jQuery,new $.mask());