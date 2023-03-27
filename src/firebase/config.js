
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Chave de acesso ao firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5yD-2raYOGjaN-fB6YV3bV9O28KEBurM",
  authDomain: "bibliotech-gabriel.firebaseapp.com",
  projectId: "bibliotech-gabriel",
  storageBucket: "bibliotech-gabriel.appspot.com",
  messagingSenderId: "370352116473",
  appId: "1:370352116473:web:104d2f2cef3e10bc520828"
};

// Inicializa o app com base nas configurações acima 
export const app = initializeApp(firebaseConfig);
// Configurando o Authentication e seus recursos de login e cadastro
export const auth = getAuth(app);
// Configura o Firestore e seus recursos de bando de dados
export const db = getFirestore(app);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);