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


export const renderFlats = flats => {
  flats.forEach(el => {
    document.querySelector('.flats').innerHTML += '<p>' + el.flatID + '|' + el.price + '|' + el.area + '|' + el.floor + '|' + el.rooms + '</p>';
  })
}