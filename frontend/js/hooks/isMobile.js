const MOBILE_BREAKPOINT = 768;

function useIsMobile(callback) {
// Détecter taille initiale
let isMobile = window.innerWidth < MOBILE_BREAKPOINT;
if (callback) callback(isMobile);


// Ajouter listener sur redimensionnement
function onResize() {
    const mobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (mobile !== isMobile) {
        isMobile = mobile;
        if (callback) callback(isMobile);
    }
}

window.addEventListener("resize", onResize);

// Retourner fonction pour cleanup
return () => {
    window.removeEventListener("resize", onResize);
};


}
