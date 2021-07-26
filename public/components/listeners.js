function formListener(){
    setInterval(()=>{
    var url = new URL(window.location.href);
    var sucesso = url.searchParams.get("sucesso");
    console.log(sucesso);
    if(sucesso==1){
        chamarCard("sucesso","Entraremos em contato!");
        setInterval(()=>{
            recarregar();
        }, 3700)
    }
    if(sucesso==0){
        chamarCard("erro","Algo deu errado, tente novamente!");
        setInterval(()=>{
            recarregar();
        }, 3700)
    }
    } ,3700);
}
formListener();

