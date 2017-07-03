/**
 * Created by admin on 2017/6/22.
 */

var addressInit = function (_cmbProvince, _cmbCity, _cmbArea, defaultProvince, defaultCity, defaultArea) {
    /*获取数据*/
    var provinceList=null;
    $.ajax({
        url: './data/threeArea.json',
        async: false,
        dataType: 'json',
        success: function (result) {
            console.log('aathreedata',result)
            provinceList = result;
        }
    });
    var cmbProvince = document.getElementById(_cmbProvince);
    var cmbCity = document.getElementById(_cmbCity);
    var cmbArea = document.getElementById(_cmbArea);

    /*如果存在传入值则传入值显示*/
    function cmbSelect(cmb, str) {
        for (var i = 0; i < cmb.options.length; i++) {
            if (cmb.options[i].value == str) {
                cmb.selectedIndex = i;
                return;
            }
        }
    }

    /*添加数据*/
    function cmbAddOption(cmb, str, obj) {
        var option = document.createElement("OPTION");
        cmb.options.add(option);
        option.innerHTML = str;
        option.value = str;
        option.obj = obj;
    }

    function changeCity() {
        cmbArea.options.length = 1;
        if (cmbCity.selectedIndex == 0) {
            return;
        }
        var item = cmbCity.options[cmbCity.selectedIndex].obj;
        for (var i = 0; i < item.areaList.length; i++) {
            cmbAddOption(cmbArea, item.areaList[i], null);
        }
        cmbSelect(cmbArea, defaultArea);
    }

    /*改变一级菜单*/
    function changeProvince() {
        /*二级菜单初始化*/
        cmbCity.options.length = 1;
        cmbCity.onchange = null;

        /*判断一级菜单为请选择时*/
        if (cmbProvince.selectedIndex == 0) {
            changeCity();
            cmbCity.onchange = changeCity;
            return;
        }

        /*根据选中的一级菜单数据二级菜单加载数据*/
        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
        for (var i = 0; i < item.cityList.length; i++) {
            cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i]);
        }

        cmbSelect(cmbCity, defaultCity);
        changeCity();
        cmbCity.onchange = changeCity;
    }


    /*循环数据中一级菜单中的值*/
    for (var i = 0; i < provinceList.length; i++) {
        /*一级菜单中添加数据*/
        cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i]);
    }
    /*设定一级菜单为传入值*/
    cmbSelect(cmbProvince, defaultProvince);

    /*改变一级菜单*/
    changeProvince();
    cmbProvince.onchange = changeProvince;

};
