//select��ʽ

$(function() {
	
    'use strict';
    var $uniformed = $("input, textarea, select").uniform();
    
    /*        var $uniformed = $("input, textarea, select, button, a").not(".skipThese");
     $uniformed.uniform();*/
    //不可点击复选框
     $("input[disabled]").parent().css("background","url('images/no_click.png')");
      $("input[disabled]").parent().css("background-repeat","no-repeat");
       $("input[disabled]").parent().css("background-position-x","2px");
      $("input[disabled]").css("cursor","not-allowed");
});
