function getCoupons() {
    let valideURL = window.location.href;
    const valideString = valideURL.split('?')[1];
    if (valideString[0] !== 'p') return;

    let baseURL = window.location.href;
    let iterate = 1;
    let couponsList = [];
    let list = document.querySelectorAll('#lista-cupons a');
    let invertedList = [];
    for (let i = 0; i < list.length; i++) {
        invertedList.push(list[i].href);
    }
    couponsList.push(baseURL);
    for (let i = (invertedList.length - 1); i >= 0; i--) {
        couponsList.push(invertedList[i]);
    }
    couponsList.push(baseURL);
    const persistData = JSON.stringify({
        baseURL,
        iterate,
        couponsList
    });
    localStorage.setItem("couponsDataK", persistData);
    window.location.assign(couponsList[iterate]);
}
function chengeUrl(op) {
    const serializedData = localStorage.getItem("couponsDataK");
    if (!serializedData) {
        return;
    }
    let { iterate,
        couponsList,
        baseURL } = JSON.parse(serializedData);
    if (op) {
        iterate++;
        if (iterate >= couponsList.length) {
            localStorage.setItem("couponsDataK", JSON.stringify({
                baseURL,
                iterate,
                couponsList
            }));
            window.location.assign(baseURL);
            return;
        }
    }
    else {
        iterate--;
        if (iterate < 0) {
            localStorage.setItem("couponsDataK", JSON.stringify({
                baseURL,
                iterate,
                couponsList
            }));
            window.location.assign(baseURL);
            return;
        }
    }
    const persistData = JSON.stringify({
        baseURL,
        iterate,
        couponsList
    });
    localStorage.setItem("couponsDataK", persistData);
    window.location.assign(couponsList[iterate]);
}
function viewCoupons() {
    const serializedData = localStorage.getItem("couponsDataK");
    if (!serializedData) {
        return;
    }
    let { iterate,
        couponsList,
        baseURL } = JSON.parse(serializedData);

    if (baseURL === window.location.href) {
        window.location.assign(couponsList[iterate]);
        return;
    }
    window.location.assign(baseURL);
}
let listenKeyboard = document.querySelector(".html");
addEventListener("keyup", function (event) {
    if (event.keyCode === 0x27) {
        event.preventDefault();
        chengeUrl(true);
    }
    if (event.keyCode === 0x25) {
        event.preventDefault();
        chengeUrl(false);
    }
    if (event.keyCode === 0x6B) {
        event.preventDefault();
        getCoupons();
    }
    if (event.keyCode === 0x6D) {
        event.preventDefault();
        viewCoupons();
    }
});
