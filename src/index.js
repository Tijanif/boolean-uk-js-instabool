// // write your code here

// const imgageContainer = document.querySelector('.image-container');

// fetch('http://localhost:3000/images')
//   .then(function (promise) {
//     let data = promise.json();
//     return data;
//   })
//   .then(function (data) {
//     for (const item of data) {
//       imgageContainer.append(cardFunction(item));
//     }
//   });

// // card
// function cardFunction(item) {
//   // Article section
//   const article = document.createElement('article');
//   article.classList = 'image-card';

//   // h2
//   const h2 = document.createElement('h2');
//   h2.classList = item.title;

//   //image
//   const image = document.createElement('img');
//   image.src = item.image;
//   image.classList = 'image';

//   // div section
//   const divSectionLikes = document.createElement('div');
//   divSectionLikes.classList = 'likes-section';

//   // div section children
//   const divSpan = document.createElement('span');
//   divSpan.classList = 'likes';
//   divSpan.innerText = item.likes;

//   const divButton = document.createElement('button');
//   divButton.classList = 'likes-button';
//   divButton.innerText = '♥';

//   divSectionLikes.append(divSpan, divButton);

//   // Ul section
//   const ulSection = document.createElement('ul');
//   ulSection.classList = 'comments';

//   for (const comment of item.comments) {
//     const listElement = document.createElement('li');
//     listElement.innerText = comment.content;
//     ulSection.append(listElement);
//   }

//   // form
//   const formSection = document.createElement('form');
//   formSection.classList = 'comment-form';

//   // form intput
//   const formInput = document.createElement('input');
//   formInput.classList = 'comment-input';
//   formInput.setAttribute('type', 'text');
//   formInput.setAttribute('name', 'comment');
//   formInput.setAttribute('placeholder', 'Add a comment...');

//   // form button
//   const formBotton = document.createElement('button');
//   formBotton.setAttribute('class', 'comment-botton');
//   formBotton.setAttribute('type', 'submit');
//   formBotton.innerText = 'Post';

//   formSection.append(formInput, formBotton);

//   article.append(h2, image, divSectionLikes, ulSection, formSection);

//   return article;
// }

// write your code here
const imageContainerEl = document.querySelector('.image-container');
const imageForm = document.querySelector('.comment-form');

function createLikesSection(imageData) {
  const divEl = document.createElement('div');
  divEl.setAttribute('class', 'likes-section');

  const likesEl = document.createElement('span');
  likesEl.setAttribute('class', 'likes');
  likesEl.innerText = `${imageData.likes} likes`;

  const likeBtn = document.createElement('button');
  likeBtn.setAttribute('class', 'like-button');
  likeBtn.innerText = '♥';

  divEl.append(likesEl, likeBtn);

  likeBtn.addEventListener('click', function (e) {
    e.preventDefault();

    fetch(`http://localhost:3000/images/${imageData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: imageData.likes + 1,
      }),
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (imageData) {
        getImages();
      });
  });

  return divEl;
}

// create a single cards
function createSingleCard(imageData) {
  const articleEl = document.createElement('article');
  articleEl.setAttribute('class', 'image-card');

  const h2El = document.createElement('h2');
  h2El.setAttribute('class', 'title');
  h2El.innerText = imageData.title;

  const imageEl = document.createElement('img');
  imageEl.setAttribute('class', 'image');
  imageEl.setAttribute('src', imageData.image);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'DELETE';

  const likesSectionEl = createLikesSection(imageData);

  const ulEl = document.createElement('ul');
  ulEl.setAttribute('class', 'comments');

  for (const comment of imageData.comments) {
    const liEl = document.createElement('li');
    liEl.innerText = comment.content;
    ulEl.append(liEl);
  }

  // form
  const formSection = document.createElement('form');
  formSection.classList = 'comment-form';
  // form intput
  const formInput = document.createElement('input');
  formInput.classList = 'comment-input';
  formInput.setAttribute('type', 'text');
  formInput.setAttribute('name', 'comment');
  formInput.setAttribute('placeholder', 'Add a comment...');
  // form button
  const formBotton = document.createElement('button');
  formBotton.setAttribute('class', 'comment-botton');
  formBotton.setAttribute('type', 'submit');
  formBotton.innerText = 'Post';
  formSection.append(formInput, formBotton);

  articleEl.append(h2El, imageEl, likesSectionEl, ulEl, formSection, deleteBtn);

  imageContainerEl.append(articleEl);

  formSection.addEventListener('submit', function (e) {
    e.preventDefault();
    let id = imageData.id;
    const commentToCreate = {
      content: formInput.value,
      imageId: id,
    };

    fetch(`http://localhost:3000/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentToCreate),
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(function () {
        getImages();
      });

    formSection.reset();
  });

  deleteBtn.addEventListener('click', function () {
    fetch(`http://localhost:3000/images/${imageData.id}`, {
      method: 'DELETE',
    }).then(function (response) {
      if (response.ok) {
        liEl.remove();
      } else {
        alert('Something went wrong...');
      }
    });
  });
}

function listenToAddImagesForm() {
  imageForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const imageData = {
      title: imageForm.title.value,
      image: imageForm.image.value,
      likes: 0,
    };

    fetch('http://localhost:3000/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageData),
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(function () {
        getImages();
        // createSingleCard(imageData);
      });

    imageForm.reset();
  });
}
// create multiple cards
function createMultipleCards(imagesData) {
  for (const imageData of imagesData) {
    createSingleCard(imageData);
  }
}

// get images from the server
function getImages() {
  imageContainerEl.innerHTML = '';
  fetch('http://localhost:3000/images')
    .then(function (response) {
      return response.json();
    })
    .then(function (images) {
      createMultipleCards(images);
    });
}

listenToAddImagesForm();
getImages();
