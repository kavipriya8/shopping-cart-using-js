const cartList=JSON.parse(localStorage.getItem('FinalList'));
totalAmount=cartList[0];
console.log(totalAmount)
cartList.shift();
cartList.forEach(function(item){
    let newProductElement=displayStorage(item.title,item.price,item.img,item.amount,item.qty);
    let newElement=document.createElement('div');
    newElement.innerHTML=newProductElement;
    let cartView=document.querySelector('.orders');
    cartView.append(newElement);
})
let totalAmountDisplay=displayTotal(totalAmount.total)
let newDisplay=document.createElement('div');
newDisplay.innerHTML=totalAmountDisplay;
console.log(newDisplay)
let totalDisplay=document.querySelector('.disamount')
totalDisplay.append(newDisplay)

//getElement from cart
function displayStorage(title,price,img,amount,qty=1){
    return `<div class="cart-box">
        <img src="${img}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-elec-title">Name: ${title}</div>
            <div class="price-box">
                <div class="cart-price">Price: ${price}</div>
                <div class="cart-amt"> ${amount}</div>
            </div>
            <div class="cart-quantity">Qty:${qty}</div>
        </div>
    </div>`
}

function displayTotal(totalAmount){
    return `<div class="tot-display">
        <div class="tot-amount">${totalAmount}</div>
    </div>`
}