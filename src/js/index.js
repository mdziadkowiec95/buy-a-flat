import Slider from './models/Slider';
import Search from './models/Search';
import * as searchView from './views/searchView';
import * as singleFlatView from './views/singleFlatView';
import * as sliderView from './views/sliderView';
import './views/base';
import { renderLoader, removeLoader } from './views/base';



const state = {
  /** 
   * activeInvestment: {Investment instance of recently fetched data}
   * filters: <---- filters object (data colleted from search form inputs)
   * flats: []  <--- Array of all flats from fatched DATA
   * filteredFlats: [] <--- Array of flats after executing filters
   */
};

window.s = state;

// Filtering flats controller
const controlFiltering = async () => {

  const newFilters = searchView.getFilters();

  // Data is not fetched yet OR user changed Investment
  if (!state.activeInvestment || (newFilters.investment !== state.activeInvestment.filters.investment)) {
    console.log('poszło');

    searchView.clearInputs();

    try {
      state.activeInvestment = new Search(newFilters);

      renderLoader();

      await state.activeInvestment.getFlats(newFilters.investment);

      state.activeInvestment.calcPricePerMeter();
      state.activeInvestment.filterFlats(state.activeInvestment.filters);

      removeLoader();

      searchView.clearFlats();
      searchView.renderFlats(state.activeInvestment.flats);

    } catch (error) {
      alert(error);
    }

  } else if (state.activeInvestment.compareFilters(newFilters)) {

    console.log('inne filtry');

    state.activeInvestment.filters = newFilters;

    state.activeInvestment.filterFlats(state.activeInvestment.filters);

    searchView.clearFlats();
    searchView.renderFlats(state.activeInvestment.filteredFlats);

  } else {
    console.log('nic sie nie zmienilo');
  }
}

document.querySelector('.search-form').addEventListener('submit', e => {
  e.preventDefault();

  controlFiltering();
});

// Sorting flats controller
const controlSorting = (target) => {
  if (state.activeInvestment && state.activeInvestment.filteredFlats) {
    const sortNavItem = target.closest('.table-nav-item');
    // console.log(target.closest('.table-nav-item').dataset);
    const sortDirection = searchView.handleSortingClasses(sortNavItem);

    state.activeInvestment.sortFlats(sortNavItem.dataset.sort, sortDirection);

    searchView.clearFlats();
    searchView.renderFlats(state.activeInvestment.filteredFlats);
  }
};

document.querySelector('.table-nav').addEventListener('click', e => {
  if (e.target.matches('.table-nav-item, .table-nav-item *')) {
    controlSorting(e.target);
  }
});

// Single flat preview controller
const controlFlatPreview = (target) => {
  const ID = target.parentNode.parentNode.parentNode.id;
  const flatIndex = state.activeInvestment.flats.findIndex(el => el.flatID === ID);

  console.log(ID);

  singleFlatView.showModal();
  singleFlatView.renderDetails({ ...state.activeInvestment.flats[flatIndex] });
};


document.querySelector('.flats').addEventListener('click', e => {

  if (e.target.matches('.flat-preview .fa-search-plus')) {
    e.preventDefault();

    controlFlatPreview(e.target);
  } else if (e.target.matches('.modal .close-btn, .modal .close-btn *')) {
    singleFlatView.closeModal();
  }
});



//  SLIDER controller


// window.slider = slider;




window.addEventListener('load', () => {
  sliderView.startSlider(1000);
});

