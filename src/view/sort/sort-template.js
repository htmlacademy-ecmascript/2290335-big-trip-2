function templateSortItem(type, currentSortType) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
        <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${currentSortType === type ? 'checked' : ''}>
        <label class="trip-sort__btn filter-avaible" for="sort-${type}" data-sort-type="${type}">${type}</label>
      </div>`
  );
}

function templateSort(sortTypes, currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${templateSortItem(sortTypes.DAY, currentSortType)}
      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>
      ${templateSortItem(sortTypes.TIME, currentSortType)}
      ${templateSortItem(sortTypes.PRICE, currentSortType)}
      <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
    </form>`
  );
}

export {templateSort};
