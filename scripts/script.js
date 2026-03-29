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


const timer = (() => {
    // Set the date we're counting down to
    var countDownDate = new Date("Apr 03, 2026 12:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("timer").innerHTML ="Faltan " + days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
})();

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwknrQ_jAm_54aHaVSB-APOV9G5gfeoLJ8ImSw5-UMJ61XY_lN9nzQVIDSoabOLY1QOTg/exec";


async function sendToGoogleSheets(payload, thanksId) {
    // 1. Ocultar los formularios actuales
    document.getElementById('section-si').classList.add('hidden');
    document.getElementById('section-no').classList.add('hidden');

    const formId = thanksId === 'thanks-si' ? 'form-si' : 'form-no';
    const form = document.getElementById('form-no');
    
    try {
        // 2. Enviar datos al script de Google
        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', 
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        form.reset();
        // 3. Mostrar el mensaje de éxito correspondiente
        const thanksSection = document.getElementById(thanksId);
        thanksSection.classList.remove('hidden');
        setTimeout(() => thanksSection.style.opacity = '1', 50);

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar los datos, intenta de nuevo.');
        // En caso de error, podrías volver a mostrar el formulario aquí
    }
}

// Manejador para el Formulario SÍ (Tiene otros planes)
document.getElementById('form-si').addEventListener('submit', function(e) {
    e.preventDefault();
    const payload = {
        nombre: this.querySelector('input').value,
        planes: this.querySelector('textarea').value,
        cantidad: "" 
    };
    sendToGoogleSheets(payload, 'thanks-si');
});

// Manejador para el Formulario NO (Confirmar asistencia)
document.getElementById('form-no').addEventListener('submit', function(e) {
    e.preventDefault();
    const payload = {
        nombre: this.querySelector('input[type="text"]').value,
        cantidad: this.querySelector('input[type="number"]').value,
        planes: "" 
    };
    if (payload["cantidad"]==0){
        sendToGoogleSheets(payload, 'thanks-si');
        
    }else{

        sendToGoogleSheets(payload, 'thanks-no');
    }
});

// Mantén aquí tu función showSection() y la del Timer que armamos antes...