// function of filtering by category
function filter(category){
    const products = Array.from(document.querySelectorAll(".col-4"));

    products.forEach(product => {
        if(!product.getAttribute('data-category').includes(category)){
            product.style.display="none";
        }
        else{
            product.style.display="block";
        }
    });
    
}
