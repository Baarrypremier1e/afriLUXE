// Configuration
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000; // 5s pour test

let count = 0;
let memoryState = { toasts: [] };
const listeners = [];

const toastTimeouts = new Map();

// Génération ID unique
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}

// Ajouter timeout pour retirer toast
function addToRemoveQueue(toastId) {
    if (toastTimeouts.has(toastId)) return;

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        removeToast(toastId);
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeout);
}

// Ajouter toast
function addToast(toast) {
    const id = genId();
    const newToast = { ...toast, id, open: true };
    memoryState.toasts = [newToast, ...memoryState.toasts].slice(0, TOAST_LIMIT);
    updateListeners();
    addToRemoveQueue(id);
    renderToasts();
    return id;
}

// Dismiss toast
function dismissToast(toastId) {
    memoryState.toasts = memoryState.toasts.map(t =>
        t.id === toastId ? { ...t, open: false } : t
    );
    updateListeners();
    renderToasts();
}

// Remove toast
function removeToast(toastId) {
    memoryState.toasts = memoryState.toasts.filter(t => t.id !== toastId);
    updateListeners();
    renderToasts();
}

// Mettre à jour tous les listeners
function updateListeners() {
    listeners.forEach(fn => fn(memoryState));
}

// Listener externe
function onToastChange(fn) {
    listeners.push(fn);
    return () => {
        const index = listeners.indexOf(fn);
        if (index > -1) listeners.splice(index, 1);
    };
}

// Affichage HTML
function renderToasts() {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.style.position = "fixed";
        container.style.top = "20px";
        container.style.right = "20px";
        container.style.zIndex = "9999";
        document.body.appendChild(container);
    }

    container.innerHTML = "";

    memoryState.toasts.forEach(t => {
        if (!t.open) return;
        const div = document.createElement("div");
        div.style.background = "#333";
        div.style.color = "#fff";
        div.style.padding = "12px 20px";
        div.style.marginBottom = "10px";
        div.style.borderRadius = "5px";
        div.style.minWidth = "200px";
        div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        div.textContent = t.title || "Notification";

        // bouton fermer
        const btn = document.createElement("button");
        btn.textContent = "✕";
        btn.style.marginLeft = "10px";
        btn.style.background = "transparent";
        btn.style.border = "none";
        btn.style.color = "#fff";
        btn.style.cursor = "pointer";
        btn.onclick = () => dismissToast(t.id);
        div.appendChild(btn);

        container.appendChild(div);
    });
}

// API publique
function toast({ title }) {
    return addToast({ title });
}

export { toast, onToastChange, dismissToast };
