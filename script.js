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


// Banner Functionality
let banners = ["image/banner/banner0.png", "image/banner/banner1.png", "image/banner/banner2.png", "image/banner/banner3.png", "image/banner/banner4.jpg"];
let currentIndex = 0;
let sliderInterval;
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const banner_box = document.getElementById('banner-img')
console.log(banner_box);

function functBtn() {
    prevBtn.addEventListener("click", () => {
        prevSlide();
    });
    nextBtn.addEventListener("click", () => {
        nextSlide();
    });
}

function updateBanner() {
    banner_box.src = banners[currentIndex];
    for (let i = 0; i < banners.length; i++) {
        document.getElementById(`dot-${i}`).classList.remove('bg-gray-700');
        document.getElementById(`dot-${i}`).classList.remove('w-9');
        document.getElementById(`dot-${i}`).classList.remove('active');
        document.getElementById(`dot-${i}`).classList.add('bg-gray-400');
        document.getElementById(`dot-${i}`).classList.add('w-3');
    }
    document.getElementById(`dot-${currentIndex}`).classList.add('bg-gray-700');
    document.getElementById(`dot-${currentIndex}`).classList.add('w-9');
    document.getElementById(`dot-${currentIndex}`).classList.add('active');
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + banners.length) % banners.length;
    updateBanner();
    resetAutoSlider();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % banners.length;
    updateBanner();
    resetAutoSlider();
}

function startAutoSlider() {
    sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % banners.length;
        updateBanner();
    }, 3000); // Change slide every 3 seconds
}

function resetAutoSlider() {
    clearInterval(sliderInterval);
    startAutoSlider();
}

// Touch swipe functionality
let startX = 0;
document.getElementById('banner-container').addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
});

document.getElementById('banner-container').addEventListener('touchend', function (e) {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
        nextSlide();
    } else if (endX - startX > 50) {
        prevSlide();
    }
});

functBtn();
updateBanner();
startAutoSlider();


// Irrigation: Water Supply Checker
let waterSupply_checker = false;


// Setup Water Pump
const home_panel = document.getElementById("home-panel");
const setup_irrigation = document.querySelector(".setup-irrigation");
const btn_setup_waterpump = document.getElementById("setup-waterpump");
const close_setup_waterpump = document.getElementById("close-waterpump-setup");
const setup_box = setup_irrigation.querySelector(".setup-box");

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

btn_setup_waterpump.addEventListener("click", function () {
    openclose_setup(1);
});

close_setup_waterpump.addEventListener("click", function () {
    openclose_setup(0);
});


// Notification Function
function showToast(text) {
    const toast = document.getElementById('toast');
    toast.innerText = text;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000); // auto hide after 3 seconds
}


// Function that start irrigation manually
const start_irrigation = document.getElementById('start-irrigation');

function startIrrigation() {
    showToast('Now, Irrigation Started');
}

start_irrigation.addEventListener("click", () => {
    if (waterSupply_checker == false) {
        waterSupply_checker = true;
        startIrrigation();
    } else {
        showToast('Already, Irrigation Working');
    }
});


// Function that stop irrigation on emergency 
const  stop_irrigation = document.getElementById("stop-irrigation");

function stopIrrigation() {
    showToast('Successfully, Irrigation Stopped');
}

stop_irrigation.addEventListener("click", () => {
    if (waterSupply_checker) {
        waterSupply_checker = false;
        stopIrrigation();
    } else {
        showToast('Already, Irrigation Not Stopped');
    }
});