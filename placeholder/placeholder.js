/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 13-5-29
 * Time: 下午5:31
 * To change this template use File | Settings | File Templates.
 */
//实现placeholder，主要是为了支持input，html结构必须保持一致
(function($){
    //获取value值
    function getVal(el){
        var _el = el;
        return _el.val();
    }
    //获取placeholder值
    function getPlaceHolder(el){
        var _el = el;
        return _el.attr("placeholder");
    }
    //创建对象
    function PlaceHolder(el,cn){
        this.el = el;
        this.cn = cn;
    }
    $.extend(
        PlaceHolder.prototype,{

            createLabel:function(el){
                var _val = getVal($(el));
                if(_val ==""){
                    var pl = getPlaceHolder(el);
                    var LABEL = "<label class='J_label_place'>" + pl + "</label>";
                    $(el).parent(".place-ct").prepend(LABEL);
                }

            },
            inputFocused:function(el){
                $(el.target).parent().children("label").hide();
            },
            inputBlurred:function(el){
                var _val = getVal($(el.target));
                if(_val ==""){
                    $(el.target).parent().children("label").show();
                }else{
                    $(el.target).parent().children("label").hide();
                }
            },
            inits:function(){
                var self = this;
                var el = $(self.el);
                var cn = self.cn;
                el.focus(self.inputFocused);
                el.blur(self.inputBlurred);
                el.each(function(index, element){
                    self.createLabel($(element));
                });
                $(document).delegate(".J_label_place","click",function(ev){
                    var el = $(ev.target);
                    $(el).parent(".place-ct").children(cn).trigger("focus");
                });
            }
        }
    );
    $.PlaceHolder = PlaceHolder;
})(jQuery);

