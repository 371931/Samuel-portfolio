const noteCon = document.querySelector('.addedContainer');
const textBox = document.querySelector('.typeArea');

function addNote(){
  if (textBox.value === '') {
    alert('Type a Note and then Continue');
  } else {
    const newElement = document.createElement('div');
    newElement.innerHTML = toBeAdded(textBox.value);

    // Attach event listeners directly to the new note
    newElement.querySelector('.checked').addEventListener('click',()=>{
      toggleCheck(newElement);
    });

    newElement.querySelector('.xSymbol').addEventListener('click',()=>{
      deleteNoteElement(newElement);
    });

    noteCon.append(newElement);

    textBox.value = '';
    saveData();
  }
}

function toBeAdded(note){
  return `<div class="addedNote">
  <div class="checked"><i class="fa fa-circle-thin" aria-hidden="true"></i><span class="ticker"><i class="fa fa-check" aria-hidden="true"></i></span>
  </div>
  <div class="contentNote">${note}</div>
  <div class="xSymbol"><i class="fa fa-times" aria-hidden="true"></i></div>
</div>`
}

function toggleCheck(element) {
  const change = element.querySelector('.fa-circle-thin');
  change.classList.toggle('oncli');
  const tickM = element.querySelector('.ticker');
  const strike = element.querySelector('.contentNote');
  if (change.classList.contains('oncli')) {
    tickM.style.display = "block";
    strike.classList.add('lineThrough');
  } else {
    tickM.style.display = "none";
    strike.classList.remove('lineThrough');
  }
  saveData();
}

function deleteNoteElement(element) {
  element.remove();
  saveData();
}


function checkNote(){
let checkBun = noteCon.querySelectorAll('.checked');

  checkBun.forEach((btnC)=>{
  btnC.addEventListener('click',function(){
    let change = btnC.querySelector('.fa-circle-thin')
    change.classList.toggle('oncli');
    let tickaPar = change.parentElement; 
    let tickM = tickaPar.querySelector('.ticker');
    if(change.classList.contains('oncli')){
      tickM.style.display = "block";
      let mainCon = change.parentElement.parentElement;
      let strike = mainCon.querySelector('.contentNote');
      strike.classList.add('lineThrough');
    }else{
      tickM.style.display = "none";
      let mainCon = change.parentElement.parentElement;
      let strike = mainCon.querySelector('.contentNote');
      strike.classList.remove('lineThrough');
    }
    saveData();
    });
  });
}

function deleteNote(){
  let del = noteCon.querySelectorAll('.xSymbol');
  del.forEach((delBtn)=>{
    delBtn.addEventListener('click',function(){
      delBtn.parentElement.parentElement.remove();
      saveData();
    });
  });
}

function oFo(){
  document.addEventListener('keydown',(key)=>{
    let keyna = document.querySelector('.typeArea');
    if(key.key === 'Enter'){
      if (keyna.value === '') {
      } else {
        const newElement = document.createElement('div');
        newElement.innerHTML = toBeAdded(textBox.value);
    
        // Attach event listeners directly to the new note
        newElement.querySelector('.checked').addEventListener('click',()=>{
          toggleCheck(newElement);
        });
    
        newElement.querySelector('.xSymbol').addEventListener('click',()=>{
          deleteNoteElement(newElement);
        });
    
        noteCon.append(newElement);
    
        textBox.value = '';
        saveData();
      }
    }
  });
}

function saveData(){
  localStorage.setItem('todolist',noteCon.innerHTML);
}

function showList(){
  noteCon.innerHTML = localStorage.getItem('todolist');
  checkNote();
  deleteNote();
}

showList();
