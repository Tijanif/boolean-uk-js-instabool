// write your code here

const imageCardContainer = document.querySelector(".image-container")

fetch("http://localhost:3000/images")
.then(function(promise){
 let array = promise.json()
 return array
}).then(function (array){

 

})

// card
function card () {
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

      // form
      const formSection = document.createElement('form')
      formSection.classList = 'comment-form'

      // form intput
      const formInput = document.createElement('input')
      formInput.classList = 'comment-input'
      formInput.setAttribute('type', 'text')
      formInput.setAttribute('name', 'comment')
      formInput.setAttribute('placeholder', "Add a comment...")

      // form button
      const formBotton = document.createElement('button')
      formBotton.setAttribute('class', 'comment-botton')
      formBotton.setAttribute('type', 'submit')
      formBotton.innerText = 'Post'

      formSection.append(formInput, formBotton)

      article.append(h2, image,divSectionLikes, formSection )
      
}