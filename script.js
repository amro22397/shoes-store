const shopIcon = document.getElementById("shop-cart-icon");
const body = document.getElementById("body");
const cartContainer = document.getElementById("cart-container");
const closeCartIcon = document.getElementById("close-cart-icon");
const productsDiv = document.querySelector(".products-div");
const itemsList = document.getElementById("items-list");
const totalPrice = document.getElementById("total-price");
const cartTotalNumber = document.getElementById("cart-items-numbers");
const ppp = document.getElementById("shoes");
const likeLogo = document.getElementById("like-logo");
const clearItems = document.getElementById("clear-items");
const decreaseItem = document.getElementById("decrease-item");
const increaseItem = document.getElementById("increase-item");
const clearItemBtn = document.getElementsByClassName("close-item-btn");


shopIcon.addEventListener("click", () => {
    cartContainer.classList.add("show-cart");
     
}  );

closeCartIcon.addEventListener("click", () => {
    cartContainer.classList.remove("show-cart");
});

let listProducts = [];

const products = [
    {
        "id": 1 ,
        "image": "https://i.ibb.co/zP93Sc3/shoes1.png" ,
        "price": 100.99
        
    },

    {
        "id": 2 ,
        "image": "https://i.ibb.co/LRdv0z5/shoes3.png" ,
        "price": 150.99
        
    },

    {
        "id": 3 ,
        "image": "https://i.ibb.co/pZQ7hHk/shoes5.png" ,
        "price": 200.99
        
    },

    {
        "id": 4 ,
        "image": "https://i.ibb.co/6Rn6mX9/shoes6.png" ,
        "price": 177.99
        
    },

    {
        "id": 5 ,
        "image": "https://i.ibb.co/K0L0VV4/shoes8.png" ,
        "price": 130.99
        
    },

    {
        "id": 6 ,
        "image": "https://i.ibb.co/RBhRg4f/shoes7.png" ,
        "price": 100.99
        
    }


]

products.forEach( ({id, image, price}) => {
    productsDiv.innerHTML += `
    <div class="products p${id}">
                    <div class="small_card">
                        <i class="fa-solid fa-heart"></i>
                        <i class="fa-solid fa-share"></i>
                    </div>
                    <img src="${image}">
                    <h2>NIKE</h2>
                    <p style="color: rgb(114, 114, 114)">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    <p style="font-weight: bold; font-size: larger;">$${price}</p>
                    <button class="btn product-btn" id="${id}">Add To Cart</button>
                </div>
    `;
});

class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.taxRate = 5;
    }
  
    addItem(id, products) {
        const product = products.find((item) => item.id === id);
        const { image, price } = product;
        this.items.push(product);
  
        const productCount = {};
        this.items.forEach((shoes) => {
            productCount[shoes.id] = (productCount[shoes.id] || 0) + 1;
        })
        
        const currentProductCount = productCount[product.id];
        const currentProductCountSpan = document.getElementById(`product-count-span-${id}`);
  
        currentProductCount > 1 ? currentProductCountSpan.innerText = `${currentProductCount}` :
        itemsList.innerHTML += `  
                <div class="item">
                        <img src="${image}">
                        <p>${price}</p>
                    <div class="quantity">
                      <span style="cursor: pointer;" id="decrease-item"><i class="fa-solid fa-square-minus"></i></span>
                        <span class="item-number" style="font-size: 18px;"
                        id="product-count-span-${id}">1</span>
                        <span style="cursor: pointer;" id="increase-item"><i class="fa-solid fa-square-plus"></i></span>
                        </div>
    
                        <span class="close-item-btn" id="${id}"><i class="fa-solid fa-circle-xmark"
                            style="color: rgb(120, 2, 2);"></i></span>
                </div>  
            `;
    }
  
    getCounts() {
        return this.items.length;
      }
  
      clearCart() {
        if (!this.items.length) {
          alert("Your shopping cart is already empty");
          return;
        }
    
        const isCartCleared = confirm(
          "Are you sure you want to clear all items from your shopping cart?"
        );
    
        if (isCartCleared) {
          this.items = [];
          this.total = 0;
          itemsList.innerHTML = "";
          cartTotalNumber.textContent = 0;
          totalPrice.textContent = 0;
        }
      }
  
      decreaseItem(){
        
      }
  
      calculateTaxes(amount) {
        return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
      }
  
      calculateTotal() {
        const subTotal = this.items.reduce((total, item) => total + item.price, 0);
        const tax = this.calculateTaxes(subTotal);
        this.total = subTotal + tax;
        totalPrice.innerText = `$${this.total.toFixed(2)}`;
        return this.total;
      }
  };
  
  const cart = new ShoppingCart();
  const productBtn = document.getElementsByClassName("product-btn");
  
  [...productBtn].forEach(
    (btn) => {
        btn.addEventListener("click" , (event) => {
           cart.addItem(Number(event.target.id), products);
           cartTotalNumber.innerText = cart.getCounts();
           cart.calculateTotal();
  
        })
    }
  );
  
  clearItems.addEventListener("click", cart.clearCart.bind(cart));


  itemsList.addEventListener("click", (e) => {
    if(e.target.tagName === "SPAN" ) {
        e.target.parentElement.remove();
    }
  })

