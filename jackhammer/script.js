const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainImage').querySelector('img');

thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const newSrc = thumb.querySelector('img').src;
        mainImage.src = newSrc;
    });
});

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

function isValidPhoneNumber(phone) {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phone);
}

function submitRental() {
    const modal = document.querySelector('.modal-overlay');
    const name = modal.querySelector('input[placeholder="Ваше ім\'я"]').value;
    const phone = modal.querySelector('input[placeholder="Номер телефону"]').value;

    if (!name || !phone) {
        alert("Будь ласка, заповніть усі поля.");
        return;
    }

    if (!isValidPhoneNumber(phone)) {
        alert("Будь ласка, введіть коректний номер телефону.");
        return;
    }

    const formData = new FormData();
    formData.append('tool', 'Відбійний молоток професійний');
    formData.append('price', '250 ₴ за добу');
    formData.append('name', name);
    formData.append('phone', phone);

    const telegramApiToken = '7965648457:AAGyy8boPO1T_4XmQBqVrgRkEOB3zVx5J3M';
    const chatId = '900891446'; // Ваш chat_id
    const telegramMessage = `
        Нова заявка на оренду:
        Інструмент: ${formData.get('tool')}
        Ціна: ${formData.get('price')}
        Ім'я: ${formData.get('name')}
        Телефон: ${formData.get('phone')}
    `;

    fetch(`https://api.telegram.org/bot${telegramApiToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("Дякуємо! Ваша заявка на оренду прийнята. Ми зв'яжемося з вами найближчим часом.");
        } else {
            alert("Помилка при відправці заявки. Спробуйте ще раз.");
        }
    })
    .catch(() => {
        alert("Помилка при відправці заявки. Спробуйте ще раз.");
    });

    modal.remove();
}

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
    const modal = document.querySelector('.modal-overlay');
    const name = modal.querySelector('input[placeholder="Ваше ім\'я"]').value;
    const phone = modal.querySelector('input[placeholder="Номер телефону"]').value;

    if (!name || !phone) {
        alert("Будь ласка, заповніть усі поля.");
        return;
    }

    if (!isValidPhoneNumber(phone)) {
        alert("Будь ласка, введіть коректний номер телефону.");
        return;
    }

    const telegramApiToken = '7965648457:AAGyy8boPO1T_4XmQBqVrgRkEOB3zVx5J3M';
    const chatId = '900891446';
    const telegramMessage = `
        Нова заявка на зворотній дзвінок:
        Ім'я: ${name}
        Телефон: ${phone}
    `;

    fetch(`https://api.telegram.org/bot${telegramApiToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("Дякуємо! Ми зв'яжемося з вами найближчим часом.");
        } else {
            alert("Помилка при відправці заявки. Спробуйте ще раз.");
        }
    })
    .catch(() => {
        alert("Помилка при відправці заявки. Спробуйте ще раз.");
    });

    modal.remove();
}