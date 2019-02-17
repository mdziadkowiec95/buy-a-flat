export const getFilters = () => {
  const fields = document.querySelectorAll('.search-form select, .search-form .input');

  const filters = {};

  for (let i = 0; i < fields.length; i++) {
    filters[fields[i].id] = fields[i].value;
  }

  return filters;

}  