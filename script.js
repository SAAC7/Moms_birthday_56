function showSection(option) {
    const step1 = document.getElementById('step-1');
    const sectionSi = document.getElementById('section-si');
    const sectionNo = document.getElementById('section-no');

    // Transición fluida: desvanecer primero
    step1.style.opacity = '0';
    
    setTimeout(() => {
        step1.classList.add('hidden');
        
        if (option === 'si') {
            sectionSi.classList.remove('hidden');
            setTimeout(() => sectionSi.style.opacity = '1', 50);
        } else {
            sectionNo.classList.remove('hidden');
            setTimeout(() => sectionNo.style.opacity = '1', 50);
        }
    }, 500);
}

// Aquí iría la conexión a Google Sheets (usando Fetch)
document.getElementById('form-no').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Datos enviados! (Aquí conectaríamos con tu Google Sheets)');
});