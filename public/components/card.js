function chamarCard(tipo,mensagem) {
    console.log("Entrou no card")
    document.querySelector("#card").classList.add("active");
setTimeout(() => {
    document.querySelector("#card").classList.remove("active");
}, 3200);
    document.querySelector("#card").classList.add(tipo);
    document.querySelector("#card p").innerText = mensagem
}

function recarregar(){
    window.location.search = ""
}