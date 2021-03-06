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
    let names = '';
    for (let i = 0; i < amenities.length; i++) {
      names += amenities[i].name;
      if (i + 1 < amenities.length) {
        names += ', ';
      }
    }
    if (names) {
      $('.amenities h4').text(names);
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  });
});
