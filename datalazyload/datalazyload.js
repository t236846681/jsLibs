/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 13-6-18
 * Time: 下午2:13
 * To change this template use File | Settings | File Templates.
 */

//懒加载组件
(function($){
    var AREA_DATA_CLS = "jq-datalazyload";
    function Datalazyload(config){
        var defaultConfig = {

        };
        this.setting = $.extend(defaultConfig,config || {});
    }

    $.extend(
        Datalazyload.prototype,{
            //初始化,生成nav元素，绑定事件
            init:function(){
                var self = this;
                self._getAreaList();
                for(var i = 0;i<self.areaList.length;i++){
                    self._loadAreaItem(self.areaList[i]);
                }

                $(window).bind("scroll resize",function(){
                    self._getAreaList();
                    for(var i = 0;i<self.areaList.length;i++){
                        self._loadAreaItem(self.areaList[i]);
                    }
                });
            },
            //获取需要加载的集合
            _getAreaList:function(){
                var self = this,areaList = [];
                areaList = $("textarea").filter("." + AREA_DATA_CLS);
                self.areaList = areaList;
                if(areaList.length == 0){
                    $(window).unbind("scroll resize")
                }
            },
            //textarea的内容替换在div中，然后隐藏
            _replaceArea:function(area){
                var self = this, _area = $(area),_html = _area.val();
                _area.removeClass(AREA_DATA_CLS);
                $(_html).insertBefore(_area);
                _area.hide();
            }
            ,
            _loadAreaItem:function(area){
                var self = this, top, viewHeight = $(window).height(),scrollTop = $(window).scrollTop();
                if($(area).offset().top != 0){
                    top = $(area).offset().top;
                }else{
                    top = $(area).parent().offset().top;
                }

                if(top<= viewHeight + scrollTop){
                    self._replaceArea(area)
                }

            }
        }

    );

    $.Datalazyload = Datalazyload;
})(jQuery);