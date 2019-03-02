

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

  const setActiveClass = index => {
    console.log(`setActive ===> ${index}`);
    [].slice.call(sliderItems).forEach(slide => slide.classList.remove('slider__item--active'));
    sliderItems[index].classList.add('slider__item--active');
  }


  const setPosition = percentage => {
    sliderTrack.classList.add('transition-off');

    sliderTrack.style.WebkitTransform = sliderTrack.style.transform = 'translate(-' + percentage + '%, 0)';

    setTimeout(() => {
      sliderTrack.classList.remove('transition-off');
    }, 0);

  }

  sliderTrack.style.width = `${(sliderItemsLength + 2) * 100}%`;

  const singleSlideWidth = 100 / (sliderItemsLength + 2);

  allItems.forEach(item => item.style.width = `${singleSlideWidth}%`);

  slider.classList.add('initialized');



  setPosition(singleSlideWidth);

  setActiveClass(1);






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
    console.log(`Start index: ${index}`);

    if (!sliderTrack.classList.contains('is-sliding')) {


      sliderTrack.classList.add('is-sliding');
      console.log(index);


      sliderTrack.style.WebkitTransform = sliderTrack.style.transform = 'translate(-' + (index * singleSlideWidth) + '%, 0)';

      if (index !== 0 && index < sliderItemsLength + 1) setActiveClass(index);


      curSlide = index;

      console.log(index);

      sliderTrack.addEventListener('transitionend', e => {

        if (curSlide === 0) {

          setPosition(sliderItemsLength * singleSlideWidth);
          setActiveClass(3);

          curSlide = sliderItemsLength;

        } else if (curSlide > sliderItemsLength) {

          setPosition(1 * singleSlideWidth);
          setActiveClass(1);

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