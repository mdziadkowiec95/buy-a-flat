export const showModal = () => {
  document.querySelector('.modal').classList.add('is-active');
};

const clearModalContent = () => {
  document.querySelector('.modal-card-body').innerHTML = '';
};


export const closeModal = () => {
  document.querySelector('.modal').classList.remove('is-active');

  clearModalContent();
}


export const renderDetails = (
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
    <p>${flatID}</p>
    <p>${price}</p>
    <p>${floor}</p>
    <p>${rooms}</p>
    <p>${area}</p>
    <p>${status}</p>
    <p>${pricePerMeter}</p>
    <img src="${planIMG}">
    `;

  document.querySelector('.modal-card-body').insertAdjacentHTML('afterbegin', html);

};