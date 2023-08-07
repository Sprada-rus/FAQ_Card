interface ITarget {
  [key: string]: any
}

/*
* That closure function to store the active element
*/
const accordion = () => {
  let activeItem: HTMLElement|undefined = undefined;

  // Here we get height
  const getHeightContent = (el: HTMLElement) => {
    return el.getBoundingClientRect().height;
  }


  //Here we set height
  const setHeightElement = (el: HTMLElement, num: number) => {
    el.parentElement?.style.setProperty('--content-height', `${num}px`)
  }

  // If need delete height, we do it here
  const deleteHeightElement = (el: HTMLElement) => {
    el?.style.removeProperty('--content-height');
  }

  // That handler with logic open and close element
  const actionHandler = (event: Event) => {   
    //Get target 
    const target: ITarget|null  = event.target;
    // Search parent element .accordion-list__item
    const item = target?.closest('.accordion-list__item');

    // If target is content, we did'nt close element
    // If parent equal the active item, we delete the active item and delete class
    if (target?.classList.contains('content') || target?.tagName.toLowerCase() === 'p') {
      return;
    } else if (item === activeItem) {
      item.classList.remove('open');
      activeItem = undefined;
      return;
    }

    if (activeItem) {
      activeItem?.classList.remove('open');
      deleteHeightElement(activeItem)
    }

    activeItem = item as HTMLElement;
    const contentActiveItem:HTMLElement|null = activeItem.querySelector('.content > p');

    if (!contentActiveItem) {
      return console.error('not found content');
    }

    const height = getHeightContent(contentActiveItem);
    setHeightElement(contentActiveItem, height);

    activeItem.classList.add('open');
  }

  return {actionHandler}
}


const {actionHandler} = accordion();
document.querySelectorAll('.accordion-list__item').forEach(el => {
  el.addEventListener('click', actionHandler);
})