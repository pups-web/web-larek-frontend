import { Api } from './components/base/api';
import { API_URL, CDN_URL } from './utils/constants';
import { ProductsList } from './types/index';
import { cloneTemplate } from './utils/utils';


function closeModal(modal: HTMLElement) {
    modal.classList.remove('modal_active');
}

document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll<HTMLElement>('.modal');
    modals.forEach((modal) => {
        const closeButton = modal.querySelector<HTMLButtonElement>('.modal__close');
        if (closeButton) {
            closeButton.addEventListener('click', () => closeModal(modal));
        }
    });
});
//
const apiClient = new Api(API_URL);

// Функция для получения данных с сервера и отображения карточек
async function fetchAndRenderCards() {
    try {
        // Получаем данные карточек с сервера
        const response = await apiClient.getProduct();
        console.log('Ответ сервера:', response);

        const products = response.items.map((item) => ({
            ...item,
            image: `${CDN_URL}${item.image}`, // Добавляем полный путь к изображению
        }));

        // Отображаем карточки
        renderCards(products);
    } catch (error) {
        console.error('Ошибка при получении данных с сервера:', error);
    }
}
// Функция для отображения карточек
function renderCards(products: ProductsList[]) {
    const gallery = document.querySelector<HTMLElement>('.gallery');
    if (!gallery) {
        console.error('Элемент .gallery не найден');
        return;
    }

    // Очищаем галерею перед добавлением новых карточек
    gallery.innerHTML = '';

    products.forEach((product) => {
        // Клонируем шаблон карточки
        const cardElement = cloneTemplate<HTMLButtonElement>('#card-catalog');

        // Заполняем данные карточки
        const titleElement = cardElement.querySelector('.card__title');
        const categoryElement = cardElement.querySelector('.card__category');
        const priceElement = cardElement.querySelector('.card__price');
        const imageElement = cardElement.querySelector('.card__image') as HTMLImageElement;

        if (titleElement) titleElement.textContent = product.title;
        if (categoryElement) categoryElement.textContent = product.category;
        if (priceElement) priceElement.textContent = `${product.price} синапсов`;
        if (imageElement) imageElement.src = product.image;

        // Добавляем карточку в галерею
        gallery.appendChild(cardElement);
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderCards();
});
