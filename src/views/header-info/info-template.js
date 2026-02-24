function templateInfo(startTripDay, endTripDay, firstCity, middleCity, lastCity, totalPrice) {
  // console.log(startTripDay, endTripDay);
  // console.log(firstCity);
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${firstCity} &mdash; ${middleCity} &mdash; ${lastCity}</h1>

        <p class="trip-info__dates">${startTripDay}&nbsp;&mdash;&nbsp;${endTripDay}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
}

export {templateInfo};
