
document.addEventListener("DOMContentLoaded", function () {
    // Зірки
    const stars = document.querySelectorAll('.stars .star');
    stars.forEach(star => {
        star.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= value) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Валідація форми
    const form = document.getElementById('feedbackForm');
    const notRobotCheckbox = document.getElementById('notRobot');
    const robotError = document.getElementById('robotError');

    if (form) {
        form.addEventListener('submit', function (event) {
            if (!notRobotCheckbox.checked) {
                event.preventDefault(); // Зупиняємо відправку форми
                robotError.style.display = 'block'; // Показуємо повідомлення про помилку
            } else {
                robotError.style.display = 'none'; // Ховаємо повідомлення про помилку
            }
        });
    }

    // Кнопка прокрутки
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 100) {
                scrollTopBtn.style.display = "flex";
            } else {
                scrollTopBtn.style.display = "none";
            }
        });

        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});



