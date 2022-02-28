!function($) {
  $.fn.tab = function(options,callback){
    var defaults = {
      tabBar:'.tab-hd li',
      tabCon:".tab-bd .tab-item",
      className:"is-active",
      tabEvent:"click",
      index:0,
    }
    var options = $.extend(defaults, options);
    this.each(function(){
      var that = $(this);
      that.find(options.tabBar).removeClass(options.className);
      that.find(options.tabBar).eq(options.index).addClass(options.className);
      that.find(options.tabCon).hide();
      that.find(options.tabCon).eq(options.index).show();

      that.find(options.tabBar).on(options.tabEvent,function(){
        that.find(options.tabBar).removeClass(options.className);
        $(this).addClass(options.className);
        var index = that.find(options.tabBar).index(this);
        that.find(options.tabCon).hide();
        that.find(options.tabCon).eq(index).show();
        if(callback){
          callback();
        }
      });
    });
  }
} (window.jQuery);