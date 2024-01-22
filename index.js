document.addEventListener('DOMContentLoaded', init, false);

let elements = {}
let buttons = {};

const initDomEl = () => {
    elements.total = document.getElementById('total');
    elements.submitButton = document.getElementById('submitButton');
    elements.submitButton.addEventListener("click", e => {
        e.preventDefault();
        getTotal(mostrarTotal)
    });
}

async function init(){
    initDomEl();
}
const mostrarTotal = total => elements.total.innerHTML = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(total);

const getTotal = callback => {
    chrome.tabs.executeScript( {
        code: `[...document.querySelectorAll('[title="Importe Total: Pesos Argentinos"]')].map(a => a.innerHTML).reduce((acum, curr) => acum + parseInt(curr), 0);`
    }, function(url) {
        url = url[0];
        callback(url);
    });
}
