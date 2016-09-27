window.onload = function() {
    waterfall('main', 'box');
    //使用json
    var dataInt = {
        "data":[
            {"src":"1.jpg"},
            {"src":"2.jpg"},
            {"src":"3.jpg"},
            {"src":"4.jpg"},
            {"src":"5.jpg"},
            {"src":"6.jpg"},
        ]
    }
    window.onscroll = function(){
        if(checkScrollSlide()){
            var oParent = document.getElementById('main');
            //将数据块渲染到页面的尾部
            for(var i = 0; i < dataInt.data.length; i++){
                var oBox = document.createElement('div');
                var oPic = document.createElement('div');
                var oImg = document.createElement('img');
                oPic.className = 'pic';
                oBox.className = 'box';
                oImg.src = "images/" + dataInt.data[i].src;
                oParent.appendChild(oBox);
                oBox.appendChild(oPic);
                oPic.appendChild(oImg);
            }
            waterfall('main', 'box');
        }
    }
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
        //console.log(oBoxs[4].offsetHeight);
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

//检测是否具备了滚条数据块的条件
function checkScrollSlide(){
    var oParent = document.getElementById('main');
    var oBoxs = getByClass(oParent,'box');
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    //console.log("最后图片偏移"+lastBoxH);
    //console.log("底边偏移"+(scrollTop+height));
    return (lastBoxH < scrollTop+height) ? true:false;
}
