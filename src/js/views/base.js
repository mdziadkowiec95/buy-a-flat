const elements = {
  table: document.querySelector('.table'),
};

export const renderLoader = () => {
  const loader = document.createElement('DIV');
  loader.className = 'loader';

  elements.table.appendChild(loader);
};

export const removeLoader = () => {
  elements.table.removeChild(document.querySelector('.loader'));
}