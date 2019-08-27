new WOW().init();

document.addEventListener("DOMContentLoaded", ready);
function ready() {

    resize()

    // setTimeout(function() {
    //
    $('body').animate({
            opacity: 1,
        }

        , 500)
    // }, 2500);


    // //запускаем функцию проверки видимости вилео с YouTube
    // $(document).scroll(function(){
    //     checkPosition();
    // });

}

// Swioer
let Swioer
swipeMin();
function swipeMin(){
    Swioer = new Swiper(".swiper-1",{
        slidesPerView:2,
        spaceBetween:20,
        centeredSlides:!0,
        loop: true,
        autoplay:{
            delay:2500,
            disableOnInteraction:!1
        },
        pagination:{
            el:".swiper-pagination-1",
            clickable:!0
        },
        navigation:{
            nextEl:".swiper-button-next-1",
            prevEl:".swiper-button-prev-1"}
    })
}

// Resize window
window.onresize = function () {
    resize();

    // //запускаем функцию проверки видимости вилео с YouTube
    // checkPosition();
};

let wowOffset = $('[data-wow-offset]')
let wowTitle = $('[id|="title"]')
let wowTitleDelay = wowTitle.map( (i,elem) => elem.getAttribute('data-wow-delay') )

function resize() {
    if($(window).width() < 768) {
        $(".box-4-wrapper-left").css("height", '50%');
        $(".box-4-wrapper-right").css("height", '50%');

        Swioer.params.slidesPerView = 1

        for (let elem of wowTitle)
            elem.setAttribute('data-wow-delay', '0.2s')
        for (let elem of wowOffset)
            elem.removeAttribute('data-wow-offset')
    } else {
        $(".box-4-wrapper-left").css("height", '100%');
        $(".box-4-wrapper-right").css("height", '100%');

        Swioer.params.slidesPerView = 2

        for (let i = 0; i < wowTitle.length; i++)
            wowTitle[i].setAttribute('data-wow-delay', wowTitleDelay[i])
        for (let elem of wowOffset)
            elem.setAttribute('data-wow-offset', '150')
    };

    if($(window).height() < 850) {
        for (let elem of wowTitle)
            elem.setAttribute('data-wow-delay', '0.2s')
        for (let elem of wowOffset)
            elem.removeAttribute('data-wow-offset')
    } else {
        for (let i = 0; i < wowTitle.length; i++)
            wowTitle[i].setAttribute('data-wow-delay', wowTitleDelay[i])
        for (let elem of wowOffset)
            elem.setAttribute('data-wow-offset', '150')
    };
};

// Bg video
var bgVideo = document.getElementsByClassName("bg-video");
bgVideo[0].addEventListener("canplay", function() {
    setTimeout(function() {
        bgVideo[0].play();
    }, 2500);
});


// Video

'use strict';
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
r(function(){
    if (!document.getElementsByClassName) {
        // Поддержка IE8
        var getElementsByClassName = function(node, classname) {
            var a = [];
            var re = new RegExp('(^| )'+classname+'( |$)');
            var els = node.getElementsByTagName("*");
            for(var i=0,j=els.length; i<j; i++)
                if(re.test(els[i].className))a.push(els[i]);
            return a;
        }
        var videos = getElementsByClassName(document.body,"youtube");
    } else {
        var videos = document.getElementsByClassName("youtube");
    }

    var nb_videos = videos.length;
    for (var i=0; i<nb_videos; i++) {
        // Находим постер для видео, зная ID нашего видео
        videos[i].style.backgroundImage = 'url(https://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';

        // Размещаем над постером кнопку Play, чтобы создать эффект плеера
        var play = document.createElement("div");
        play.setAttribute("class","play");
        videos[i].appendChild(play);

        videos[i].onclick = function() {
            // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
            var iframe = document.createElement("iframe");
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1&loop=1&color=white&showinfo=0&fs=1";
            if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
            iframe.setAttribute("src",iframe_url);
            iframe.setAttribute("frameborder",'0');
            iframe.setAttribute("allowfullscreen", "allowfullscreen");



            // Высота и ширина iFrame будет как у элемента-родителя
            iframe.style.width  = this.style.width;
            iframe.style.height = this.style.height;

            // Заменяем начальное изображение (постер) на iFrame
            this.parentNode.replaceChild(iframe, this);
        }
    }
});

let myVideoIds = ['WBq8vfJT5Bk',
    'aLDNfZ1eC5Y',
    'yXQDGTXzf5g',
    'WGlh1UQ63s8',
    'G4vHtVutbIQ',
    'TilcDQ_0lvg',
    '6Jx5H4Vb-MM',
    'lF_o9jaw6Rk'];


