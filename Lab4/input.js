document.addEventListener('DOMContentLoaded', () => {
    const targetElements = document.querySelectorAll('.target');
    
    let isDragging = false; // престаскивание
    let isSticky = false; // прилипание 
    let selectedElement = null; // выбранный элемент
    let originalPositions = new Map(); // исходные позиции
    let offsetX = 0; // смещение курсора от верхнего левого угла блока
    let offsetY = 0;
  
    targetElements.forEach(element => {
      originalPositions.set(element, {
        left: element.style.left,
        top: element.style.top
      });
    });
  
    document.addEventListener('mousedown', (e) => {
      const target = e.target;
      
      if (target.classList.contains('target') && !isSticky) {
        isDragging = true;
        selectedElement = target;
  
        const rect = target.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
      }
    });
    
    document.addEventListener('mousemove', (e) => {
      if ((isDragging || isSticky) && selectedElement) {
        selectedElement.style.left = `${e.clientX - offsetX}px`;
        selectedElement.style.top = `${e.clientY - offsetY}px`;
      }
    });
  
    document.addEventListener('mouseup', () => {
      if (isDragging && !isSticky) {
        isDragging = false;
      } else if (isSticky) {
        isSticky = false;
        selectedElement.style.backgroundColor = 'red';
        selectedElement = null;
      }
    });
    
    document.addEventListener('dblclick', (e) => {
      const target = e.target;
      
      if (target.classList.contains('target')) {
        isDragging = false;
        
        isSticky = true;
        selectedElement = target;
        
        selectedElement.style.backgroundColor = 'blue';
        
        const rect = target.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
      }
    });
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && selectedElement) {
        const originalPosition = originalPositions.get(selectedElement);
        
        if (originalPosition) {
          selectedElement.style.left = originalPosition.left;
          selectedElement.style.top = originalPosition.top;
        }
        
        isDragging = false;
        isSticky = false;
        selectedElement.style.backgroundColor = 'red';
        selectedElement = null;
      }
    });
    
    document.addEventListener('selectstart', (e) => {
      if (isDragging || isSticky) {
        e.preventDefault();
      }
    });
  });