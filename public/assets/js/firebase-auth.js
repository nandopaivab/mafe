import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// TODO: O admin deve substituir essas variáveis pelos dados reais do projeto Firebase
// No futuro, essas variáveis podem ser injetadas pelo PHP vindo do .env
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const loginForm = document.getElementById('loginForm');
const btnGoogle = document.getElementById('btnGoogle');
const btnSubmit = document.getElementById('btnSubmit');
const alertMessage = document.getElementById('alertMessage');

function showAlert(message) {
    alertMessage.textContent = message;
    alertMessage.style.display = 'block';
}

function hideAlert() {
    alertMessage.style.display = 'none';
}

async function sendTokenToBackend(idToken) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ token: idToken })
        });

        const data = await response.json();

        if (response.ok) {
            // Sucesso! O backend gerou o cookie HttpOnly ou retornou sucesso.
            window.location.href = '/'; // Redireciona para o Dashboard
        } else {
            showAlert(data.message || 'Erro ao autenticar no servidor.');
            auth.signOut(); // Desloga do firebase também
        }
    } catch (error) {
        console.error(error);
        showAlert('Erro de comunicação com o servidor.');
    }
}

// Login com E-mail e Senha
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Autenticando...';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        await sendTokenToBackend(idToken);
    } catch (error) {
        showAlert('Credenciais inválidas ou erro no provedor.');
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Entrar no Sistema';
    }
});

// Login com Google
btnGoogle.addEventListener('click', async () => {
    hideAlert();
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        await sendTokenToBackend(idToken);
    } catch (error) {
        showAlert('Autenticação com Google cancelada ou falhou.');
    }
});
