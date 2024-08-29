// Load Gallery
function loadGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    db.collection('images').orderBy('timestamp', 'desc').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const data = doc.data();
            const img = document.createElement('img');
            img.src = data.imageUrl;
            img.alt = data.title;
            img.addEventListener('click', () => {
                openModal(data.imageUrl, data.title);
            });
            gallery.appendChild(img);
        });
    });
}

// Load gallery when page loads
window.onload = loadGallery;

