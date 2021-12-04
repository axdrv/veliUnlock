const slider = document.getElementById('slider');
const bar = document.getElementById('slider-bar');
const verifiedMsg = document.getElementById('verified-msg');
slider.classList.add('initial');
verifiedMsg.classList.remove('verified');
let sliderWidth = slider.offsetWidth;
let barWidth = bar.offsetWidth;
let verified = false;
slider.addEventListener('mousedown', function(event) {
    event.preventDefault();
    slider.classList.remove('initial');
    document.addEventListener('mousemove', moveSlider);
    document.addEventListener('mouseup', initSlider);
});
slider.addEventListener('touchstart', function(event) {
    event.preventDefault();
    slider.classList.remove('initial');
    document.addEventListener('touchmove', moveSlider);
    document.addEventListener('touchend', initSlider);
});

function moveSlider(event) {
    let barLeft = bar.getBoundingClientRect().left;
    let barRight = bar.getBoundingClientRect().right;
    let sliderMin = slider.getBoundingClientRect().left;
    let sliderMax = slider.getBoundingClientRect().right;
    let sliderX = (sliderMax - sliderMin) / 10;
    let eventPos = event.pageX - barLeft || event.changedTouches[0].pageX - barLeft;
    let marge = eventPos - sliderMin;
    slider.style.marginLeft = (eventPos - sliderX) + 'px';
    if (sliderMin - barLeft < -5) {
        initSlider();
    } else if (barRight - sliderMax <= 5) {
        document.removeEventListener('mousemove', moveSlider);
        document.removeEventListener('touchmove', moveSlider);
        document.removeEventListener('mouseup', initSlider);
        document.removeEventListener('touchend', initSlider);
        slider.style.marginLeft = barRight + 'px';
        bar.classList.add('verified');
        slider.classList.add('verified');
        verifiedMsg.classList.add('verified');
        verified = true;
    }
}

function initSlider() {
    dslider.style.marginLeft = 0 + 'px';
    slider.classList.add('initial');
    slider.classList.remove('verified');
    verifiedMsg.classList.remove('verified');
    bar.classList.remove('verified');
    document.removeEventListener('mousemove', moveSlider);
    document.removeEventListener('touchmove', moveSlider);
}