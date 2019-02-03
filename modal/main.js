function modal(id) {
    var modal = document.getElementById("modalBox");
    var close = document.querySelectorAll('[data-close="true"]');

    //Динамически заполняем наше модальное окно в зависимости от того на какую область нажали
    document.getElementById("img").
        setAttribute("src", document.getElementById(`img${id}`).getAttribute("src"));
    document.getElementById("img").
        setAttribute("alt", document.getElementById(`img${id}`).getAttribute("alt"));
    document.getElementById("label").innerHTML =
        document.getElementById(`label${id}`).innerHTML;
    document.getElementById("info").innerHTML =
        document.getElementById(`info${id}`).innerHTML;
    document.getElementById("prise").innerHTML =
        document.getElementById(`prise${id}`).innerHTML;

    //Делаем окно видимым, а всему что под ним запрещаем скролл
    modal.style.display = 'block';
    document.getElementById("body").style.overflow = "hidden";

    //Обрабатываем различные сценарии закрытия модального окна и возвращаем скролл
    //По нажатию на крестик
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            modal.style.display = 'none';
            document.getElementById("body").style.overflow = "auto";
        }
    }
    //По нажатию на затемнённую область
    window.onclick = function (e) {
        if (e.target == modal) {
            modal.style.display = 'none';
            document.getElementById("body").style.overflow = "auto";
        }
    }
    //По нажатию на клавишу Esc
    document.onkeydown = function (e) {
        if (e.keyCode == 27) {
            modal.style.display = 'none';
            document.getElementById("body").style.overflow = "auto";
        }
    }
}