import {render, replace, remove} from '../framework/render.js';
import HeaderFilterView from '../view/header-filter/header-filter-view.js';
import {filter} from '../utils/filter.js';
import {FilterType, UpdateType} from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointModel = null;

  #filterComponent = null;

  constructor({container, filterModel, pointModel}) {
    this.#filterContainer = container;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filter() {
    // console.log(this.#pointModel);
    const tasks = this.#pointModel.total;

    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](tasks).length
    }));
  }

  init() {
    const activeFilter = this.filter;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new HeaderFilterView({
      activeFilter,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
