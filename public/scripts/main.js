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
// Dont's forget to return it from the callback.
    .then(response => response.json())
    // .then(data => console.log(data))
    // This is the same as above. We can pass console.table as a callback because the way
    // 'console.table' is defined. It will log the argument that is passed to it.
    // If the data is specifically an array of objects, we can use 'console.table'
    // to output as a table format. 
    .then(console.table)





    document.addEventListener('DOMContentLoaded', () =>{
        const messagesUl = document.querySelector('#messages')

        const refreshMessages = () => {
            fetch('http://localhost:3434/messages')
            .then(response => response.json())
            .then(messages =>{
    
                messagesUl.innerHTML = messages
                .map(message => {
                    return `
                        <li>
                            <strong>#${message.id}</strong>${message.body}<br>
                        </li>
                    `
                })
                .join('')
            })
        }
        setInterval(refreshMessages, 500)
    })
