const elements = document.querySelectorAll('.scroll-items');

const observar = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.3
});

elements.forEach((element) => {
    observar.observe(element);
});