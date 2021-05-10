// write your code here

const imageCardContainer = document.querySelector(".image-container")

fetch("http://localhost:3000/images")
.then(function(promise){
 let array = promise.json()
 return array
}).then(function (array){
 // console.log(array)
})

// card

      /* <article class="image-card">
        <h2 class="title">Title of image goes here</h2>
        <img src="./assets/image-placeholder.jpg" class="image" />
        <div class="likes-section">
          <span class="likes">0 likes</span>
          <button class="like-button">♥</button>
        </div>
        <ul class="comments">
          <li>Get rid of these comments</li>
          <li>And replace them with the real ones</li>
          <li>From the server</li>
        </ul>
        <form class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button class="comment-button" type="submit">Post</button>
        </form>
      </article> */

      // Article section
      const article = document.createElement('article')
      article.classList ='image-card'
      
      // h2
      const h2 = document.createElement('h2')
      h2.classList = 'title'

      //image
      const image = document.createElement('img')
      image.src = ''
      image.classList = 'image'

      // div section
      const divSectionLikes = document.createElement('div')
      divSectionLikes.classList = 'likes-section'

      // div section children
      const divSpan = document.createElement('span')
      divSpan.classList = 'likes'

      const divButton = document.createElement('button')
      divButton.classList = 'likes-button'
      divButton.innerText = '♥'

      divSectionLikes.append(divSpan, divButton)

      // Ul section
      const ulSection = document.createElement('ul')
      ulSection.classList = 'comments'

      const ulLiEl = document.createElement('li')
      ulLiEl.innerText = 'Get rid of these comments'

      ulSection.append(ulLiEl)