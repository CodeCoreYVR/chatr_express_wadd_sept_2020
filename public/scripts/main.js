// Write chatr code here!

//XMLHttpRequest Function:

// The constructor XMLHttpRequest is available in the browser and can use JSON format too.
const getReq = new XMLHttpRequest()

getReq.addEventListener(
    // The 'load' event will be fired when we get a response back from this request.
    'load',
    function(){
        console.log(this.responseText)
    }
)

// 'open()' initializes the request and it takes two arguments, the HTTP verb and an api endpoit.
getReq.open(
    'GET',
    'https://pokeapi.co/api/v2/pokemon/mr-mime'
)

//Send the request:
getReq.send()

// jQuery's AJAX function:

$.ajax({
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon/mr-mime',
    // If the request is successful this function will be invoked right after.
    success(data){
        console.log(data)
    },
})

// Chatr-Express routes:
// GET /messages -> A JSON array of messages
// POST /messages -> A confirmation(creates a message)
// PATCH /messages/:id -> A confirmation(edit a message)
// DELETE /messages/:id -> A confirmation(delete a message)

// GET request

// Calling 'fetch' with a URL as its argument will make a GET request to that URL.
fetch('http://localhost:3434/messages')
//'fetch' returns an object that represents the HTTP response object.
// You can use the async method '.text()' or '.json()' to parse its body on the response.
// Don't forget to return it from the callback.
    .then(response => response.json())
    // .then(data => console.log(data))
    // This is the same as above. We can pass console.table as a callback because the way
    // 'console.table' is defined. It will log the argument that is passed to it.
    // If the data is specifically an array of objects, we can use 'console.table'
    // to output as a table format. 
    .then(console.table)


// POST request
// To make a POST request, we add an options object as a second argument to 'fetch()'.
fetch('http://localhost:3434/messages', {
    method: 'POST', // The HTTP verb
    headers: {
    // This HTTP header tells the server that we are sending json encoded data
    "Content-Type": "application/json",
    },
    // This is the body of the request, where we put out data.
    // 'JSON.stringify converts a JS object to a JSON string.
    // Our app takes a message object with a 'body' attribute to create in the database.
    body: JSON.stringify({body: "What's up?"}),
})    
// All our requests to messages
const Message = {
    // 'index()' method to get all the requests
    index(){
        return fetch('http://localhost:3434/messages')
        .then(response => response.json())
    },
    create(params){
        return fetch('/messages', { // We can omit the domain because '/' is on the same domain as the server
        method: 'POST', 
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
        })  
    },
    delete(id){
        return fetch(`/messages/${id}`, {
            method: 'DELETE',
        })
    },
}





document.addEventListener('DOMContentLoaded', () => {
    const messagesUl = document.querySelector("#messages")
    const messageForm = document.querySelector("#new-message")

    const refreshMessages = () => {
        Message.index()
        .then(messages => {
            messagesUl.innerHTML = messages
                .map(message => {
                    // data attribute is used to store data attributes on HTML
                    return `
                    <li>
                        <strong>#${message.id}</strong> ${message.body} <br>
                        <button
                        data-id="${message.id}"
                        class="delete-button">Delete</button>
                    </li>
                `
                })
                .join('')
        })
    }
    setInterval(refreshMessages, 500)


    messageForm.addEventListener('submit', event => {
        // We 'preventDefault()' in the submitted form.
        event.preventDefault()
        const { currentTarget } = event // The form element
        // Use the 'formData' constructor to create as object representation
        // of the keys and values of the form that we pass as an argument
        // to the constructor.
        const formData = new FormData(currentTarget)

        // 'formData.get()' returns the value associated with a given key
        // from within a 'formData' object.
         Message.create({ body: formData.get("body")})   
         .then(() => {
             console.log("Message created!")
             refreshMessages()
             currentTarget.reset() // This will reset(empty) the form inputs
         })
    })
    messagesUl.addEventListener('click', event => {
        const {target} = event //Element that triggered the event
        if(target.matches('.delete-button')){
            Message.delete(target.dataset.id).then(()=>{
                console.log("Message deleted!")
                refreshMessages()
            })
        }
    })
})
