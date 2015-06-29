//轮播组件
(function($){
    var NAV = ".ss_switch_nav";
    var NAV_CONTENT = ".ss_switch_content"

    function SimpleSwitch(config){
        var defaultConfig = {
            el:"#J_switch",          //父元素
            autoplay:true,           //是否自动播放
            interval:5,              //轮播切换时间：默认5s
            hoverpause:true,          //houver,轮播是否停止
            effect:"",                 //scrollx\scrolly\fade
            easing:"swing",
            circle:true                //是否循环
        };
        this.setting = $.extend(defaultConfig,config || {});
        this.container = $(this.setting.el);
        this.currentIndex = 0;
        //获取轮播页数，只取一次
        this.navCount = this._getCount();
        //轮播定时器
        this.timer = null;
    }

    $.extend(
        SimpleSwitch.prototype,{
            //初始化,生成nav元素，绑定事件
            init:function(){
                var self = this,setting = self.setting,_container = self.container,_nav = _container.find(NAV),_content = _container.find(NAV_CONTENT);
                //初始化navcontent
                self._initCon();
                //生成nav的html
                self._createNav(self.navCount);
                //自动播放
                if(setting.autoplay === true){
                    self._autoplay();
                }
                //触发器事件绑定
                _nav.delegate(" li","mouseenter",function(ev){
                    var e = ev.currentTarget;
                    var _index = _container.find(NAV + " li").index(e);
                    self.switchTo(_index);
                });

                //hover触发器时，是否继续定时器
                if(setting.hoverpause === true){
                    _content.delegate(" li","mouseenter",function(){
                        self._stopplay();
                    });
                    _content.delegate(" li","mouseleave",function(){
                        self._autoplay();
                    });
                    _nav.delegate(" li","mouseenter",function(){
                        self._stopplay();
                    });
                    _nav.delegate(" li","mouseleave",function(){
                        self._autoplay();
                    });
                    _container.delegate(".btn-hover","mouseenter",function(){
                        self._stopplay();
                    });
                    _container.delegate(".btn-hover","mouseleave",function(){
                        self._autoplay();
                    });
                }
            },

            //获取switch的个数
            _getCount:function(){
                var self = this;
                return self.container.find(NAV_CONTENT + " li").length;
            },

            _autoplay:function(){
                var self = this;
                var _interval = self.setting.interval*1000;
                if(self.timer == null && self.setting.autoplay == true){
                    self.timer = setInterval(function(){
                        self.next();
                    },_interval);
                }
            },

            _stopplay:function(){
                var self = this;
                clearInterval(self.timer);
                this.timer = null;
            },

            /**
             * 创建nav的元素
             * @param count switch个数
             * @private
             */
            _createNav:function(count){
                var self = this;
                var li_HTML = "";
                for(var i = 0; i < count; i++){
                    if(i === 0){
                        li_HTML += "<li class='current'>" + (i+1) + "</li>";
                    }else{
                        li_HTML += "<li>" + (i+1) + "</li>";
                    }
                }
                self.container.find(NAV).append(li_HTML);
            },

            //初始化content样式
            _initCon:function(){
                var self = this,_setting = self.setting, _cont = $(_setting.el + " " + NAV_CONTENT + " li"),_width = _cont.width() ,_height = _cont.height(),_count = self.navCount;
                if(_setting.effect === "scrollx"){
                    $(_setting.el + " " + NAV_CONTENT).css("width", _width*_count + "px");
                    _cont.css({
                        "float":"left"
                    });
                }else if(_setting.effect === "scrolly"){
                    $(_setting.el + " " + NAV_CONTENT).css({
                        "width": _width + "px",
                        "height":_height*_count + "px"
                    });
                }else{
                    _cont.css({
                        "position":"absolute",
                        "z-index":1,
                        "opacity":0
                    });
                    _cont.eq(0).css({
                        "z-index":2,
                        "opacity":1
                    });
                }
            },

            prev:function(){
                var self = this;
                var _currentIndex = self.currentIndex,_navCount = self.navCount;
                var _prevIndex = _currentIndex - 1 < 0 ? _navCount -1:_currentIndex - 1;
                self.switchTo(_prevIndex);
            },

            next:function(){
                var self = this;
                var _currentIndex = self.currentIndex,_navCount = self.navCount;
                var _nextIndex = _currentIndex + 1 > _navCount - 1 ?0:_currentIndex + 1;
                self.switchTo(_nextIndex);

            },
            //跳到某一个选择
            switchTo:function(index){
                var self = this;
                var _currentIndex = self.currentIndex;
                if(_currentIndex != index){
                    self.contentAnimTo(index);
                }
            },
            //动画效果
            contentAnimTo:function(index){
                var self = this,_oldIndex = self.currentIndex;
                var _setting = self.setting,_effect = _setting.effect;
                var _cont = $(_setting.el + " " + NAV_CONTENT + " li");
                var _count = self.navCount, _nav_content = self.container.find(NAV_CONTENT);
                //最后一帧跳到第一帧 或者 第一帧到最后一帧的时候
                var _last_first = _oldIndex + 1 === self.navCount && index === 0 || _oldIndex  === 0 && index+1 === self.navCount;
                var flag = 1;
                if(_oldIndex < index){
                    flag = - flag;
                }
                var _content_li = self.container.find(NAV_CONTENT + " li");
                if(_effect === "scrollx"){
                    var _width = _cont.width();
                    //最后一帧跳到第一帧 或者 第一帧到最后一帧的时候
                    if(_last_first){
                        var _p_width = _width*(_count);
                        //最后一帧到第一帧的时候，第一帧放到最后一帧后面/第一帧到最后一帧的时候，最后一帧放到第一帧之前
                        self.container.find(NAV_CONTENT + " li").eq(index).css({
                            "position":"relative",
                            "left":flag*_p_width + "px"
                        });
                        //在切换动画之前，先stop之前的动画
                        self.stopBeforeAnim(_nav_content);
                        //执行动画
                        _nav_content.animate({
                            left:-flag*_width*(_oldIndex + 1) + "px"
                        },"slow",self.setting.easing,function(){
                            //动画执行好之后，最后一帧和第一帧的样式恢复
                            _content_li.eq(index).css({
                                "position":"static",
                                "left":  "0px"
                            });
                            //动画执行好之后，整个content left恢复
                            _nav_content.css("left",-_width*(index) + "px");
                        });
                    }else{
                        self.stopBeforeAnim(_nav_content);
                        _nav_content.animate({
                            left:-_width*(index) + "px"
                        },"slow",_setting.easing);

                        _content_li.eq(0).css({
                            "position":"static",
                            "left":  "0px"
                        });
                        _content_li.eq(_count).css({
                            "position":"static",
                            "left":  "0px"
                        });
                    }
                }else if(_effect === "scrolly"){
                    var _height = _cont.height();
                    //最后一帧跳到第一帧的时候
                    if(_last_first){
                        var _p_height = _height*(_count);
                        _content_li.eq(index).css({
                            "position":"relative",
                            "top":flag*_p_height + "px"
                        });
                        self.stopBeforeAnim(_nav_content);
                        _nav_content.animate({
                            top:-flag*_height*(_oldIndex+1) + "px"
                        },"slow",self.setting.easing,function(){
                            _content_li.eq(index).css({
                                "position":"static",
                                "top":  "0px"
                            });
                            _nav_content.css("top",-_height*(index) + "px");
                        });
                    }else{
                        self.stopBeforeAnim(_nav_content);
                        _nav_content.animate({
                            top:-_height*(index) + "px"
                        },"slow",_setting.easing);
                        _content_li.eq(0).css({
                            "position":"static",
                            "top":  "0px"
                        });
                        _content_li.eq(_count).css({
                            "position":"static",
                            "top":"0px"
                        });
                    }
                }else if(_effect === "fade"){
                    _content_li.stop(true,true);
                    _content_li.eq(index).css("opacity","1");
                    _content_li.eq(_oldIndex).animate({
                        opacity:0
                    },500,"swing",function(){
                        _content_li.eq(_oldIndex).css("zIndex","1");
                        _content_li.eq(index).css("zIndex","2");
                    });
                }
                else{
                    _content_li.eq(_oldIndex).hide();
                    _content_li.eq(index).show();
                }
                self.navAnimTo(index);
                self.currentIndex = index;
            },

            //结束之前的动画
            stopBeforeAnim:function(target){
                target.stop(true,false);
            },

            //触发器当前效果
            navAnimTo:function(index){
                var self = this,_li_target = self.container.find(NAV + " li");
                _li_target.removeClass("current");
                _li_target.eq(index).addClass("current");

                if(self.setting.circle === false)  {
                    var _prev = self.container.find( " .prev");
                    var _next = self.container.find( " .next");
                    if(index === 0 ){
                        _next.removeClass("disable");
                        _prev.addClass("disable");
                    }
                    else if(index === self.navCount-1){
                        _prev.removeClass("disable");
                        _next.addClass("disable");
                    }else{
                        _prev.removeClass("disable");
                        _next.removeClass("disable");
                    }
                }
            }
        }
    );
    $.SimpleSwitch = SimpleSwitch;
})(jQuery);