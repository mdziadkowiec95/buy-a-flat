

export const startSlider = (duration) => {
  const slider = document.querySelector('.slider'),
    sliderTrack = document.querySelector('.slider__track'),
    sliderItems = sliderTrack.children,
    sliderItemsLength = sliderItems.length,
    firstSlide = sliderItems[0],
    lastSlide = sliderItems[sliderItems.length - 1];

  let curSlide = 1;

  // Clone first and last el
  sliderTrack.appendChild(firstSlide.cloneNode(true));
  sliderTrack.insertBefore(lastSlide.cloneNode(true), firstSlide);


  sliderTrack.style.width = `${(sliderItemsLength + 2) * 100}%`;

  let singleSlideWidth = 100 / (sliderItemsLength + 2);

  sliderTrack.style.transform = `translate(-${singleSlideWidth}%, 0)`;

  document.querySelectorAll('.slider__item').forEach(item => item.style.width = `${singleSlideWidth}%`);


  const next = () => changeSlide(curSlide + 1);
  const prev = () => changeSlide(curSlide - 1);

  const changeSlide = index => {
    // update curSlide
    console.log(index);


    sliderTrack.style.WebkitTransform = sliderTrack.style.transform = 'translate(-' + (index * singleSlideWidth) + '%, 0)';
    curSlide = index;

    if (index === 0) {

      sliderTrack.style.WebkitTransform = sliderTrack.style.transform = 'translate(-' + (sliderItemsLength * singleSlideWidth) + '%, 0)';

      curSlide = 4;

    } else if (index > sliderItemsLength) {
      // alert();

      sliderTrack.style.WebkitTransform = sliderTrack.style.transform = 'translate(-' + (1 * singleSlideWidth) + '%, 0)';

      curSlide = 1;
    }

  };


  // autoplay 
  if (duration) {
    setInterval(() => {
      changeSlide(curSlide + 1);
    }, duration);
  }

  document.querySelector('.slider-controls').addEventListener('click', e => {

    if (e.target.matches('.slider__prev')) {
      prev();
    } else if (e.target.matches('.slider__next')) {
      next();
    }

  });


};