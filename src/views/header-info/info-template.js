
import {DATE_FORMAT} from '../../const.js';
import {humanizeDueDate} from '../../utils/utils-point.js';

function templateInfo(pointModel, offerModel, totalPrice) {
  const points = pointModel.total;
  const offers = offerModel.total;
  console.table(points);
  // console.log(offers);


  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">${humanizeDueDate(points[0].dateFrom, DATE_FORMAT.monthDay)}&nbsp;&mdash;&nbsp;${humanizeDueDate(points[points.length - 1].dateTo, DATE_FORMAT.monthDay)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
}

export {templateInfo};
