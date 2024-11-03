const placeOrderButton = document.getElementById('place_order_button');

placeOrderButton.addEventListener('click',function(){
    const firstName=document.getElementById('first_name');
    const lastName=document.getElementById('last_name');
    const country=document.getElementById('country');
    const streetAdress=document.getElementById('street_adress');
    const townCity=document.getElementById('town_city');
    const stateCounty=document.getElementById('state_county');
    const zip=document.getElementById('zip');
    const phoneNumber=document.getElementById('phone_number');
    const email = document.getElementById('email');
    if(NameValidate(firstName) && NameValidate(lastName) && requiredInput(country) && requiredInput(streetAdress) && requiredInput(townCity) && requiredInput(stateCounty) && ZipValidate(zip) && phoneValidate(phoneNumber) && emailValidate(email)){
        console.log("form valid");
        window.location.href = "index.html"; 
    }
})


// validation functions
function showInputError(element,message){
    const pError = element.parentElement.nextElementSibling;
    pError.innerText=message;
}
// required function
function requiredInput(element){
    if (element.value.trim() === ''){
        showInputError(element,"This element is requierd !");
        return false;
    }
    else{
        return true;
    }
}

// only alphabets function
function onlyAlphabet(element,str) {
    const isValid = /^[A-Za-z]+$/.test(str); // Check if the string contains only alphabets
    if(!isValid){
        showInputError(element, "only alphabets!");
    }
    else{
        showInputError(element, "");
    }
    return isValid;
}

// function of first and last name validation
function NameValidate(element){
    if(requiredInput(element) && onlyAlphabet(element,element.value) && validateNameLength(element,element.value)){
        return true;
    }
    else{
        return false;
    }
}
function validateNameLength(element, str) { // first and last name has to be between 2 and 30 characters
    if (str.length > 30 || str.length < 2) {
        showInputError(element, "Length must be between 2 and 30 characters.");
        return false;
    } else {
        showInputError(element, "");
        return true;
    }
}

// zip length
function zipLength(element, str) { // first and last name has to be between 2 and 30 characters
    if (str.length > 10 || str.length < 5) {
        showInputError(element, "Length must be between 5 and 10 characters.");
        return false;
    } else {
        showInputError(element, "");
        return true;
    }
}
function onlyAlphaNums(element, str) {
    const isValid = /^(?=.*[0-9])[A-Za-z0-9]+$/.test(str); // Requires at least one digit and allows letters and numbers
    if (!isValid) {
        showInputError(element, "Must contain at least one number and only alphanumeric characters!");
    } else {
        showInputError(element, "");
    }
    return isValid;
}

// function of zip validation
function ZipValidate(element){
    if(requiredInput(element) && onlyAlphaNums(element,element.value) && zipLength(element,element.value)){
        return true;
    }
    else{
        return false;
    }
}


// phone number chars
function phoneNumChars(element,str) {
    const isValid = /^[0-9+\s()-]+$/.test(str);// nums whitespace + - and *()
     if(!isValid){
        showInputError(element, "Enter a valid phone number!");
    }
    else{
        showInputError(element, "");
    }
    return isValid;
}
// phone number length
function phoneNumLength(element, str) { // first and last name has to be between 2 and 30 characters
    if (str.length > 15 || str.length < 8) {
        showInputError(element, "Length must be between 8 and 15 characters.");
        return false;
    } else {
        showInputError(element, "");
        return true;
    }
}
// function of phone number validation
function phoneValidate(element){
    if(requiredInput(element) && phoneNumChars(element,element.value) && phoneNumLength(element,element.value)){
        return true;
    }
    else{
        return false;
    }
}

// phone number chars
function emailChars(element,str) {
    const isValid = /^(?=.*[@])(?=.*[.])[a-z0-9+\s()\-@.]+$/.test(str);
     if(!isValid){
        showInputError(element, "Enter a valid email");
    }
    else{
        showInputError(element, "");
    }
    return isValid;
}

// function of phone number validation
function emailValidate(element){
    if(requiredInput(element) && emailChars(element,element.value)){
        return true;
    }
    else{
        return false;
    }
}

document.addEventListener("DOMContentLoaded",function(){
    let total=0;
    const localStorageItems=getAllLocalStorageItems();
    const cartProducts=localStorageItems.filter(function(cartProduct){
        return cartProduct.key.includes("productInCart");
    })
    cartProducts.forEach(cartProduct => {
        const cartProdactData= JSON.parse(cartProduct.value);
        if(cartProdactData && cartProdactData.productImage && cartProdactData.productTitle && cartProdactData.productPrice && cartProdactData.productQuantity){
            total+=cartProdactData.productPrice*cartProdactData.productQuantity;
            }
        });
    localStorage.setItem('totalInLocalstorage', JSON.stringify(total));
    const totalInHeader = document.getElementById('total_in_header');
    
    totalInHeader.textContent = `$${total}`;
    return total
})