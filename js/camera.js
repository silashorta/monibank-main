const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";


//FUNÇÃO INICIALIZA A CÂMERA
botaoIniciarCamera.addEventListener("click", async function () {
    //ACESSA A CÂMRA DO USUÁRIO
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio:false}) 

    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block";
    video.style.width = "";
    video.style.heigth = "";

    console.log(` video = ${video.style.width} e ${video.style.height}`);

    video.srcObject = iniciarVideo;
})

botaoTirarFoto.addEventListener("click", function (){
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.style.objectFit = "contain";
    
    
    console.log({canvas});
    console.log(`canvas = ${canvas.width} e ${canvas.height} e ${canvas.style.objectFit}`);

    imagemURL = canvas.toDataURL("image/jpeg");

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
})

botaoEnviarFoto.addEventListener("click", () =>{
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converteRetorno = JSON.parse(receberDadosExistentes);

    converteRetorno.imagem = imagemURL;

    localStorage.setItem("cadastro", JSON.stringify(converteRetorno));

    window.location.href = "./abrir-conta-form-3.html";
})