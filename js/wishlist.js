// get all elements in local storage
function getAllLocalStorageItems() {
    const itemsArray = []; // Initialize an empty array

    // Iterate through each key in local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Get the key
        const value = localStorage.getItem(key); // Get the value
        itemsArray.push({ key, value }); // Add to the array
    }

    return itemsArray; // Return the array
}



// Adding to cart
let productWishListCounter = 1;

// Saving product data in localStorage
function addToWishList(event,Id) {
    const buttonClicked = event.currentTarget; // The clicked product element
    let clickedProduct=buttonClicked.parentElement;

    
    // Access the first <img>, <h4>, and data-price attributes
    let productImage ='';
    let productTitle = '';
    let productPrice = '';
    let productId;
    let productQuantity = 1;

    if(window.location.href.includes('product-detail.html')){
        productId = localStorage.getItem('productDetailId');
        productImage = document.getElementById('product-img').getAttribute('src');
        productTitle = document.getElementById('detailed_prodect_title').textContent;
        productPrice = document.getElementById('detailed_prodect_price').textContent;
        
        productQuantity=document.getElementById('product_quantity').value; 
        const svgPath = document.querySelector('svg path');
        svgPath.style.fill = "#ff523b";
    }
    else{
        productId = Id;
        productImage = clickedProduct.getElementsByTagName('img')[0].getAttribute('src'); // Get the first <img> element
        productTitle = clickedProduct.getElementsByTagName('h4')[0].textContent; // Get the text content of the first <h4> element
        productPrice = clickedProduct.getAttribute('data-price'); // Get the price from the data attribute
        productQuantity = productQuantity;
        clickedProduct.querySelector('svg path').style.fill = "#ff523b";
    }

    // check if product not in cart
    const localStorageItems=getAllLocalStorageItems();

    let found=false;
    for (let i = 0; i<localStorageItems.length; i++) {
        const localStorageItem = localStorageItems[i];
        if (localStorageItem.key.includes("productInWishList")) {
            // Parse existing product to update it
            const existingProduct = JSON.parse(localStorageItem.value); // Ensure value is parsed correctly
            if(existingProduct.productId===productId){
                if(window.location.href.includes('product-detail.html')){
                    existingProduct.productQuantity = productQuantity; // give the new value
                }
                else{
                    existingProduct.productQuantity++; // Increment quantity
                }
                localStorage.setItem(localStorageItem.key, JSON.stringify(existingProduct)); // Update the existing product in local storage
                updateTotalInLocalstorage();//update total in localstorage
                found = true;
                break; // Exit the loop if product is found and updated
            }
        }
    }

    // If product was not found in the cart, add it as a new entry
    if (!found) {
        const productToSave = {
            productId: productId,
            productImage: productImage,
            productTitle: productTitle,
            productPrice: productPrice,
            productQuantity: productQuantity,
        };
        // Save the product as a JSON string in localStorage
        const newProductKey = 'productInWishList' + productWishListCounter;
        localStorage.setItem(newProductKey, JSON.stringify(productToSave));
        // Increment cart item count
        productWishListCounter++;
    }
}

// adding to cart page
window.onload = function() {
    // Check if the current URL contains "wishlist.html"
    if (window.location.href.includes("wishlist.html")) {
        
        const localStorageItems=getAllLocalStorageItems();
        const wishListProducts=localStorageItems.filter(function(wishListProduct){
            return wishListProduct.key.includes("productInWishList");
        })
        

        const bodyOfTable=document.getElementById("body_of_table");
        wishListProducts.forEach(wishListProduct => {
            const wishListProdactData= JSON.parse(wishListProduct.value);
            if(wishListProdactData && wishListProdactData.productImage && wishListProdactData.productTitle && wishListProdactData.productPrice && wishListProdactData.productQuantity){
                // add tr                
                bodyOfTable.innerHTML += `
                <tr data-product-id="${wishListProdactData.productId}">
                    <td>
                        <div class="cart-info" data-price="${wishListProdactData.productPrice}" onclick="productDetails(event)">
                            <img src=${wishListProdactData.productImage} alt="product-image">
                            <div>
                                <p>${wishListProdactData.productTitle}</p>
                                <button class="remove_prodact_from_cart" onclick="event.stopPropagation(); removeProductFromCart(event)">Remove</button>
                            </div>
                        </div>
                    </td>
                    <td>$ <span>${wishListProdactData.productPrice}</span></td>
                    <td>
                        <button class="add_to_cart_button" style="visibility: visible;"onclick="event.stopPropagation(); addToCart(event,${wishListProdactData.productId})" data-id="1">Add To Cart</button>
                    </td>
                </tr>`;
               
            }
        });

    }
}


// fonction of removing a product from the cart page
function removeProductFromCart(event){

    if (confirm("Would you like to remove this item from your wishlist?") == true) {
        text = "Yes";
        const ProductToRemove = event.currentTarget;
    
        const ProductToRemoveId = ProductToRemove.closest('tr').getAttribute('data-product-id');
    
        // get all cart products from localstorage
        const localStorageItems=getAllLocalStorageItems();
        const wishListProducts=localStorageItems.filter(function(wishListProduct){
            return wishListProduct.key.includes("productInWishList");
        })
        // get the product with the same id of product input changed
        const wishListProductToRemove=wishListProducts.find(wishListProduct=>{
            const wishListProductData= JSON.parse(wishListProduct.value);
            return wishListProductData.productId=== parseInt(ProductToRemoveId);
        })
        if (wishListProductToRemove) {
            localStorage.removeItem(wishListProductToRemove.key);
                location.reload();
        }
      } else {
        text = "canceled!";
      }

}
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes("Products.html")) {
        const productItems = document.querySelectorAll('.product_item');

        const localStorageItems = getAllLocalStorageItems();
        const wishListProducts = localStorageItems.filter(function(wishListProduct) {
            return wishListProduct.key.includes("productInWishList");
        });
        
        // Take all ids in wishListProducts
        const wishListProductIds = wishListProducts.map(function(wishListProduct) {
            const product = JSON.parse(wishListProduct.value); // Parse JSON string to object
            return product.productId; // Adjust if your ID property is named differently
        });
        console.log(wishListProductIds);
        
        // Compare productItems with wishListProductIds
        for (let i = 0; i < productItems.length; i++) {
            const productId = productItems[i].getAttribute('data-id');            
           
            if (wishListProductIds.includes(Number(productId))) {
                console.log(`Product ID ${productId} is in the wishlist`);
                
                // Find the path element within the SVG and change its fill
                const svgPath = productItems[i].querySelector('svg path');
                if (svgPath) {
                    svgPath.style.fill = "#ff523b"; // Change the fill color
                }
            }
        }
    }
    else if (window.location.href.includes("product-detail.html")) {
        const localStorageItems = getAllLocalStorageItems();
        const wishListProducts = localStorageItems.filter(function(wishListProduct) {
            return wishListProduct.key.includes("productInWishList");
        });
        
        // Take all ids in wishListProducts
        const wishListProductIds = wishListProducts.map(function(wishListProduct) {
            const product = JSON.parse(wishListProduct.value); // Parse JSON string to object
            return product.productId; // Adjust if your ID property is named differently
        });
        const productId = localStorage.getItem('productDetailId');        
        if (wishListProductIds.includes(productId)) {
            console.log(`Product ID ${productId} is in the wishlist`);
            
            // Find the path element within the SVG and change its fill
            const svgPath = document.querySelector('svg path');
            console.log(svgPath);
            
            if (svgPath) {
                svgPath.style.fill = "#ff523b"; // Change the fill color
            }
        }
    }

});

