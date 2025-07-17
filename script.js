function prevSlide() {
    alert('Previous Banner');
}
function nextSlide() {
    alert('Next Banner');
}

function updateMoisture(moisture) {
    const circle = document.getElementById('moisture-fill');
    const text = document.getElementById('moisture-percentage');
    const percentage = Math.max(0, Math.min(100, moisture));
    circle.setAttribute('stroke-dasharray', `${percentage}, 100`);
    text.textContent = `${percentage}%`;
}

// Example usage:
updateMoisture(20);


// Setup Water Pump
const home_panel = document.getElementById("home-panel");
const setup_irrigation = document.querySelector(".setup-irrigation");
const btn_setup_waterpump = document.getElementById("setup-waterpump");
const close_setup_waterpump = document.getElementById("close-waterpump-setup");
const setup_box = setup_irrigation.querySelector(".setup-box");
console.log(setup_box);

function openclose_setup(checker) {
    if (checker) {
        setup_irrigation.classList.remove('hidden');
        home_panel.classList.add('blur-sm');
        setTimeout(() => {
            setup_box.classList.remove('-translate-y-full', 'opacity-0');
            setup_box.classList.add('translate-y-0', 'opacity-100');
        }, 50);
    } else {
        setup_box.classList.remove('translate-y-0', 'opacity-100');
        setup_box.classList.add('-translate-y-full', 'opacity-0');
        home_panel.classList.remove('blur-sm');
        setTimeout(() => {
            setup_irrigation.classList.add('hidden');
        }, 500);
    }
}

btn_setup_waterpump.addEventListener("click", function() {
    openclose_setup(1);
});

close_setup_waterpump.addEventListener("click",function() {
    openclose_setup(0);
});