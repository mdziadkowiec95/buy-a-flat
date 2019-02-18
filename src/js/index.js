import Investment from './models/Investment';
import * as investmentView from './views/investmentView';



const state = {
  /** 
   * investment: {Investment instance}
   */
}

window.s = state;


const controlFiltering = async () => {

  const newFilters = investmentView.getFilters();
  // console.log(newFilters);



  // Data is not fetched yet OR user changed Investment
  if (!state.investment || (newFilters.investment !== state.investment.filters.investment)) {
    console.log('poszło');

    investmentView.clearInputs();

    try {
      state.investment = new Investment(newFilters);
      await state.investment.getFlats();

    } catch (error) {
      alert(error);
    }

  } else if (state.investment.compareFilters(newFilters)) {

    console.log('inne filtry');

    state.investment.filters = newFilters;

    state.investment.filterFlats(state.investment.filters);

    investmentView.renderFlats(state.investment.filteredFlats);

  } else {

    console.log('nic sie nie zmienilo');
  }

}




document.querySelector('.search-form').addEventListener('submit', e => {
  e.preventDefault();

  controlFiltering();


})




