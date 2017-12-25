/*
 * @Author: zhengwei
 * @Date:   2017-12-20 17:08:41
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2017-12-20 17:29:20
 */

// 移动端推荐使用addEventListener 添加事件
/*这种事件可以添加多个
能够添加一些移动端新增的事件 滑动事件 过渡完成事件 动画完成事件*/
// 这种方式也比较符合框架里面添加事件的方式
window.addEventListener('load', function() {
    searchFade();
    countDown();
    slide();
});
/*搜索框渐变的特效*/
function searchFade() {
    //搜索框渐变的JS代码放到这个函数里面写
    // 1. 添加一个滚动条滚动的事件
    window.addEventListener('scroll', searchOpacity);
    searchOpacity();

    function searchOpacity() {
        // 2. 获取滚动条滚动的距离
        var scrollTop = getScrollTop();
        var slideHeight = document.querySelector('#slide').offsetHeight;
        if (scrollTop < slideHeight) {
            var opacity = (scrollTop / slideHeight) * 0.8;
            document.querySelector('#topbar').style.backgroundColor = 'rgba(255,0,0,' + opacity + ')';
        } else {
            document.querySelector('#topbar').style.backgroundColor = 'rgba(255,0,0,0.8)';
        }
    }
}

function getScrollTop() {
    var scrollPos;
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
    } else if (document.compatMode && document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollPos = document.body.scrollTop;
    }
    return scrollPos;
}
// 倒计时JS函数
function countDown() {

    // 获取未来时间
    var futureTime = new Date('2017-12-22 21:00:00').getTime() / 1000;
    // console.log(futureTime); 
    // 获取当前时间
    var currentTime = new Date().getTime()/1000;
    // console.log(currentTime);
    var time = Math.floor(futureTime - currentTime);
    // console.log(time);
    // 获取所有的span
    var spans = document.querySelectorAll('#seckill .seckill-count-down span');
    // 使用计时器 ,每隔一秒 ,减少
    var timeId = setInterval(function() {
        time--;
        if(time <= 0) {
            time = 0;
            clearInterval(timeId);
        }
        // /获取时分秒  3700/3600
        var hour = Math.floor(time / 3600);
        var min = Math.floor(time % 3600 /60);
        var sec = Math.floor(time % 60);
        spans[0].innerHTML = Math.floor(hour/10);
        spans[0].innerHTML = Math.floor(hour%10);
        spans[3].innerHTML = Math.floor(min/10);
        spans[4].innerHTML = Math.floor(min%10);
        spans[6].innerHTML = Math.floor(sec/10);
        spans[7].innerHTML = Math.floor(sec%10);
        
    },1000)
}
// 轮播图JS函数
function slide() {
    var index = 1;
    var slideUl = document.querySelector('#slide ul');
    var imgs = document.querySelectorAll('#slide ul li');
    var slideWidth = document.querySelector('#slide').offsetWidth;
    // 1.自动轮播
    start();
    function start() {
        timeId = setInterval(function() {
            index++;
            slideUl.style.transform = 'translateX('+(-index*slideWidth)+'px)';
            slideUl.style.transition = "all 300ms ease";
            // setTimeout(function() {

            //     if( index >= 9) {
            //         index = 1;
            //         slideUl.style.transform = 'translateX('+(-index*slideWidth)+'px)';
            //         slideUl.style.transition = "none";
            //     }
            // },200)
        },1000)
    }
    
    // 添加过渡完成事件
    var lis = document.querySelectorAll('#slide ol li');
    slideUl.addEventListener('transitionend',function() {
        if(index >= imgs.length-1) {
            index = 1;
        }
        if(index <= 0) {
            index = imgs.length -2;
        }
        slideUl.style.transform = 'translateX('+(-index*slideWidth)+'px)';
        slideUl.style.transition = "none";
        for(var i=0;i<lis.length;i++) {
            lis[i].classList.remove('active');
        }
        lis[index-1].classList.add('active');
    })

    // 添加 touch 事件
    var startX = startY = moveX = moveY = 0;
    slideUl.addEventListener('touchstart',function(e) {
        clearInterval(timeId);
        startX = e.touches[0].clientX;
    });
    slideUl.addEventListener('touchmove',function(e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        slideUl.style.transform = 'translateX('+(-index*slideWidth+distanceX)+'px)';
        slideUl.style.transition = "none";
    });
    slideUl.addEventListener('touchend',function() {
        if(Math.abs(distanceX)>(slideWidth/3)) {
            if(distanceX > 0) {
                index --;
            }else {
                index ++;
            }
            slideUl.style.transform = 'translateX('+(-index*slideWidth)+'px)';
            slideUl.style.transition = "all 300ms ease";
        }else {
            slideUl.style.transform = 'translateX('+(-index*slideWidth)+'px)';
            slideUl.style.transition = "all 300ms ease";
        }
        start();
    })





    
}
