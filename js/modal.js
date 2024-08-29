// Modal Logic
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const imageCaption = document.getElementById('imageCaption');

// Open Modal
function openModal(url, title) {
    imageModal.classList.add('show');
    modalImage.src = url;
    imageCaption.textContent = title;
}

// Close Modal
imageModal.querySelector('.close').addEventListener('click', () => {
    imageModal.classList.remove('show');
});

