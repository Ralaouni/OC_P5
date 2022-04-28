
// ici on récupère le localStorage en JSON et on le retransforme en javascript
let cart_storage = JSON.parse(localStorage.cart)

const url = "http://localhost:3000/api/products/"

const cart_items = document.getElementById("cart__items")

const totQty = document.getElementById("totalQuantity")

const totPrice = document.getElementById("totalPrice")


// on va ajouter les produits dans cart.html
function panierHtml () {
    // on répète la fonction ppour le nombre d'élément dans le local storage
    for (let i = 0; i < cart_storage.length; i++) {
        fetch(url+cart_storage[i][0])
        .then(function(res) {
            if (res.ok) {
              return res.json();
            }
          })
        .then(function(value) {
            // ici on ajoute le HTML contenant tout nos produits dans "cart__items" tout en gardant la couleur choisie et la quantité de chaque éléments 
            function panier1(value){
                cart_items.innerHTML += `
                <article class="cart__item" data-id="${value._id}" data-color="${cart_storage[i][2]}">
                    <div class="cart__item__img">
                    <img src="${value.imageUrl}" alt="${value.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${value.name}</h2>
                            <p>${cart_storage[i][2]}</p>
                            <p>${value.price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${cart_storage[i][1]}  </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart_storage[i][1]}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
              `
            }
            panier1(value)

            function changeQty() {
                let qty = document.querySelectorAll(".itemQuantity")
                let qtyArray = Array.prototype.slice.call(qty)
                
                qtyArray.forEach(item => {
                    item.addEventListener("change", function(){
                        let article = item.closest("article")
                        for (let i = 0; i < cart_storage.length; i++) {
                            if (article.getAttribute("data-id") == cart_storage[i][0] && article.getAttribute("data-color") == cart_storage[i][2]) {
                                cart_storage[i][1] = parseFloat(this.value)
                            }
                            if (cart_storage[i][1] == 0) {
                                article.remove()
                                cart_storage.splice(i,1)
                            }
                        }
                        totalQty()
                        price(value)
                        console.log(this.value)
                        console.log(cart_storage)
                    })
                });
            }

            changeQty()

            function deleteElement() {
                let button = document.querySelectorAll(".deleteItem")
                let buttonArray = Array.prototype.slice.call(button)

                buttonArray.forEach(item => {
                    item.addEventListener("click", function(){
                        console.log("hello")
                        let article = item.closest("article")
                        for (let i = 0; i < cart_storage.length; i++) {
                            if (article.getAttribute("data-id") == cart_storage[i][0] && article.getAttribute("data-color") == cart_storage[i][2]) {
                                article.remove()
                                cart_storage.splice(i,1)
                            }
                        }
                        totalQty()
                        price(value)
                        console.log(cart_storage)
                    })
                });
            }

            deleteElement()
            

            //   ici on additionne tout les prix de chaque élément du local storage
            function price(value){
                let tot = 0
                if (cart_storage.length >  0) {
                    for (let i = 0; i < cart_storage.length; i++) {
                        totPrice.innerText = (tot += (value.price * cart_storage[i][1]))
                    }
                
                } else {
                    tot = 0
                    totPrice.innerText = tot
                }
            }
            price(value)

            // fonction qui calcul la quantité de produit en additionnant toute les quantité que nous avons dans le local storage
            function totalQty () {
                let tot = 0
                for (let i = 0; i < cart_storage.length; i++) {
                    tot += cart_storage[i][1]
                }
                totQty.innerText = tot
            }

            totalQty()

        })
        .catch(function(err) {
             console.log("Une erreur est survenue")
        });
        
    }
}

panierHtml()


                