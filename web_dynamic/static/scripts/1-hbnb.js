$(document).ready(function () {
  const amenities = [];
  $('.amenities div ul li input').click(function () {
    const amenity = {};
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    amenity.id = amenityId;
    amenity.name = amenityName;
    if ($(this).is(':checked')) {
      amenities.push(amenity);
    } else {
      const index = amenities.findIndex(x => x.id === amenityId);
      amenities.splice(index, 1);
    }
    const names = [];
    for (const ame of amenities) {
      names.push(ame.name);
    }
    if (names[0]) {
      $('.amenities h4').text(names);
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  });
});
