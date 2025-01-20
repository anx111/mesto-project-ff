//открытие модального окна
export function openModalWindow(modalWindow){
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keyup', closeModalWindowEscape);
  document.addEventListener('mousedown', overlayMouseDown);
  document.addEventListener('mouseup', overlayMouseUp);
}

export function closeModalWindow(modalWindow) {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeModalWindowEscape);
  document.removeEventListener('mousedown', overlayMouseDown);
  document.removeEventListener('mouseup', overlayMouseUp);
}

function closeModalWindowEscape (event){ 
  if (event.key === 'Escape') { 
    closeModalWindow(document.querySelector('.popup_is-opened')); 
  }
}

function overlayMouseDown(event){
  if(!event.target.classList.contains('popup_is-opened')) return;
  event.target.isClickOnThis = true;
}

function overlayMouseUp(event){ 
  if (event.target.isClickOnThis && event.target.classList.contains('popup_is-opened')) { 
    event.preventDefault(); 
    closeModalWindow(event.target); 
  }
  event.target.isClickOnThis = false; 
}