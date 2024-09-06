import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, getDocs,} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

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

    i.text.split('</br>').forEach(textSegment => {
        const paragraph = document.createElement('p');  
        console.log(textSegment)
        paragraph.className = 'textStyle';
        paragraph.textContent = textSegment;
        textDiv.appendChild(document.createElement('br'));
        textDiv.appendChild(paragraph);  
    });
})
