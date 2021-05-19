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



