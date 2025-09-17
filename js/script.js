// CÓDIGO PARA O MENU HAMBURGUER RETRAIR AUTOMATICAMENTE APÓS UMA OPÇÃO SER CLICADA
// Pega todos os links dentro do menu
const menuLinks = document.querySelectorAll('.lista-menu a');
const toggle = document.querySelector('.menu-toggle');

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
    toggle.checked = false; // Desmarca o checkbox -> fecha o menu
    });
});


// === Máscara do WhatsApp ===
const input = document.getElementById('whatsapp');
input.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);

    if (v.length >= 2) {
        const ddd = v.slice(0, 2);
        let meio, fim;

        if (v.length === 11) {
            meio = v.slice(2, 7);
            fim  = v.slice(7);
            e.target.value = `(${ddd}) ${meio}-${fim}`;
        } else if (v.length === 10) {
            meio = v.slice(2, 6);
            fim  = v.slice(6);
            e.target.value = `(${ddd}) ${meio}-${fim}`;
        } else if (v.length > 2) {
            e.target.value = `(${ddd}) ${v.slice(2)}`;
        } else {
            e.target.value = `(${ddd}`;
        }
    } else {
        e.target.value = v;
    }
});


// Configuração do Supabase
const SUPABASE_URL = "https://dxsanhugpccgaubffakm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4c2FuaHVncGNjZ2F1YmZmYWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODE5NTMsImV4cCI6MjA3MjY1Nzk1M30._5F2WJAzc8hi_bv_DOT9jDdflKKukJa2ciKRDeLkBLc";

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Captura o formulário
const form = document.querySelector(".form-contato");

form.addEventListener("submit", async (e) => {
e.preventDefault(); // evita reload da página

// Pega os valores dos inputs
const nome = document.getElementById("nome").value.trim();
const whatsapp = document.getElementById("whatsapp").value.trim();
const email = document.getElementById("email").value.trim();

console.log("Enviando para Supabase:", { nome, whatsapp, email });

// Envia para o Supabase
const { data, error } = await db
    .from("Leads")
    .insert([{ nome, whatsapp, email }]);

if (error) {
    alert("❌ Erro ao enviar: " + error.message);
    console.error(error);
} else {
    alert("✅ Formulário enviado com sucesso!");
    form.reset(); // limpa os campos
}
});