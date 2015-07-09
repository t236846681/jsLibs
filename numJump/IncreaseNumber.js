//var $ = require('jquery');

// 数据自动增加
function IncreaseNumber (selection, options) {
  this.group = '.data-increase';
  this.options = {
    decimalClass: 'data-decimal',
    dataAttr: 'data-num',
    start: 0, // 起始值或起始百分比
    totalTime: 3000,
    intervalTime: 40,
    animeFunc: function (x, a) {
      return a * x;
    }
  };
  this.event = {
    'beforeShow': function(value, i) {
      return this.param[i].isDecimal ? Number(value.toFixed(2)) : Math.round(value);
    }
  };

  this.group = selection || this.group;
  if ($.isPlainObject(options)) {
    $.extend(true, this.options, options);
  }
};

IncreaseNumber.prototype = {
  _step: function() {
    var that = this;
    this.progress += this.options.intervalTime / this.options.totalTime;

    if (this.progress >= 1) {
      this.stop();
      return false;
    }

    $(this.group).each(function (i, e) {
      var x = that.progress;
      var a = that.param[i].a;
      var y = Number(that.options.animeFunc(x, a, i, e));

      y += that.param[i].y1;

      y = that.event['beforeShow'].call(that, y, i, e);
      $(this).text(y);
    });
  },
  _dataInit: function() {
    var that = this;
    // 初始化
    this.progress = 0;
    this.param = [];

    // 参数初始化
    $(this.group).each(function () {
      // 整数或小数
      var isDecimal = $(this).hasClass(that.options.decimalClass);
      var max = Number($(this).attr(that.options.dataAttr));

      var y1 = 0, a = 1;
      // 起始值=max - 固定值
      if (that.options.start < 0) {
        y1 = max - that.options.start;
        a = Math.abs(that.options.start);
      }
      // 起始值=固定值
      else if (that.options.start >= 1) {
        if (max > that.options.start) {
          y1 = that.options.start;
          a = max - that.options.start;
        } else {
          // 转为起始值=max - 固定值
          y1 = max - that.options.start;
          a = Math.abs(that.options.start);
        }
      } 
      // 起始值=max * 比例
      else {
        y1 = that.options.start * max;
        if (isDecimal) {
          y1 = Number(y1.toFixed(2));
        } else {
          y1 = Math.round(y1);
        }
        a = max - y1;
      }

      that.param.push({
        max: max,
        a: a,
        y1: y1,
        isDecimal: isDecimal
      });

      $(this).text(y1);
    });
  },
  start: function() {
    var that = this;

    clearInterval(this.interval);
    this._dataInit();

    this.interval = setInterval(function() {
      that._step();
    }, this.options.intervalTime);
  },
  stop: function() {
    var that = this;

    clearInterval(this.interval);

    // 显示最终值
    $(this.group).each(function (i, e) {
      var max = that.param[i].max;

      max = that.event['beforeShow'].call(that, max, i, e);
      $(this).text(max);
    });
  },
  setEvent: function(key, func) {
    this.event[key] = func;
  },
  setAnimeFunction: function(func) {
    this.options.animeFunc = func;
  }
};

// 金额格式化
IncreaseNumber.moneyFormat = function (num, n) {
  num = String(num.toFixed(n));
  var re = /(-?\d+)(\d{3})/;
  while(re.test(num)) num = num.replace(re, "$1,$2");
  return num;
};

//module.exports = IncreaseNumber;
