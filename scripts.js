// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfcZnhs-3OCeE5jsxaPR76E_wCKw87bPA",
  authDomain: "anchor-upload.firebaseapp.com",
  projectId: "anchor-upload",
  storageBucket: "anchor-upload.appspot.com",
  messagingSenderId: "701384851748",
  appId: "1:701384851748:web:22f331245f29fa68c873b1",
  measurementId: "G-2RJVS20D7E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Elements
const loginForm = document.getElementById('loginForm');
const uploadForm = document.getElementById('uploadForm');
const gallery = document.getElementById('gallery');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const imageCaption = document.getElementById('imageCaption');
const logoutBtn = document.getElementById('logoutBtn');

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.querySelector('.upload-container').classList.remove('hidden');
            document.querySelector('.gallery-container').classList.remove('hidden');
            loginForm.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            loadGallery();
        })
        .catch(error => {
            alert(error.message);
        });
});

// Logout
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        document.querySelector('.upload-container').classList.add('hidden');
        document.querySelector('.gallery-container').classList.add('hidden');
        loginForm.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    });
});

// Upload Image
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = uploadForm['imageUpload'].files[0];
    const title = uploadForm['imageTitle'].value;

    const storageRef = storage.ref('images/' + file.name);
    storageRef.put(file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
            db.collection('images').add({
                title: title,
                imageUrl: url,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert('Image uploaded successfully!');
                loadGallery();
            });
        });
    });
});

// Load Gallery
function loadGallery() {
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

// Monitor Auth State
auth.onAuthStateChanged(user => {
    if (user) {
        document.querySelector('.upload-container').classList.remove('hidden');
        document.querySelector('.gallery-container').classList.remove('hidden');
        loginForm.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        loadGallery();
    } else {
        document.querySelector('.upload-container').classList.add('hidden');
        document.querySelector('.gallery-container').classList.add('hidden');
        loginForm.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
});
