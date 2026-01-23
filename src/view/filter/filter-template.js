function createFilterItemTemplate(filter, isChecked) {
  const {type, count} = filter;

  return (
    `
    <div class="trip-filters__filter">
      <input
         type="radio"
         id="filter-${type}"
         class="trip-filters__filter-input visually-hidden"
         name="trip-filter"
         ${isChecked ? 'checked' : ''}
         ${count === 0 ? 'disabled' : ''}
      />
      <label for="filter-${type}" class="trip-filters__filter-label">${type}</label>
    </div>
    `
  );
}

function createHeaderFiltersTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export { createHeaderFiltersTemplate };
