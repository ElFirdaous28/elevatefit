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
let productCounter = 1;

// Saving product data in localStorage
function addToCart(event,Id) {
    const buttonClicked = event.currentTarget; // The clicked product element
    const clickedProduct=buttonClicked.parentElement;

    // Access the first <img>, <h4>, and data-price attributes
    const productImage = clickedProduct.getElementsByTagName('img')[0].src; // Get the first <img> element
    const productTitle = clickedProduct.getElementsByTagName('h4')[0].textContent; // Get the text content of the first <h4> element
    const productPrice = clickedProduct.getAttribute('data-price'); // Get the price from the data attribute

    // check if product not in cart
    const localStorageItems=getAllLocalStorageItems();

    let found=false;
    for (let i = 0; i<localStorageItems.length; i++) {
        const localStorageItem = localStorageItems[i];
        if (localStorageItem.key.includes("productInCart")) {
            // Parse existing product to update it
            const existingProduct = JSON.parse(localStorageItem.value); // Ensure value is parsed correctly
            if(existingProduct.productId===Id){
                existingProduct.productQuantity++; // Increment quantity
                localStorage.setItem(localStorageItem.key, JSON.stringify(existingProduct)); // Update the existing product in local storage
                found = true;
                break; // Exit the loop if product is found and updated
            }
        }
    }

    // If product was not found in the cart, add it as a new entry
    if (!found) {
        const productToSave = {
            productId:Id,
            productImage: productImage,
            productTitle: productTitle,
            productPrice: productPrice,
            productQuantity: 1,
        };
        // Save the product as a JSON string in localStorage
        const newProductKey = 'productInCart' + productCounter;
        localStorage.setItem(newProductKey, JSON.stringify(productToSave));

        // Increment cart item count
        productCounter++;
    }
}

// adding to cart page
window.onload = function() {
    // Check if the current URL contains "product-detail.html"
    if (window.location.href.includes("cart.html")) {
        const localStorageItems=getAllLocalStorageItems();
        const cartProducts=localStorageItems.filter(function(cartProduct){
            return cartProduct.key.includes("productInCart");
        })

        const bodyOfTable=document.getElementById("body_of_table");
        let total=0;
        cartProducts.forEach(cartProduct => {
            const cartProdactData= JSON.parse(cartProduct.value);
            if(cartProdactData && cartProdactData.productImage && cartProdactData.productTitle && cartProdactData.productPrice && cartProdactData.productQuantity){
                // add tr
                bodyOfTable.innerHTML += `
                <tr data-product-id="${cartProdactData.productId}">
                    <td>
                        <div class="cart-info">
                            <img src=${cartProdactData.productImage} alt="product-image">
                            <div>
                                <p>${cartProdactData.productTitle}</p>
                                <small>price: $${cartProdactData.productPrice}</small><br>
                                <button class="remove_prodact_from_cart" onclick="removeProductFromCart(event)">Remove</button>

                            </div>
                        </div>
                    </td>
                    <td><input oninput="change_quantity(event)" type="number" value="${cartProdactData.productQuantity}" min="1"></td>
                    <td class="product_subtotal">$${cartProdactData.productPrice*cartProdactData.productQuantity}</td>
                </tr>`;
                total+=cartProdactData.productPrice*cartProdactData.productQuantity;
                // modify total and totaleWithTva
                const totalWithTvaHtml = document.getElementById("totaleWithTva");
                const totaleWithoutTva = document.getElementById("totaleWithoutTva");
                totalWithTvaHtml.textContent = total;
                totaleWithoutTva.textContent = total;

            }
        });

    }
}

// fonction of modification of quantiy and subtotal
function change_quantity(event){
    const changedQuantity = event.currentTarget;
    let changedQuantityValue = parseInt(changedQuantity.value); // Get the value as a number
    if (!changedQuantityValue) {
        changedQuantityValue = 0;
    }
    
    const selectedProductId = changedQuantity.parentElement.parentElement.getAttribute('data-product-id');
    console.log(selectedProductId);
    const prodectTr=changedQuantity.parentElement.parentElement;
    const productSubtotalTd = prodectTr.querySelector('.product_subtotal');
    const totalWithTvaHtml = document.getElementById("totaleWithTva");
    const totaleWithoutTva = document.getElementById("totaleWithoutTva");

    // get all cart products from localstorage
    const localStorageItems=getAllLocalStorageItems();
        const cartProducts=localStorageItems.filter(function(cartProduct){
            return cartProduct.key.includes("productInCart");
        })
        // get the product with the same id of product input changed
        const cartProductToChange=cartProducts.find(cartProduct=>{
            const cartProductData= JSON.parse(cartProduct.value);
            return cartProductData.productId=== parseInt(selectedProductId);
        })

        // when found update the quantity in localstorage
        if (cartProductToChange) {
            // Parse the current product data
            const cartProductData = JSON.parse(cartProductToChange.value);
            // take old subtotal 
            let oldSubTitle=cartProductData.productPrice*cartProductData.productQuantity;
            cartProductData.productQuantity = changedQuantityValue; // Set the new quantity
            localStorage.setItem(cartProductToChange.key, JSON.stringify(cartProductData));

            // modification of product subtotal
            productSubtotalTd.textContent=`${cartProductData.productPrice*cartProductData.productQuantity}`;

            // modification of product subtotal
            productSubtotalTd.textContent=`${cartProductData.productPrice*cartProductData.productQuantity}`;
            
            // calculate the new total
            let newSubTitle=cartProductData.productPrice*cartProductData.productQuantity;
            let total=0;
            cartProducts.forEach(cartProduct => {
                const cartProdactData= JSON.parse(cartProduct.value);
                if(cartProdactData && cartProdactData.productImage && cartProdactData.productTitle && cartProdactData.productPrice && cartProdactData.productQuantity){
                    // add tr
                    total+=cartProdactData.productPrice*cartProdactData.productQuantity;    
                }
            });
            total=total-oldSubTitle+newSubTitle;
                        
            // modify total and totaleWithTva
            totalWithTvaHtml.textContent = total;
            totaleWithoutTva.textContent = total;
        }

}


// fonction of removing a product from the cart page
function removeProductFromCart(event){

    if (confirm("Would you like to remove this item from your cart?") == true) {
        text = "Yes";
        const ProductToRemove = event.currentTarget;
    
        const ProductToRemoveId = ProductToRemove.closest('tr').getAttribute('data-product-id');
        console.log(ProductToRemoveId);
    
        // get all cart products from localstorage
        const localStorageItems=getAllLocalStorageItems();
        const cartProducts=localStorageItems.filter(function(cartProduct){
            return cartProduct.key.includes("productInCart");
        })
        // get the product with the same id of product input changed
        const cartProductToRemove=cartProducts.find(cartProduct=>{
            const cartProductData= JSON.parse(cartProduct.value);
            return cartProductData.productId=== parseInt(ProductToRemoveId);
        })
        if (cartProductToRemove) {
            localStorage.removeItem(cartProductToRemove.key);
            location.reload();
        }
      } else {
        text = "canceled!";
      }

}