console.log('Client side javascript file is loaded')

//fetch is browser based api. can only be used on client side.
//not a serverside command
//brings browser to server

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{ //different callback syntax for fetch
//     response.json().then((data)=> {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form') //form is selector in css file
const search = document.querySelector('input') //input is a selector in the css file
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{ 
    //event listener runs client side code when an event occurs
    //there are many types of eventlistener functions.
    //ours is specific for when an event is submitted.  Submit is a standard event that operates when 
    //button is pressed
    e.preventDefault() //e is for event.  stops from refreshing the page


    const location = search.value //when the button is pressed whatever has been typed in the
    //text input is logged onto the screen

    messageOne.textContent = 'Loading...'
    messageOne.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((weatherObject)=>{
    weatherObject.json().then((data)=>{
        if (data.error){
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            }
        })
    })

})