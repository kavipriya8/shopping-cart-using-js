//to open cart & close cart
const buttonCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart')
const buttonClose=document.querySelector('#cart-close')
const test = 'test'
buttonCart.addEventListener('click',()=>{
    cart.classList.add('cart-active')
});

buttonClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active')
});

//to open new page
function openFile(pagechange){
    window.location.assign(pagechange)
}

var itemList=[
    {'total':0}
]

//to add items to the cart
let cartButton=document.querySelectorAll('.add-cart');
    cartButton.forEach((btn)=>{
        btn.addEventListener('click',function(){
            let item=this.parentElement;
            let title=item.querySelector('.electronicstitle').innerHTML;
            let price=item.querySelector('.electronicsprice').innerHTML;
            let img=item.querySelector('.iphone').src;

            let newProduct={title,price,img}
            //to check product already exist in cart
            if(itemList.find((el)=>el.title==newProduct.title)){
                alert("Product alredy in cart")
                return;
            }else{
                itemList.push(newProduct)
            }
            let newList = JSON.stringify(itemList);
            localStorage.setItem("newList",newList);

            let newProductElement=createCartProduct(title,price,img);
            let newElement=document.createElement('div');
            newElement.innerHTML=newProductElement;
            let cartBasket=document.querySelector('.cart-elements');
            cartBasket.append(newElement);
            loadContent();
        })
    }
)

//create cart
function createCartProduct(title,price,img){
    return `<div class="cart-box">
    <img src="${img}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-elec-title">${title}</div>
        <div class="price-box">
            <div class="cart-price">${price}</div>
            <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>`
}

function loadContent(){
    //to remove an item from cart
    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });
    function removeItem(){
        let removeElement=this.parentElement.querySelector('.cart-elec-title').innerHTML;
            itemList=itemList.filter(obj=>obj.title!=removeElement);
            this.parentElement.remove();
            loadContent();
        // if(confirm('Are u sure to remove this Item from cart')){
            
        // }
    }

    //to make sure cart quantity not less than 1
    let qtyElements=document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>{
        input.addEventListener('change',function(){
            if(isNaN(this.value) || this.value<1){
                this.value=1;
            }
            else if(this.value>1){
                let itemName=this.parentElement.children[0].innerHTML;
                let itemQuantity=this.value;
                const modifiedList=itemList.map((obj)=>{
                    if(obj.title==itemName){
                        obj.qty=itemQuantity;
                    }
                });
            }
            loadContent();
        })
    })
    //to update total
    updateTotal();
}

function updateTotal(){
    const cartItems=document.querySelectorAll('.cart-box')
    const totalValue=document.querySelector('.total-price')

    let total=0;
    cartItems.forEach(product=>{
        let cartPrice=product.querySelector('.cart-price').innerHTML;
        let price=parseFloat(cartPrice.replace("Rs.",""));
        let qty=product.querySelector('.cart-quantity').value;
        total+=(qty*price);
        product.querySelector('.cart-amt').innerText="Rs."+price*qty;

        //add cart amt in itemlist
        let elements = document.querySelectorAll('.cart-amt');
        elements.forEach((input)=>{
            let cartTitle=input.parentElement.parentElement.children[0];
            const modifiedList=itemList.map((obj)=>{
                if(obj.title==cartTitle.innerHTML){
                    obj.amount=input.innerHTML;
                }
            });
        })
    });
    totalValue.innerHTML="Rs."+total;

    //add totalvalue as newObject in itemlist
    let element = document.querySelector('.total-price').innerHTML;
    itemList[0].total=total;
    // console.log(itemList)

    let newList = JSON.stringify(itemList);
    localStorage.setItem("newList",newList);

    cartCountDisplay()
}

function cartCountDisplay(){

    //cart count
    let cartCount=document.querySelector('.cart-count');
    let count=itemList.length-1;
    if(count==0){
        cartCount.style.display="none";
    }
    else{
        cartCount.style.display="block";
    }
    cartCount.innerHTML=count;
}

//Place Order
let placeOrder=document.querySelector('.btn-buy');
console.log(itemList)
placeOrder.addEventListener('click',function(){
    let dynamicList = JSON.stringify(itemList);
    localStorage.setItem("FinalList",dynamicList);
})

let popup = document.getElementById("popup");
function openpopup(){
    popup.classList.add("open-popup")
}
function closepop(){
    popup.classList.remove("open-popup")
}

function validate(){
    console.log("abc")
    const pay={};
    pay.name=document.forms["payments"]["uname"].value;
    pay.no=document.forms["payments"]["number"].value;
    pay.address=document.forms["payments"]["address"].value;
    pay.payment=document.forms["payments"]["ordercomplete"].value;
    localStorage.setItem("Info",JSON.stringify(pay))
    
}

