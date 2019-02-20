export const getFilters = () => {
  const fields = [].slice.call(document.querySelectorAll('.search-form select, .search-form .input'));

  const filters = {};

  for (let i = 0; i < fields.length; i++) {
    filters[fields[i].id] = fields[i].tagName === 'SELECT' ? fields[i].value : parseFloat(fields[i].value).toFixed(2);
  }

  return filters;

};

export const clearInputs = () => {
  const fields = [].slice.call(document.querySelectorAll('.search-form .input'));

  fields.forEach(field => field.value = '');

  console.log('cleared fields');
};


const renderFlat = (
  {
    flatID,
    price,
    floor,
    rooms,
    area,
    status,
    planIMG,
    pricePerMeter,
  }) => {
  const html = `
          <tr class="table-row" id="${flatID}">
            <th class="flat-id">${flatID}</th>
            <td class="flat-floor">${floor}</td>
            <td class="flat-rooms">${rooms}</td>
            <td class="flat-area">${area} m2</td>
            <td class="flat-price">${price} $</td>
            <td class="flat-price-m2">${pricePerMeter} $</td>
            <td class="flat-status">${status}</td>
            <td class="flat-preview"><a href="${planIMG}"><i class="fas fa-search-plus"></i></a></td>
          </tr> 
    `;

  document.querySelector('.table-body').insertAdjacentHTML('beforeend', html);
};


export const renderFlats = flats => {
  const tableBody = document.createElement('TBODY');
  tableBody.className = 'table-body';
  document.querySelector('.table').appendChild(tableBody);

  flats.forEach(item => renderFlat({ ...item }));
}

export const clearFlats = () => {
  if (document.querySelector('.table-body')) {
    document.querySelector('.table').removeChild(document.querySelector('.table-body'));
  }
};

export const handleSortingClasses = el => {
  let sortDirection;

  if (el.className === 'table-nav-item') {
    el.classList.add('ascending');
    sortDirection = 'ascending';
  } else if (!el.classList.contains('ascending')) {
    el.classList.remove('descending');
    el.classList.add('ascending');
    sortDirection = 'ascending';
  } else {
    el.classList.remove('ascending');
    el.classList.add('descending');
    sortDirection = 'descending';
  }

  // console.log(sortDirection);
  return sortDirection;


  // RESET ascending / descending classes
  // const tableNavItems = [].slice.call(document.querySelectorAll(`.table-nav-item:not(.${el.className.replace(' ', '.')})`))
  // tableNavItems.forEach(el => el.className = 'table-nav-item');


};