const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const cardList = document.querySelector('.card-list');



hamburger.addEventListener('click', ()=>mobileMenu.classList.toggle('mobile-menu-active'));

let productList = [];
const showCards =()=>{
    productList.forEach(product =>{

        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');

        orderCard.innerHTML=`<div class="card-image">
                            <img src="images/python.png">
                        </div>
                        <h4>Complete python course</h4>
                        <h4 class="price">₹599</h4>
                        <a href="#" class="btn">Enroll Now</a>`;

                        cardList.appendChild(orderCard);
    })
}

const initApp = ()=>{

    fetch('products.json').then
    (response => response.json()).then
    (data =>{

        productList = data;
        showCards();
    })
}

initApp();

