function getCupons() {
    let valideURL = window.location.href;
    const valideString = valideURL.split('?')[1];
    if (valideString[0] !== 'p') return;

    let baseURL = window.location.href;
    let iterador = 1;
    let listaCupons = [];
    let lista = document.querySelectorAll('#lista-cupons a');
    let listaInvertida = [];
    for (let i = 0; i < lista.length; i++) {
        listaInvertida.push(lista[i].href);
    }
    listaCupons.push(baseURL);
    for (let i = (listaInvertida.length - 1); i >= 0; i--) {
        listaCupons.push(listaInvertida[i]);
    }
    listaCupons.push(baseURL);
    const persisteDados = JSON.stringify({
        baseURL,
        iterador,
        listaCupons
    });
    localStorage.setItem("dadosCupons", persisteDados);
    window.location.assign(listaCupons[iterador]);
}
function alterar_url(op) {
    const dadoSerializada = localStorage.getItem("dadosCupons");
    if (!dadoSerializada) {
        return;
    }
    let { iterador,
        listaCupons,
        baseURL } = JSON.parse(dadoSerializada);
    if (op) {
        iterador++;
        if (iterador >= listaCupons.length) {
            localStorage.setItem("dadosCupons", JSON.stringify({
                baseURL,
                iterador,
                listaCupons
            }));
            window.location.assign(baseURL);
            return;
        }
    }
    else {
        iterador--;
        if (iterador < 0) {
            localStorage.setItem("dadosCupons", JSON.stringify({
                baseURL,
                iterador,
                listaCupons
            }));
            window.location.assign(baseURL);
            return;
        }
    }
    const persisteDados = JSON.stringify({
        baseURL,
        iterador,
        listaCupons
    });
    localStorage.setItem("dadosCupons", persisteDados);
    window.location.assign(listaCupons[iterador]);
}
function viewCupons() {
    const dadoSerializada = localStorage.getItem("dadosCupons");
    if (!dadoSerializada) {
        return;
    }
    let { iterador,
        listaCupons,
        baseURL } = JSON.parse(dadoSerializada);

    if (baseURL === window.location.href) {
        window.location.assign(listaCupons[iterador]);
        return;
    }
    window.location.assign(baseURL);
}
let escutaTecla = document.querySelector(".html");
addEventListener("keyup", function (event) {
    if (event.keyCode === 0x27) {
        event.preventDefault();
        alterar_url(true);
    }
    if (event.keyCode === 0x25) {
        event.preventDefault();
        alterar_url(false);
    }
    if (event.keyCode === 0x6B) {
        event.preventDefault();
        getCupons();
    }
    if (event.keyCode === 0x6D) {
        event.preventDefault();
        viewCupons();
    }
});
