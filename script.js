/* =========================================
   ELEMENTOS
========================================= */

const startScreen = document.getElementById("startScreen");
const loveScreen = document.getElementById("loveScreen");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

const wordsBackground =
    document.getElementById("wordsBackground");


/* =========================================
   CONFIGURAÇÃO
========================================= */

let musicPlaying = false;


/* =========================================
   CRIAR FUNDO ANIMADO
========================================= */

function createBackgroundWords() {

    wordsBackground.innerHTML = "";

    const totalWords =
        window.innerWidth < 700
            ? 140
            : 230;


    for (let i = 0; i < totalWords; i++) {

        const word =
            document.createElement("div");

        word.className =
            "background-word";

        word.textContent =
            "YOU LOVE YOU";


        /*
         * Pequenas diferenças na animação
         * deixam o fundo menos artificial.
         */

        word.style.animationDelay =
            `${Math.random() * -5}s`;

        word.style.transform =
            `translateX(${Math.random() * 30 - 15}px)`;


        wordsBackground.appendChild(word);

    }

}


/* =========================================
   TOCAR MÚSICA
========================================= */

function startMusic() {

    music.volume = 0.45;

    const playPromise =
        music.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicPlaying = true;

                musicButton.textContent = "♫";

            })
            .catch(() => {

                /*
                 * Alguns navegadores podem bloquear
                 * o áudio. O botão de música continua
                 * disponível.
                 */

                musicPlaying = false;

            });

    }

}


/* =========================================
   ABRIR TELA FINAL
========================================= */

function openLoveScreen() {

    /*
     * Música começa depois do clique.
     */

    startMusic();


    /*
     * Cria o fundo.
     */

    createBackgroundWords();


    /*
     * Pequena animação da primeira tela.
     */

    startScreen.style.opacity = "0";
    startScreen.style.transform = "scale(0.9)";


    setTimeout(() => {

        startScreen.style.visibility =
            "hidden";

        loveScreen.classList.add("active");

    }, 500);

}


/* =========================================
   BOTÃO YES
========================================= */

yesButton.addEventListener(
    "click",
    openLoveScreen
);


/* =========================================
   BOTÃO NO
========================================= */

noButton.addEventListener(
    "click",
    openLoveScreen
);


/* =========================================
   BOTÃO DA MÚSICA
========================================= */

musicButton.addEventListener(
    "click",
    () => {

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicButton.textContent = "♫";

        } else {

            startMusic();

        }

    }
);


/* =========================================
   CRIAR FUNDO AO CARREGAR
========================================= */

createBackgroundWords();


/* =========================================
   RECRIAR AO GIRAR/REDIMENSIONAR
========================================= */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(
            createBackgroundWords,
            300
        );

    }
);
