/* =========================================
   NAVIGATION
========================================= */

const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }

});


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");

function openMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.add("open");
    document.body.classList.add("no-scroll");

}

function closeMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("open");
    document.body.classList.remove("no-scroll");

}

if (menuButton) {
    menuButton.addEventListener("click", openMobileMenu);
}

if (mobileClose) {
    mobileClose.addEventListener("click", closeMobileMenu);
}

document.querySelectorAll(".mobile-menu-links a").forEach(link => {

    link.addEventListener("click", closeMobileMenu);

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-image"
);

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================
   BACKGROUND MUSIC
========================================= */

const music = document.getElementById("backgroundMusic");
const soundButton = document.getElementById("soundButton");

let musicPlaying = false;

soundButton.addEventListener("click", async () => {

    try {

        if (!musicPlaying) {

            await music.play();

            musicPlaying = true;
            soundButton.classList.add("playing");

        } else {

            music.pause();

            musicPlaying = false;
            soundButton.classList.remove("playing");

        }

    } catch (error) {

        console.log("Music could not start:", error);

    }

});


/* =========================================
   LOVE LETTER
========================================= */

const letterModal = document.getElementById("letterModal");
const openLetter = document.getElementById("openLetter");
const closeLetter = document.getElementById("closeLetter");

function showLetter() {

    letterModal.classList.add("open");
    document.body.classList.add("no-scroll");

}

function hideLetter() {

    letterModal.classList.remove("open");
    document.body.classList.remove("no-scroll");

}

openLetter.addEventListener("click", showLetter);
closeLetter.addEventListener("click", hideLetter);


/* Close when clicking outside paper */

letterModal.addEventListener("click", event => {

    if (event.target === letterModal) {
        hideLetter();
    }

});


/* Escape key */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        hideLetter();

        document.getElementById("imageViewer")
            .classList.remove("open");

    }

});


/* =========================================
   IMAGE VIEWER
========================================= */

const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const closeViewer = document.getElementById("closeViewer");

document.querySelectorAll(".memory").forEach(memory => {

    memory.addEventListener("click", () => {

        const image = memory.dataset.image;

        if (!image) return;

        viewerImage.src = image;

        imageViewer.classList.add("open");

        document.body.classList.add("no-scroll");

    });

});


function closeImageViewer() {

    imageViewer.classList.remove("open");
    document.body.classList.remove("no-scroll");

}

closeViewer.addEventListener("click", closeImageViewer);

imageViewer.addEventListener("click", event => {

    if (event.target === imageViewer) {
        closeImageViewer();
    }

});
/* =========================================
   CAKE / CANDLE
========================================= */

const candle = document.getElementById("candle");
const flame = document.getElementById("flame");
const cakeWrap = document.querySelector(".cake-wrap");
const wishMessage = document.getElementById("wishMessage");

let candleBlown = false;

candle.addEventListener("click", () => {

    if (candleBlown) return;

    candleBlown = true;

    flame.classList.add("off");
    cakeWrap.classList.add("blown");
    wishMessage.classList.add("show");

    createConfetti();

});


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const pieces = 90;

    for (let i = 0; i < pieces; i++) {

        const confetti = document.createElement("span");

        confetti.style.position = "fixed";
        confetti.style.zIndex = "9999";
        confetti.style.width = Math.random() * 7 + 3 + "px";
        confetti.style.height = Math.random() * 13 + 5 + "px";

        confetti.style.left = "50%";
        confetti.style.top = "50%";

        confetti.style.background =
            ["#f2c7d3", "#ffffff", "#d889a2", "#ffd9e3"]
            [Math.floor(Math.random() * 4)];

        confetti.style.pointerEvents = "none";

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 450;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        confetti.animate(
            [
                {
                    transform:
                        `translate(0,0) rotate(0deg)`,
                    opacity: 1
                },
                {
                    transform:
                        `translate(${x}px,${y}px) rotate(${Math.random() * 900}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: 1200 + Math.random() * 1200,
                easing: "cubic-bezier(.15,.7,.3,1)"
            }
        );

        setTimeout(() => {
            confetti.remove();
        }, 2600);

    }

}


/* =========================================
   VOICE NOTE
========================================= */

const voiceAudio = document.getElementById("voiceAudio");
const voiceButton = document.getElementById("voiceButton");
const voiceBars = document.getElementById("voiceBars");

voiceButton.addEventListener("click", async () => {

    try {

        if (voiceAudio.paused) {

            await voiceAudio.play();

            voiceBars.classList.add("playing");

            voiceButton.querySelector("span").textContent = "Ⅱ";

        } else {

            voiceAudio.pause();

            voiceBars.classList.remove("playing");

            voiceButton.querySelector("span").textContent = "▶";

        }

    } catch (error) {

        console.log("Voice note could not play:", error);

    }

});

voiceAudio.addEventListener("ended", () => {

    voiceBars.classList.remove("playing");

    voiceButton.querySelector("span").textContent = "▶";

});



/* =========================================
   PARALLAX HERO
========================================= */

const heroImage = document.querySelector(".hero-background img");

window.addEventListener("scroll", () => {

    if (!heroImage) return;

    if (window.scrollY < window.innerHeight) {

        heroImage.style.transform =
            `scale(1.03) translateY(${window.scrollY * .08}px)`;

    }

});


/* =========================================
   PREVENT BROKEN MEDIA FROM LOOKING UGLY
========================================= */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.background =
            "linear-gradient(135deg,#191919,#333)";

        img.style.minHeight = "200px";

        img.removeAttribute("src");

    });

});


/* =========================================
   SMOOTH ANCHOR OFFSET
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});