document.querySelector('.search').addEventListener('click',() =>{
  let searchText = document.querySelector('.searchIn');
  if(searchText.style.display === "none" || searchText.style.display === ""){
    searchText.style.display = "block";
    searchText.focus();
  }
  else{
    searchText.style.display = "none"
  }
})

let cartOpen = document.querySelector('.cartIcon');
let cartClose = document.querySelector('.closeCart');
let cart = document.querySelector('.cart');
let favOpen = document.querySelector('.favi');
let favClose = document.querySelector('.closeFav');
let favirote = document.querySelector('.favorite');
let changeTo = document.querySelector('.right');

function toggleDisplay(open,close,mainDiv){
open.addEventListener('click',()=>{
  mainDiv.style.display = "block";
});

close.addEventListener('click',()=>{
  mainDiv.style.display = "none";
  changeTo.style.margin = "0% 5% 0% 0%";
});
}

toggleDisplay(cartOpen,cartClose,cart);
toggleDisplay(favOpen,favClose,favirote);


let addToCart = document.querySelectorAll('.addBtn');
addToCart.forEach((btn)=>{
  btn.addEventListener('click',additems);
});

const cartCon = document.querySelector('.cartCenter');

// additems function
function additems(){
  let proInfo = this.closest('.pro1');
  var id = proInfo.getAttribute('id');
  let proname = proInfo.querySelector('.proName').textContent;
  let proPrice = document.querySelector('.priam').textContent;
  let imgLo = proInfo.querySelector('.proImg');
  let imgSrc = imgLo.getAttribute('src');

  let element = document.createElement('div');
  element.innerHTML = createPro(proname,proPrice,imgSrc,id);
  let eleId = element.querySelector('.pro');
  let eleidog = eleId.getAttribute('id');

  let getting = cartCon.querySelectorAll('.pro');
  let isAlreadyAdded = false;

  getting.forEach((ids) => {
    let ida = ids.getAttribute('id');
    if (ida === eleidog) {
      isAlreadyAdded = true;
      alert("already Added");
    }
  });
  
  if (!isAlreadyAdded) {
    cartCon.append(element);
  }

  quantityFun();
  remover();
  cartSaves();
  grandTotal();
}

// product card function 
function createPro(proname,proprice,proimg,proid){
  return `<div class="pro" id="${proid}">
  <div class="imgC">
    <img src="${proimg}" alt="" class="proCaImg">
  </div>
  <div class="details">
    <div class="proname">${proname}</div>
    <div class="qua">
      <input type="number" class="quantity" value="1">
    </div>
    <div class="priceC">&#8377; <span class="itemAmo">${proprice}</span>
    </div>
    <div class="removeB">
      <button class="removeItem">Remove</button>
    </div>
  </div>
  </div>`
}

function quantityFun(){
  let quan = cartCon.querySelectorAll('.quantity');
  quan.forEach((qua)=>{
    var proPrice = qua.closest('.details').querySelector('.itemAmo').textContent;
    var proPran = parseFloat(proPrice);
    gloquan = qua.value;
    qua.addEventListener('change',function(){
      let price = document.querySelector('.itemAmo');
      if(isNaN(this.value) || this.value < 1){
        this.value = 1;
      }
      if(this.value > 100){
        this.value = 100;
      }
      var amo = this.value * proPran;
      var amoSelect = this.closest('.details').querySelector('.itemAmo');
      amoSelect.textContent = amo;

      gloquan = this.value;
      
      grandTotal();
    });
  });
}

function grandTotal(){
  let allAmount = document.querySelector('.cartCenter');
  let allPrice = allAmount.querySelectorAll('.itemAmo');
  let granto = 0;
  allPrice.forEach((btn)=>{
  let amo = btn.textContent;
  let amoOg = parseInt(amo);
  granto += amoOg;
  });
  let amoSelect = document.querySelector('.totalVal');
  amoSelect.textContent = granto;
}

function remover(){
  var select = cartCon.querySelectorAll('.removeItem')
  select.forEach(function (btnR){
    btnR.addEventListener('click',function(){
      let clicked = btnR.parentElement.parentElement.parentElement.parentElement;
      clicked.remove();
      cartSaves();
      grandTotal();
    });
  });
}

// favSection code 
let favBTn = document.querySelectorAll('.fav');

favBTn.forEach((btn)=>{
  btn.addEventListener('click',() => {
    btn.classList.toggle('fav1');
    favAdd(btn);
  });
});

const favContainer = document.querySelector('#favAdded');

function favAdd(btn){
  let paelement = btn.parentElement.parentElement.parentElement;
  let productId = paelement.getAttribute('id');
  let productImage = paelement.querySelector('.proImg').getAttribute('src');
  let productName = paelement.querySelector('.proName').textContent;

  let element = document.createElement('div');
  element.innerHTML = favCard(productImage,productName,productId);

  if(btn.classList.contains('fav1')){
    favContainer.append(element);
  }else{
    let favNa = favContainer.querySelectorAll('.pro');
    favNa.forEach((btnA)=>{
    let favId = btnA.getAttribute('id');
    if(productId === favId){
    let tamil = btnA.parentElement;
        tamil.innerHTML = '';
    }
    });
  }

  favSaves();
  removeFav();
}

function favCard(proimg,proname,proid){
  return `<div class="pro" id="${proid}">
  <div class="imgC">
    <img src="${proimg}" alt="" class="proCaImg">
  </div>
  <div class="details">
    <div class="proname">${proname}</div>
    <div class="priceC">&#8377;10</div>
    <div class="removeB">
      <button class="removeItem">Remove</button>
    </div>
  </div>
  </div>`
}

function removeFav(){
  let reMoveBtn = favContainer.querySelectorAll('.removeItem');
  
  reMoveBtn.forEach((btn)=>{
    btn.addEventListener('click',()=>{
      let proCon = btn.parentElement.parentElement.parentElement;
      let removeId = btn.parentElement.parentElement.parentElement.parentElement;
      removeId.remove();
  
      let proName = document.querySelectorAll('.pro1');
      proName.forEach((id)=>{
        let mainPorId = id.getAttribute('id');
        let cartCardId = proCon.getAttribute('id');
        if(mainPorId === cartCardId){
          let idNum = document.getElementById(mainPorId);
          let proNa = idNum.querySelector('.fav');
          proNa.classList.remove('fav1');
        }
      });

      favSaves();
    });
  });
}

function addClassAdded(){
  let proCars = document.querySelectorAll('.pro1');
  proCars.forEach((id)=>{
    let mainPorId = id.getAttribute('id');
    let sellall = favContainer.querySelectorAll('.pro');
    sellall.forEach((thpro)=>{
      let getterId = thpro.getAttribute('id');
      if(mainPorId === getterId){
      let proNa = id.querySelector('.fav');
      proNa.classList.add('fav1');
    }
    });  
  });
}

//localStorage
function favSaves(){
  localStorage.setItem('favSaved',favContainer.innerHTML);
}

function cartSaves(){
  localStorage.setItem('cartSaved',cartCon.innerHTML);
}

function upload(){
  favContainer.innerHTML = localStorage.getItem('favSaved');
  cartCon.innerHTML = localStorage.getItem('cartSaved');
  quantityFun();
  remover();
  removeFav();
}
upload();
addClassAdded();

// dark button code
let darkModeBtn = document.querySelector('.darkMode');

darkModeBtn.addEventListener('click',function(){
  let body = document.querySelector('body');
  body.classList.toggle('dark');
  
  darkModeBtn.classList.toggle('darki');

  if(darkModeBtn.classList.contains('darki')){
    darkModeBtn.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
  }else{
    darkModeBtn.innerHTML = `<span class="material-symbols-outlined">
    light_mode</span>`;
  }
});

//carousel code 

let slides = document.querySelectorAll('.slide');
let counter = 0;

slides.forEach((slide,index)=>{
  slide.style.left = `${index * 100}%`
});

const goNext = () =>{
  if(counter === 5){
    counter = -1;
  }
  counter ++;
  slides.forEach((slide)=>{
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

const goPrev = () =>{
  if(counter === 0){
    counter = 6;
  }
  counter--;
  slides.forEach((slide)=>{
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

setInterval(function(){
  if(counter === 5){
    counter = -1;
  }
  counter++;
},5000);

setInterval(function slideImage(){
  slides.forEach((slide)=>{
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
},5000);

//open
let menuSymbol = document.querySelector('.menuSymbol');
let middle = document.querySelector('.middle');
menuSymbol.addEventListener('click',function(){
  middle.style.display = "block";
});

//close
let closeSymbol = document.querySelector('.closeMenu');
closeSymbol.addEventListener('click',function(){
  middle.style.display = "none";
});

// scrollUp
const scrollUp = () =>{
  const scrollUp = document.getElementById('scroll-up')

  this.scrollY >= 80 ? scrollUp.classList.add('showscroll')
                       : scrollUp.classList.remove('showscroll')
}
window.addEventListener('scroll',scrollUp);