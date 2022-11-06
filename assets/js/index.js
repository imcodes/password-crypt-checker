

let encryptForm = document.querySelector('#encrypt-form')
let verifyForm = document.querySelector('#verify-form')
let apiUrl = 'encrypt.php'


 async function encrypt() {
    event.preventDefault()
let form = event.target
let output = document.querySelector('#hash-output')
// let body = new FormData(form)
let body = JSON.stringify({
    "hash_string":form.hash_string.value,
    "plainText":form.plainText.value,
    "hashMethod":form.hashMethod.value
})
var myHeaders = new Headers();
	myHeaders.append("Accept", "application/json");
	myHeaders.append("Content-Type", "application/json");

await fetch(apiUrl, {
    method:'POST',
    headers: myHeaders,
    mode: "same-origin",
    credentials:"same-origin",
    body: body,
    redirect:"follow"
})
.then(res => res.json())
.then(data => {
    if(data.isSuccess){
        document.querySelector('#hash-output').innerHTML = data.hash
        output.classList.add('is-success')
    }else{
        let error = (typeof data.error == 'object')? data.error.join(" <br> ") : data.error;
        output.innerHTML = error
        output.classList.add('is-error')
        
    }
})
//console.log(form.password_input.value)

    return false;
}


//Verify Hash
async function verify() {
    event.preventDefault()
    let form = event.target
    let output = document.querySelector('#verify-output')
    // let body = new FormData(form)
    let body = JSON.stringify({
        "compare_string":form.compare_string.value,
        "plainText":form.plainText.value,
        "hashMethod":form.hashMethod.value,
        "hashInput":form.hashInput.value
    })
    var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

    await fetch(apiUrl, {
        method:'POST',
        headers: myHeaders,
        mode: "same-origin",
        credentials:"same-origin",
        body: body,
        redirect:"follow"
    })
    .then(res => res.json())
    .then(data => {
        if(data.isSuccess){
            let matched = (data.matched) ? 'Matched' : 'Does not Match'
            let outputClass = (data.matched)? 'is-success' : 'is-error'
            output.innerHTML = matched
            output.classList.contains('is-error') ? output.classList.remove('is-error') : output.classList.remove('is-success')
            output.classList.add(outputClass) 
        }else{
            let error = (typeof data.error == 'object')? data.error.join(" <br> ") : data.error;
            output.innerHTML = error
            output.classList.add('is-error')
        }

    })
    //console.log(form.password_input.value)

    return false;
}




