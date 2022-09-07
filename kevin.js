function getCupons(){
    let baseURL = window.location.href;
    let iterador = 0;
	let listaCupons = [];
	let lista = document.querySelectorAll('a');
    let setURL = lista[0].href;
    let parseUrlOne = setURL.split('=',2)[0];
    let parseUrlTwo = setURL.split('&Pdv=',2)[1];
	let listaInvertida = [];
    for(let i = 0; i < lista.length; i++){ 
        listaInvertida.push(lista[i].innerText);
    }
	for(let i = (listaInvertida.length - 1); i >= 0; i--){
	listaCupons.push(listaInvertida[i]);
	}
    const persisteDados = JSON.stringify({
        baseURL,
        iterador,
        listaCupons,
        parseUrlOne,
        parseUrlTwo
    });

    localStorage.setItem("dadosCupons", persisteDados);
    window.location.assign(`${parseUrlOne}=${listaCupons[iterador]}&Pdv=${parseUrlTwo}`);
}

function alterar_url(op){
    const dadoSerializada = localStorage.getItem("dadosCupons");
    if(!dadoSerializada){
        return;
    }
    let {iterador, listaCupons, baseURL, parseUrlOne, parseUrlTwo } = JSON.parse(dadoSerializada);
 
    if(op){
        iterador++;
        if(iterador >= listaCupons.length){
            window.location.assign(baseURL);
            return;
        }
    }
    else{
        iterador--;
        if(iterador < 0){
            window.location.assign(baseURL);
            return;
        }
    }

    const persisteDados = JSON.stringify({
        baseURL,
        iterador,
        listaCupons,
        parseUrlOne,
        parseUrlTwo
    });

    localStorage.setItem("dadosCupons", persisteDados);

    window.location.assign(`${parseUrlOne}=${listaCupons[iterador]}&Pdv=${parseUrlTwo}`);
}

let escutaTecla = document.querySelector("body");
addEventListener("keyup", function(event) {
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
});