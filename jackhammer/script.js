// --- Галерея ---
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainImage').querySelector('img');

thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        // Змінюємо src головного зображення
        const newSrc = thumb.querySelector('img').src;
        mainImage.src = newSrc;
    });
});

// --- Форма оренди ---
function rentTool() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000;
    `;
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white; padding: 3rem; border-radius: 15px;
        text-align: center; max-width: 500px;
        border: 3px solid var(--primary-yellow);
    `;
    modalContent.innerHTML = `
        <h2 style="margin-bottom: 1rem;">Оформлення оренди</h2>
        <p style="margin-bottom: 2rem;">Відбійний молоток професійний</p>
        <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
            <input type="text" placeholder="Ваше ім'я" required>
            <input type="tel" placeholder="Номер телефону" required>
            <input type="date" required>
            <select>
                <option value="1">1 день - 250 ₴</option>
                <option value="3">3 дні - 600 ₴</option>
                <option value="7">Тиждень - 1200 ₴</option>
                <option value="30">Місяць - 4000 ₴</option>
            </select>
        </div>
        <div style="display: flex; gap: 1rem;">
            <button onclick="document.body.removeChild(this.closest('.modal-overlay'))">Скасувати</button>
            <button onclick="submitRental()">Оформити</button>
        </div>
    `;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function submitRental() {
    alert("Дякуємо! Ваша заявка прийнята. Ми зв'яжемося з вами найближчим часом.");
    document.querySelector('.modal-overlay').remove();
}

// --- Зворотній дзвінок ---
function callBack() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000;
    `;
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white; padding: 3rem; border-radius: 15px;
        text-align: center; max-width: 400px;
        border: 3px solid var(--primary-yellow);
    `;
    modalContent.innerHTML = `
        <h2 style="margin-bottom: 1rem;">Замовити дзвінок</h2>
        <p style="margin-bottom: 2рем;">Наш менеджер зателефонує вам протягом 15 хвилин</p>
        <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
            <input type="text" placeholder="Ваше ім'я" required>
            <input type="tel" placeholder="Номер телефону" required>
        </div>
        <div style="display: flex; gap: 1rem;">
            <button onclick="document.body.removeChild(this.closest('.modal-overlay'))">Скасувати</button>
            <button onclick="submitCallback()">Замовити</button>
        </div>
    `;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function submitCallback() {
    alert("Дякуємо! Ми зв'яжемося з вами найближчим часом.");
    document.querySelector('.modal-overlay').remove();
}