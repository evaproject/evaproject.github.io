
let videoIds = ['fnJ8sZFkuMw',
                'PdB9KfmX50Y',
                't9APohDmtKM',
                '0CglYoXywT8',
                'LRK8Sf4HgEE',
                'YKN-sbW4Y8Q',
                'iuKpT40jZhM',
                'Oz9quIeg6Uk'];
let videoPlaceId = ['v1','v2','v3','v4','v5','v6','v7','v8'];
let $elem = $('.video-grid');
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function checkPosition($e,p){
//функция проверки видимости элемента на jquery
//     $e = jQuery($e);
    console.log($e);
    var div_position = $e.offset();
    var div_top = div_position.top;
    var div_left = div_position.left;
    var div_width = $e.width();
    var div_height = $e.height();
    var top_scroll = $(document).scrollTop();
    var left_scroll = $(document).scrollLeft();
    var screen_width = $(window).width();
    var screen_height = $(window).height()+600;
    var see_x1 = left_scroll;
    var see_x2 = screen_width + left_scroll;
    var see_y1 = top_scroll;
    var see_y2 = screen_height + top_scroll;
    var div_x1 = div_left;
    var div_x2 = div_left + div_height;
    var div_y1 = div_top;
    var div_y2 = div_top + div_width;
    if( div_x1 >= see_x1 && div_x2 <= see_x2 && div_y1 >= see_y1 && div_y2 <= see_y2 ){
//если элемент видим на экране, запускаем видео Youtube
        p.playVideo();
    }else{
//если не видим, ставим видео на паузу
        p.pauseVideo();
    }
}
$(document).ready(function(){
//запускаем функцию проверки видимости элемента
    $(document).scroll(function(){
        for (let i=0;i<8;i++) {
            checkPosition($('.video-grid:eq('+i+')'),player[i]);
}
    });
    $(window).resize(function(){
        for (let i=0;i<8;i++) {
            checkPosition($('.video-grid:eq('+i+')'),player[i]);
        }
    });
});

onYouTubeIframeAPIReady()

let player = [];
function onYouTubeIframeAPIReady() {
//рисуем видеопроигрыватель Youtube
    for (let i = 0; i < 8; i++) {
        player[i] = new YT.Player(videoPlaceId[i], {
            width: 600, height: 400, //размеры окна видео
            playerVars: {'autoplay': 0, 'loop': 1, 'controls': 1, 'showinfo': 0, 'rel': 0, 'mute': 1}, //тонкие настройки видеопроигрывателя
            videoId: videoIds[i], //здесь id ролика
        });
    }
}
