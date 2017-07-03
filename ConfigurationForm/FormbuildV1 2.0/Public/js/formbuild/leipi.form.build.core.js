(function () {
    var LPB = window.LPB = window.LPB || {
            plugins: [],
            genSource: function () {
                var $temptxt = $("<div>").html($("#build").html());
                //scrubbbbbbb
                $($temptxt).find(".component").attr({
                    "title": null,
                    "data-original-title": null,
                    "data-type": null,
                    "data-content": null,
                    "rel": null,
                    "trigger": null,
                    "style": null
                });
                $($temptxt).find(".valtype").attr("data-valtype", null).removeClass("valtype");
                $($temptxt).find(".component").removeClass("component");
                $($temptxt).find("form").attr({"id": null, "style": null});
                $("#source").val($temptxt.html().replace(/\n\ \ \ \ \ \ \ \ \ \ \ \ /g, "\n"));
            }

        };
    /* 表单名称控件 form_name
     acc  是 class="component" 的DIV
     e 是 class="leipiplugins" 的控件
     */
    LPB.plugins['form_name'] = function (active_component, leipiplugins) {
        var plugins = 'form_name', popover = $(".popover");
        //右弹form  初始化值
        $(popover).find("#orgvalue").val($(leipiplugins).val());
        //右弹form  取消控件
        $(popover).delegate(".btn-danger", "click", function (e) {
            e.preventDefault();
            active_component.popover("hide");
        });
        //右弹form  确定控件
        $(popover).delegate(".btn-info", "click", function (e) {
            e.preventDefault();//阻止元素发生默认的行为(例如,当点击提交按钮时阻止对表单的提交
            var inputs = $(popover).find("input");
            $.each(inputs, function (i, e) {
                var attr_name = $(e).attr("id");//属性名称
                var attr_val = $("#" + attr_name).val();
                if (attr_name == 'orgvalue') {
                    $(leipiplugins).attr("value", attr_val);
                    active_component.find(".leipiplugins-orgvalue").text(attr_val);
                }
                active_component.popover("hide");
                LPB.genSource();//重置源代码
            });
        });

    }
})();
$(document).ready(function () {
//右侧选项卡源代码选项绑定click事件
    $("#navtab").delegate("#sourcetab", "click", function (e) {
        LPB.genSource();
    });


    //给左右form中的每个控件绑定mousedown事件
    $("form").delegate(".component", "mousedown", function (md) {
        $(".popover").remove();

        //取消事件的默认动作
        md.preventDefault();
        var tops = [];
        var mouseX = md.pageX;
        var mouseY = md.pageY;
        var $temp;
        var timeout;
        var $this = $(this);
        var delays = {
            main: 0,
            form: 120
        };
        var type;

        //如果为右侧内容
        if ($this.parent().parent().parent().parent().attr("id") === "components") {
            type = "main";
        } else {
            type = "form";
        }

        var delayed = setTimeout(function () {

            if (type === "main") {
                //如果为右侧则克隆
                $temp = $("<form class='form-horizontal span6' id='temp'></form>").append($this.clone());
            } else {
                //如果点击的是左侧控件不是legend
                if ($this.attr("id") !== "legend") {
                    $temp = $("<form class='form-horizontal span6' id='temp'></form>").append($this);
                }
            }

            $("body").append($temp);

            $temp.css({
                "position": "absolute",
                "top": mouseY - ($temp.height() / 2) + "px",
                "left": mouseX - ($temp.width() / 2) + "px",
                "opacity": "0.9"
            }).show();


            var half_box_height = ($temp.height() / 2);
            var half_box_width = ($temp.width() / 2);
            //左侧第一个form
            var $target1 = $("#target1");
            var tar_pos1 = $target1.position();
            //左侧第二个form
            var $target2 = $("#target2");
            var tar_pos2 = $target2.position();
            //左侧一component
            var $target1_component = $("#target1 .component");
            //左侧二component
            var $target2_component = $("#target2 .component");

            //拖动控件时
            $(document).delegate("body", "mousemove", function (mm) {
                //鼠标位置
                var mm_mouseX = mm.pageX;
                var mm_mouseY = mm.pageY;

                $temp.css({
                    "top": mm_mouseY - half_box_height + "px",
                    "left": mm_mouseX - half_box_width + "px"
                });

                if (mm_mouseX > tar_pos1.left &&
                    mm_mouseX < tar_pos1.left + $target1.width() &&
                    mm_mouseY > tar_pos1.top &&
                    mm_mouseY < tar_pos1.top + $target1.height()
                ) {
                    $("#target2").css("background-color", "#fff");
                    $target2_component.css({"border-top": "1px solid white", "border-bottom": "none"});
                    $("#target1").css("background-color", "#fafdff");
                    $target1_component.css({"border-top": "1px solid white", "border-bottom": "none"});
                    tops = $.grep($target1_component, function (e) {
                        return ($(e).position().top - mm_mouseY + half_box_height > 0 && $(e).attr("id") !== "legend");
                    });
                    if (tops.length > 0) {
                        $(tops[0]).css("border-top", "1px solid #22aaff");
                    } else {
                        if ($target1_component.length > 0) {
                            $($target1_component[$target1_component.length - 1]).css("border-bottom", "1px solid #22aaff");
                        }
                    }
                } else if (mm_mouseX > tar_pos2.left &&
                    mm_mouseX < tar_pos2.left + $target2.width() &&
                    mm_mouseY > tar_pos2.top &&
                    mm_mouseY < tar_pos2.top + $target2.width()
                ) {
                    $("#target1").css("background-color", "#fff");
                    $target1_component.css({"border-top": "1px solid white", "border-bottom": "none"});
                    $("#target2").css("background-color", "#fafdff");
                    $target2_component.css({"border-top": "1px solid white", "border-bottom": "none"});
                    tops = $.grep($target2_component, function (e) {
                        return ($(e).position().top - mm_mouseY + half_box_height > 0 && $(e).attr("id") !== "legend");
                    });
                    if (tops.length > 0) {
                        $(tops[0]).css("border-top", "1px solid #22aaff");
                    } else {
                        if ($target2_component.length > 0) {
                            $($target2_component[$target2_component.length - 1]).css("border-bottom", "1px solid #22aaff");
                        }
                    }
                } else {
                    $("#target1").css("background-color", "#fff");
                    $target1_component.css({"border-top": "1px solid white", "border-bottom": "none"});
                    $("#target2").css("background-color", "#fff");
                    $target2_component.css({"border-top": "1px solid white", "border-bottom": "none"});
                }
            });

            $("body").delegate("#temp", "mouseup", function (mu) {
                mu.preventDefault();

                var mu_mouseX = mu.pageX;
                var mu_mouseY = mu.pageY;
                var tar_pos1 = $target1.position();
                var tar_pos2 = $target2.position();

                $("#target1 .component").css({"border-top": "1px solid white", "border-bottom": "none"});
                $("#target2 .component").css({"border-top": "1px solid white", "border-bottom": "none"});

                // acting only if mouse is in right place
                if (mu_mouseX > tar_pos1.left &&
                    mu_mouseX < tar_pos1.left + $target1.width() &&
                    mu_mouseY > tar_pos1.top &&
                    mu_mouseY < tar_pos1.top + $target1.height()
                ) {
                    $temp.attr("style", null);
                    // where to add
                    if (tops.length > 0) {
                        //移动
                        $($temp.html()).insertBefore(tops[0]);
                    } else {
                        $("#target1 fieldset").append($temp.append("\n\n\ \ \ \ ").html());
                        $this.remove();
                    }
                } else if (
                    mu_mouseX > tar_pos2.left &&
                    mu_mouseX < tar_pos2.left + $target2.width() &&
                    mu_mouseY > tar_pos2.top &&
                    mu_mouseY < tar_pos2.top + $target2.height()
                ) {
                    $temp.attr("style", null);
                    // where to add
                    if (tops.length > 0) {
                        //移动
                        $($temp.html()).insertBefore(tops[0]);
                    } else {
                        $("#target2 fieldset").append($temp.append("\n\n\ \ \ \ ").html());
                        $this.remove();
                    }
                } else {
                    // no add
                    $("#target1 .component").css({"border-top": "1px solid white", "border-bottom": "none"});
                    $("#target2 .component").css({"border-top": "1px solid white", "border-bottom": "none"});
                    tops = [];
                }

                //clean up & add popover
                $target1.css("background-color", "#fff");
                $target2.css("background-color", "#fff");
                $(document).undelegate("body", "mousemove");
                $("body").undelegate("#temp", "mouseup");
                    $("#target1 .component").popover({trigger: "manual"});
                    $("#target2 .component").popover({trigger: "manual"});
                $temp.remove();
                LPB.genSource();
            });
        }, delays[type]);

        $(document).mouseup(function () {
            clearInterval(delayed);
            return false;
        });
        $(this).mouseout(function () {
            clearInterval(delayed);
            return false;
        });
    });

    //activate legend popover
    $("#target1 .component").popover({trigger: "manual"});
    //popover on click event
    $("#target1").delegate(".component", "click", function (e) {
        e.preventDefault();
        //$(".popover").hide();
        var active_component = $(this);
        active_component.popover("show");
        //class="leipiplugins"
        var leipiplugins = active_component.find(".leipiplugins"), plugins = $(leipiplugins).attr("leipiplugins");//leipiplugins="text"
        //exec plugins
        if (typeof(LPB.plugins[plugins]) == 'function') {
            try {
                LPB.plugins[plugins](active_component, leipiplugins);
            } catch (e) {
                alert('控件异常，请到 [雷劈网] 反馈或寻求帮助！');
            }
        } else {
            alert("控件有误或不存在，请与我们联系！");
        }

    });
});