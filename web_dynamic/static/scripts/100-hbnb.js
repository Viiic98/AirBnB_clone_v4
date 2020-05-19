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

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      $('DIV#api_status').css({ 'background-color': '#ff545f' });
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').css({ 'background-color': '#cccccc' });
      $('DIV#api_status').removeClass('available');
    }
  });

  function loadPlaces (dataContent = '{}') {
    $('.places').empty();
    $.ajax({
      method: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: dataContent,
      contentType: 'application/json',
      success: function (data, textStatus) {
        if (textStatus === 'success') {
          for (const place of data) {
            const article = $('<article></article>');
            const titleBox = $('<div class="title_box"></div>');
            const name = '<h2>' + place.name + '</h2>';
            const price = $('<div class="price_by_night">$' + place.price_by_night + '</div>');
            $(titleBox).append(name, price);
            const information = $('<div class="information"></div');
            const maxGuest = $('<div class="max_guest"></div>');
            if (place.max_guest !== 1) {
              $(maxGuest).text(place.max_guest + ' Guests');
            } else {
              $(maxGuest).text(place.max_guest + ' Guest');
            }
            const numberRooms = $('<div class="number_rooms"></div>');
            if (place.number_rooms !== 1) {
              $(numberRooms).text(place.number_rooms + ' Rooms');
            } else {
              $(numberRooms).text(place.number_rooms + ' Room');
            }
            const numberBathrooms = $('<div class="number_bathrooms"></div>');
            if (place.number_bathrooms !== 1) {
              $(numberBathrooms).text(place.number_bathrooms + ' Bathrooms');
            } else {
              $(numberBathrooms).text(place.number_bathrooms + ' Bathroom');
            }
            $(information).append(maxGuest, numberRooms, numberBathrooms);
            const description = $('<div class="description">' + place.description + '</div>');
            const user = $('<div class="user"></div>');
            $(user).append('<b>Owner: </b>');
            $(article).append(titleBox, information, user, description);
            $('.places').append(article);
          }
        } else {
          console.log(textStatus);
        }
      }
    });
  }

  $(':button').click(function () {
    const jsonDict = {};
    jsonDict.amenities = [];
    jsonDict.states = [];
    jsonDict.cities = [];
    for (const am of amenities) {
      jsonDict.amenities.push(am.id);
    }
    for (const st of states) {
      jsonDict.states.push(st.id);
    }
    for (const ct of cities) {
      jsonDict.cities.push(ct.id);
    }
    if (jsonDict.amenities.length === 0 &&
        jsonDict.states.length === 0 &&
        jsonDict.cities.length === 0) {
      loadPlaces();
    } else {
      loadPlaces(JSON.stringify(jsonDict));
    }
  });

  const states = [];
  let stateNames = '';
  $('.locations div ul li :checkbox').unbind().click(function () {
    const state = {};
    const stateId = $(this).data('id');
    const stateName = $(this).data('name');
    state.id = stateId;
    state.name = stateName;
    if ($(this).is(':checked')) {
      states.push(state);
    } else {
      const index = states.findIndex(x => x.id === stateId);
      states.splice(index, 1);
    }
    let names = '';
    for (let i = 0; i < states.length; i++) {
      names += states[i].name;
      if (i + 1 < states.length) {
        names += ', ';
      }
    }
    stateNames = names;
    if (names) {
      if (cityNames) {
        names += ', ' + cityNames;
      }
      $('.locations h4').text(names);
    } else if (cityNames) {
      $('.locations h4').text(cityNames);
    } else {
      $('.locations h4').html('&nbsp;');
    }
  });

  const cities = [];
  let cityNames = '';
  $('.locations div ul li ul li :checkbox').unbind().click(function () {
    const city = {};
    const cityId = $(this).data('id');
    const cityName = $(this).data('name');
    city.id = cityId;
    city.name = cityName;
    if ($(this).is(':checked')) {
      cities.push(city);
    } else {
      const index = cities.findIndex(x => x.id === cityId);
      cities.splice(index, 1);
    }
    let names = '';
    for (let i = 0; i < cities.length; i++) {
      names += cities[i].name;
      if (i + 1 < cities.length) {
        names += ', ';
      }
    }
    cityNames = names;
    if (names) {
      if (stateNames) {
        $('.locations h4').text(stateNames + ', ' + names);
      } else {
        $('.locations h4').text(names);
      }
    } else if (stateNames) {
      $('.locations h4').text(stateNames);
    } else {
      $('.locations h4').html('&nbsp;');
    }
  });
  
  loadPlaces();
});
