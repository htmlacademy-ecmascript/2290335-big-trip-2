function templateFilterItem(activeFilter, currentFilterType) {
  const {type, count} = activeFilter;
  return (
    `<div class="trip-filters__filter">
      <input
         type="radio"
         id="filter-${type}"
         class="trip-filters__filter-input visually-hidden"
         name="trip-filter"
         ${type === currentFilterType ? 'checked' : ''}
         ${count === 0 ? 'disabled' : ''}
         value="${type}"
      />
      <label for="filter-${type}" class="trip-filters__filter-label">${type}</label>
    </div>`
  );
}

function templateHeaderFilters(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => templateFilterItem(filter, currentFilterType))
    .join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export {templateHeaderFilters};
