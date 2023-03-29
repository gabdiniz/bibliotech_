import { addDoc, getDocs } from "firebase/firestore";
import { emprestimosCollection } from "./collections";

export async function addEmprestimo(data) {
  await addDoc(emprestimosCollection, data);
}

export async function getEmprestimos() {
  const snapshot = await getDocs(emprestimosCollection);
  let emprestimos = [];
  snapshot.forEach(doc => {
    emprestimos.push({ ...doc.data(), id: doc.id });
  });
  return emprestimos;
}