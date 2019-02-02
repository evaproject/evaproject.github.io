function modal(id) {
    var modal = document.getElementById("modalBox");
    var close = document.querySelectorAll('[data-close="true"]');

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

    modal.style.display = 'block';

    for (var i = 0; i < close.length; i++) {
        console.log(close.length);
        close[i].onclick = function () {
            modal.style.display = 'none';
        }
    }
    window.onclick = function (e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    };
    document.onkeydown = function (e) {
        if (e.keyCode == 27) {
            modal.style.display = 'none';
        }
    };
}