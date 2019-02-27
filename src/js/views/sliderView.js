

export const startSlider = (options) => {
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

  const allItems = [].slice.call(document.querySelectorAll('.slider__item'));

  console.log(allItems);

  sliderTrack.style.width = `${(sliderItemsLength + 2) * 100}%`;

  const singleSlideWidth = 100 / (sliderItemsLength + 2);



  const setPosition = percentage => {
    sliderTrack.classList.add('transition-off');

    sliderTrack.style.WebkitTransform = sliderTrack.style.transform = 'translate(-' + percentage + '%, 0)';

    setTimeout(() => {
      sliderTrack.classList.remove('transition-off');
    }, 0);

  }
  setPosition(singleSlideWidth);

  allItems.forEach(item => item.style.width = `${singleSlideWidth}%`);


  // fade mode
  const turnOnFadeMode = () => {
    sliderTrack.classList.add('fade');
  };

  if (options.fadeMode === true) turnOnFadeMode();

  // -------------------------------------------
  const next = () => changeSlide(curSlide + 1);
  const prev = () => changeSlide(curSlide - 1);

  const changeSlide = index => {
    // update curSlide
    if (!sliderTrack.classList.contains('is-sliding')) {


      sliderTrack.classList.add('is-sliding');
      console.log(index);


      sliderTrack.style.WebkitTransform = sliderTrack.style.transform = 'translate(-' + (index * singleSlideWidth) + '%, 0)';

      curSlide = index;

      console.log(index);

      sliderTrack.addEventListener('transitionend', e => {

        if (curSlide === 0) {

          setPosition(sliderItemsLength * singleSlideWidth);

          curSlide = sliderItemsLength;

        } else if (curSlide > sliderItemsLength) {

          setPosition(1 * singleSlideWidth);

          curSlide = 1;
        }

        sliderTrack.classList.remove('is-sliding');

      });

    }

  };

  // autoplay 
  if (options.duration >= 1000) {
    setInterval(() => {
      changeSlide(curSlide + 1);
    }, options.duration);
  }

  document.querySelector('.slider-controls').addEventListener('click', e => {

    if (e.target.matches('.slider__arrow--prev, .slider__arrow--prev *')) {
      console.log('prev');
      prev();
    } else if (e.target.matches('.slider__arrow--next, .slider__arrow--next *')) {
      console.log('next');
      next();
    }

  });

};