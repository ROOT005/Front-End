window.onload = function() {
    waterfall('main', 'box');
}
function waterfall( parent, box){
    //将main下的所有class为box的元素取出来。
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    //console.log(oBoxs.length);
    //计算更个页面显示的列数;
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
    //设置main的宽
    oParent.style.cssText='width:' + oBoxW*cols + 'px;margin: 0 auto;';
    var hArr = []; //存放每一列高度的数组
    for(var i = 0; i < oBoxs.length; i++){
        if(i < cols){
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var mainH = Math.min.apply(null, hArr);
            var index = hArr.indexOf(mainH);
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top = mainH + 'px';
            oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
            hArr[index] += oBoxs[i].offsetHeight;
        }
        console.log(oBoxs[4].offsetHeight);
    }
}
//byclass获取元素
function getByClass(parent, className){
    var boxArr = new Array(),//save the class elements
        oElements = parent.getElementsByTagName('*');
    for(var i = 0; i < oElements.length; i++){
        if(oElements[i].className == className){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
//获取最小高度的索引
