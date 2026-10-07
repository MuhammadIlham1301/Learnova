// File JavaScript utama untuk Learnova
// Berisi interaksi UI dan simulasi data/fungsi

// ==== KONFIGURASI API TERPUSAT (satu-satunya sumber window.API_BASE) ====
// - Local development (file:// atau hostname localhost/127.0.0.1): http://localhost:3000/api
// - Production: isi LEARNOVA_API_BASE_PRODUCTION dengan URL backend Vercel
//   (diisi SETELAH project backend di-deploy), atau set window.LEARNOVA_API_BASE
//   sebelum skrip ini dimuat. Jika keduanya kosong: path relatif '/api' (same-origin).
const LEARNOVA_API_BASE_PRODUCTION = '';
window.API_BASE = (function () {
    const host = window.location.hostname;
    const isLocal = window.location.protocol === 'file:'
        || host === '' || host === 'localhost' || host === '127.0.0.1';
    if (isLocal) return 'http://localhost:3000/api';
    const production = window.LEARNOVA_API_BASE || LEARNOVA_API_BASE_PRODUCTION || '/api';
    return production.replace(/\/+$/, '');
})();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Mobile Menu Toggle
    initMobileMenu();

    // 2. Inisialisasi Form Login (hanya simulasi untuk halaman non-login)
    // login.html memiliki handler API-based sendiri, jadi skip di halaman login
    if (!window.location.pathname.includes('login.html')) {
        initLoginForm();
    }

    // 3. Tampilkan nama user yang login pada elemen [data-user-name] (fallback: nama dummy)
    initUserGreeting();

    // 4. Isi inisial avatar pada elemen [data-user-initials] (fallback: teks default di HTML)
    initUserInitials();
});

/**
 * Mengisi inisial avatar user dari localStorage ke elemen [data-user-initials].
 * Contoh: "Mohammad Givi Efgivia" -> "MG". Tanpa sesi, teks default di HTML tetap.
 */
function initUserInitials() {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('learnova_user'));
    } catch (e) {
        user = null;
    }

    if (!user || !user.name) return;

    const words = user.name.split(/\s+/).filter(Boolean);
    if (words.length === 0) return;
    const initials = words.length >= 2
        ? words[0][0] + words[1][0]
        : words[0][0];

    document.querySelectorAll('[data-user-initials]').forEach(el => {
        el.textContent = initials.toUpperCase();
    });
}

/**
 * Mengisi nama user dari localStorage (disimpan saat login API)
 * ke semua elemen dengan atribut data-user-name.
 * Jika belum login / localStorage kosong, nama default di HTML tetap tampil.
 */
function initUserGreeting() {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('learnova_user'));
    } catch (e) {
        user = null;
    }

    if (!user || !user.name) return;

    document.querySelectorAll('[data-user-name]').forEach(el => {
        el.textContent = user.name;
    });
}

/**
 * Fungsi untuk menangani toggle menu navigasi di tampilan mobile
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle visibility class tailwind 'hidden'
            mobileMenu.classList.toggle('hidden');
        });

        // Menutup menu jika link di dalam mobile menu diklik
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

/**
 * Fungsi untuk validasi form login simulasi
 */
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah reload halaman

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Reset state error terlebih dahulu
            loginError.classList.add('hidden');
            emailInput.classList.remove('border-red-500', 'bg-red-50');
            passwordInput.classList.remove('border-red-500', 'bg-red-50');

            // Cek kondisi kosong
            if (!email || !password) {
                // Tampilkan pesan error
                loginError.classList.remove('hidden');
                
                // Highlight form yang kosong
                if (!email) {
                    emailInput.classList.add('border-red-500', 'bg-red-50');
                }
                if (!password) {
                    passwordInput.classList.add('border-red-500', 'bg-red-50');
                }
            } else {
                // Jika valid (tidak kosong), langsung redirect ke dashboard
                window.location.href = 'dashboard.html';
            }
        });
    }
}

/**
 * Simulasi fungsi registrasi (Sesuai kebutuhan tugas: simulasi sederhana)
 */
function simulateRegister() {
    alert("📝 Simulasi Pendaftaran Akun\n\nSistem registrasi ini berupa simulasi UI untuk tugas. Silakan gunakan kredensial sembarang (asal tidak kosong) untuk Masuk.");
}

/**
 * Simulasi fitur lupa password
 */
function simulateForgotPassword() {
    alert("🔒 Simulasi Lupa Password\n\nFitur reset password saat ini hanya berupa simulasi antarmuka. Dalam penerapan nyata, sistem akan mengirimkan instruksi pemulihan ke email Anda.");
}
