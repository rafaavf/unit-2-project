import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, getDocs,} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { getStorage, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDpgNLmYYUZF0WleyDSXAb-iyA5VUNgQBo",
    authDomain: "projeto-586e9.firebaseapp.com",
    databaseURL: "https://projeto-586e9-default-rtdb.firebaseio.com",
    projectId: "projeto-586e9",
    storageBucket: "projeto-586e9.appspot.com",
    messagingSenderId: "835426278469",
    appId: "1:835426278469:web:95beaa7ebb4467775d172c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

const postsSnapshot = await getDocs(collection(db, 'posts'));
const postCol = postsSnapshot.docs.map(doc => doc.data());

console.log(postCol)

postCol.forEach(i => {
    const postDiv = document.createElement('div');
    postDiv.className = 'postStyle'

    const newDiv = document.createElement('div');
    newDiv.className = 'newDiv';

    const title = document.createElement('u');
    title.className = 'titleStyle';
    title.textContent = i.title;

    const titleDiv = document.createElement('div');
    titleDiv.className = 'titleDiv'

    const author = document.createElement('u');
    author.className = 'authorStyle';
    author.textContent = 'by: ' + i.author;

    const authorDateDiv = document.createElement('div');
    authorDateDiv.className = 'authorDiv';

    const br = document.createElement('u')
    br.textContent = '⁺‧₊˚ ཐི⋆♱⋆ཋྀ ˚₊‧⁺'
    br.className = 'breakStyle'

    const textDiv = document.createElement('div');
    textDiv.className = 'textDiv';

    const date = document.createElement('u');
            date.className = 'dateStyle';
            date.textContent = 'Posted: ' + i.date.toDate().toLocaleDateString("en-US")

    const separator = document.createElement('u')
    separator.textContent = '||'
    separator.className = 'separatorStyle'

    document.getElementById('content')
        .appendChild(postDiv)
        .appendChild(newDiv)
        .appendChild(titleDiv)
        .appendChild(title)

    newDiv.appendChild(authorDateDiv)
    authorDateDiv.appendChild(author);
    authorDateDiv.appendChild(separator)
    authorDateDiv.appendChild(date);

    newDiv.appendChild(br);
    newDiv.appendChild(textDiv);

    x = 0;
    i.text.split('</br>').forEach(textSegment => {
        const paragraph = document.createElement('p');  
        console.log(textSegment)
        paragraph.className = 'textStyle';
        paragraph.textContent = textSegment;
        x != 0
        ? textDiv.appendChild(document.createElement('br'))
        : pass;
        textDiv.appendChild(paragraph);  

    
    const imageDiv = document.createElement('div');
    imageDiv.className = 'imageDiv';
    if i.hasImg {
        newDiv.append(imageDiv);

        imagesList = getImagesFromStorageFolder('images/'+i.id)
        imagesList.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            img.className = "imageStyle";
            imageDiv.append(img);
        })
    }
    });
})

async function getImagesFromStorageFolder(path) {
    const folderRef = storage.ref(path); 

    try {
        // Get all items in the folder
        const result = await folderRef.listAll();
        const imageUrls = [];

        // Iterate over each item (file) in the folder and get its download URL
        for (const itemRef of result.items) {
            const url = await itemRef.getDownloadURL();
            imageUrls.push(url); // Add the URL to the list
        }

        return imageUrls; // Returns an array of image URLs
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Call the function to get and display images
getImagesFromStorageFolder().then((urls) => {
    const galeria = document.getElementById('galeria'); // Your HTML div
    urls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.style.height = '200px';
        img.style.margin = '10px';
        galeria.appendChild(img); // Append images to the div
    });
});
