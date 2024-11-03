// JS for Single product detail
var ProductImg = document.getElementById("product-img");
var SmallImg = document.getElementsByClassName("small-img");

for (let i = 0; i < SmallImg.length; i++) {
    SmallImg[i].onclick = function() {
        ProductImg.src = SmallImg[i].src;
    }
}
       
// function of filtering by category
function filterByCategory(category){
    const products = Array.from(document.querySelectorAll(".product_item"));

    products.forEach(product => {
        if(!product.getAttribute('data-category').includes(category)){
            product.style.display="none";
        }
        else{
            product.style.display="block";
        }
    });
    
}

// filter by price

  function filterByPrice(){
    const slider = document.getElementById("slider");
    const range_value = document.getElementById("range_value");
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    
    slider.style.background = `linear-gradient(to right, #ff523b ${value}%, #ddd ${value}%)`;
    range_value.innerHTML = slider.value; // Display actual slider value
    
    const products = Array.from(document.querySelectorAll(".product_item"));
  
    products.forEach(product => {
        if(parseInt(product.getAttribute("data-price"))> slider.value){
            product.style.display="none";
        }
        else{
            product.style.display="block";
        }
    });
  }
 

//saving details of product in localstoreg
function productDetails(event) {
    const clickedProduct = event.currentTarget; // The clicked product element
    
    // Access the first <img>, <h4>, and data-price attributes
    const productImage = clickedProduct.getElementsByTagName('img')[0]; // Get the first <img> element
    const productId = clickedProduct.getAttribute('data-id');

    let productTitle;
    if (window.location.href.includes("Products.html")) {
        productTitle = clickedProduct.getElementsByTagName('h4')[0];
    } else if (window.location.href.includes("cart.html")) {
        productTitle = clickedProduct.getElementsByTagName('p')[0];
    }
    
    const productPrice = clickedProduct.getAttribute('data-price'); // Get the price from the data attribute

    if (productImage && productTitle && productPrice) {
        const imageSrc = productImage.getAttribute('src'); // Get the source of the image
        localStorage.setItem('productImageSrc', imageSrc);
        localStorage.setItem('productTitle', productTitle.innerText);
        localStorage.setItem('productPrice', productPrice);
        localStorage.setItem('productDetailId', productId);
    }
   
    // Redirect to the product detail page
    window.location.href = "product-detail.html"; 
}
// showing product details
window.onload = function() {
    // Check if the current URL contains "product-detail.html"
    if (window.location.href.includes("product-detail.html")) {
        // When loaded, we take the detailed image from local storage
        const storedImageSrc = localStorage.getItem('productImageSrc');
        const productTitle = localStorage.getItem('productTitle');
        const productPrice = localStorage.getItem('productPrice');

        const imageDetailed = document.getElementById('product-img');
        const titleDetailed = document.getElementById('detailed_prodect_title');
        const priceDetailed = document.getElementById('detailed_prodect_price');
        
        if (imageDetailed && storedImageSrc && titleDetailed &&priceDetailed) {
            imageDetailed.src = storedImageSrc;
            titleDetailed.innerText = productTitle;
            priceDetailed.innerText = `${productPrice}`;  
        }

    }
}

document.addEventListener('DOMContentLoaded', function() {
    const totalInHeader = document.getElementById('total_in_header');
    total = localStorage.getItem('totalInLocalstorage');
    if(total){
    totalInHeader.textContent = `$${total}`;
    }
    else{
    totalInHeader.textContent = `$0`;
    }
});

let btnOfHeader = document.getElementById("btn-header");
        let navBare = document.getElementById("navBare");
        btnOfHeader.addEventListener("click" , btn=>{
            if(navBare.classList.contains("none")){
                navBare.classList.remove("none")
            }
            else {
            navBare.classList.add("none")
            }
        })