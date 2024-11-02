// JS for Single product detail


        var ProductImg = document.getElementById("product-img");//larger image
        var SmallImg = document.getElementsByClassName("small-img");//it returns list of 4 images having index 0,1,2,3 as we have 4 images with class name "small0-img" 

        SmallImg[0].onclick = function()//when user click on first image or images at 0 index, it will display as ProdcutImg.src replace with clicked or SmallImg[0], so we get smallimg[0] in bigger form, similarly when click on smallimg[1], it will display in bigger picture and so on 
        {
            ProductImg.src = SmallImg[0].src;   
        }

        SmallImg[1].onclick = function()
        {
            ProductImg.src = SmallImg[1].src;   
        }

        SmallImg[2].onclick = function()
        {
            ProductImg.src = SmallImg[2].src;   
        }

        SmallImg[3].onclick = function()
        {
            ProductImg.src = SmallImg[3].src;   
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

    let productTitle;
    if (window.location.href.includes("Products.html")) {
        productTitle = clickedProduct.getElementsByTagName('h4')[0];
    } else if (window.location.href.includes("cart.html")) {
        productTitle = clickedProduct.getElementsByTagName('p')[0];
    }
    
    const productPrice = clickedProduct.getAttribute('data-price'); // Get the price from the data attribute

    if (productImage) {
        const imageSrc = productImage.src; // Get the source of the image
        localStorage.setItem('productImageSrc', imageSrc);
    }
    if (productTitle) {
        localStorage.setItem('productTitle', productTitle.innerText);
    }

    if (productPrice) {
        localStorage.setItem('productPrice', productPrice);
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
        
        if (imageDetailed && storedImageSrc) {
            imageDetailed.src = storedImageSrc;
        }
        if (titleDetailed) {
            titleDetailed.innerText = productTitle; 
        }
        if (priceDetailed) {
            priceDetailed.innerText = `$${productPrice}`; 
        }
    }
}

