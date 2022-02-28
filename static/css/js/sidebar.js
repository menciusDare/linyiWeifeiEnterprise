$('.sidebar-fold').on('click',function(){
  if($('body').hasClass("sidebar-mini")){
    //收起状态
    $('body').removeClass('sidebar-mini');
  }else{
    //展开状态
    $('body').addClass('sidebar-mini');
  }
})
$('.sidebar-toggle').click(function(){
  var body = $('body');
  var sidebar = $('.sidebar');
  var widthSidebar = sidebar.outerWidth();
  //左侧展开时无样式sidebarSmall
  if(!body.hasClass('sidebarHide')){
    $(this).find('.icon').removeClass('icon-jiantouzuo').addClass('icon-jiantouyou');
    body.addClass('sidebarHide');
  }else{
    $(this).find('.icon').removeClass('icon-jiantouyou').addClass('icon-jiantouzuo');
    body.removeClass('sidebarHide');
  }
})

// 左侧树导航
var animationSpeed = 300;
$(".sidebar-menu a").on('click', function(e) {
  // 如果收起状态时展开菜单
  var page =$(this).parents('.page');
  if(page.hasClass('is-sidebar-mini')){
    page.removeClass('is-sidebar-mini');
    //隐藏标题浮层
    $('[data-toggle="tooltip"]').tooltip('destroy');
  }

  var $this = $(this);
  var checkElement = $this.next();

  //当含有子级并且显示时
  if (checkElement.is('.menu-child') && checkElement.is(':visible')) {
    checkElement.slideUp(animationSpeed, function() {
      checkElement.removeClass('menu-open');
      checkElement.parent("li").removeClass("is-open");
    });

  }

  //当含有子级并且隐藏时
  else if ((checkElement.is('.menu-child')) && (!checkElement.is(':visible'))) {
    var parent = $this.parents('ul').first();
    var ul = parent.find('ul:visible').slideUp(animationSpeed);
    ul.removeClass('menu-open');
    var parent_li = $this.parent("li");

    //展开当前ul
    checkElement.slideDown(animationSpeed, function() {
      checkElement.addClass('menu-open');
      parent.find('li.is-open').removeClass('is-open');
      parent_li.addClass('is-open');
    });
  }

  //当无子级时
  if(!(checkElement.is('.menu-child'))){
    var parent = $this.parents('ul').first();
    var ul = parent.find('ul:visible').slideUp(animationSpeed);
    ul.removeClass('menu-open');
    var parent_li = $this.parent("li");
    parent_li.siblings().removeClass('is-open');
    $(".sidebar-menu li").removeClass('is-active');//清除所有is-active
    parent_li.addClass('is-active');//当前添加is-active

    e.preventDefault();
  }

  //当含有子级时禁用a连接
  if (checkElement.is('.menu-child')) {
    e.preventDefault();
  }
});

// 左侧展开收起
$('.sidebar-toggle').on('click',function(){
  var page =$(this).parents('.page');
  var sidebar = page.find('.sidebar');
  var content = page.find('.content');
  //左侧展开时无样式sidebarSmall
  if(!page.hasClass('is-sidebar-mini')){
    page.addClass('is-sidebar-mini');
    page.find('.menu-child').slideUp();
    $(".sidebar").getNiceScroll().resize();
    //显示标题浮层
    $('[data-toggle="tooltip"]').tooltip({
      placement: 'right',
      container: 'body',
      // delay: { "show": 500, "hide": 500 }, //显示隐藏延迟
      //出滚动条时需要添加属性
      viewport: {
        selector: '.page',
        padding: 0
      },
    });
  }else{
    page.removeClass('is-sidebar-mini');
    sidebar.find('.is-open').children('.menu-child').slideDown();
    $(".sidebar").getNiceScroll().resize();
    //隐藏标题浮层
    $('[data-toggle="tooltip"]').tooltip('destroy');
  }
});


function returnAddress(adress){
  window.location.replace('/#/'+adress)
}
