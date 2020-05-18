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

  $.get('http://localhost:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      $('DIV#api_status').css({ 'background-color': '#ff545f' });
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').css({ 'background-color': '#cccccc' });
      $('DIV#api_status').removeClass('available');
    }
  });

  function getMonthName (monthNumber) {
    const months = [' January ', ' February ', ' March ', ' April ', ' May ', ' June ', ' July ', ' August ', ' September ', ' October ', ' November ', ' December '];
    return months[monthNumber - 1];
  }

  function dateTranslate (date) {
    const dateFormat = date.split('-');
    return [dateFormat[0], getMonthName(dateFormat[1]), dateFormat[2].substr(0, 2)];
  }

  function loadPlaces (dataContent = '{}') {
    $('.places').empty();
    $.ajax({
      method: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
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
            const reviews = $('<div class="reviews"></div>');
            const reviewBox = $('<div class="review_box"></div>')
            $(reviewBox).css('display', 'flex');
            $(reviewBox).css('justify-content', 'space-between');
            $(reviewBox).css('padding-right', '20px');
            const titleRev = $('<h2>Reviews</h2>');
            const show = $('<span class="revSpan">show</span>');
            $(show).css("cursor", "pointer");
            $(show).hover(function () {$(this).css('opacity', '0.7')}, function () {$(this).css('opacity', 'initial')});
            $(reviewBox).append(titleRev, show);
            const revList = $('<ul></ul>');
            $.get('http://localhost:5001/api/v1/places/' + place.id + '/reviews/', function (data, textStatus) {
              if (textStatus === 'success') {
                for (const review of data) {
                  const list = $('<li></li>');
                  const date = dateTranslate(review.updated_at);
                  $(list).append($('<h3>From Bob Dylan the ' + date[2] + 'th' + date[1] + date[0] + '</h3>'));
                  $(list).append($('<p>' + review.text + '</p>'));
                  $(revList).append(list);
                }
                $(reviews).append(reviewBox, revList);
              }
            });
            $(article).append(titleBox, information, user, description, reviews);
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
    const names = [];
    for (const st of states) {
      names.push(st.name);
    }
    if (names[0]) {
      $('.locations h4').text(names);
    } else {
      $('.locations h4').html('&nbsp;');
    }
  });

  const cities = [];
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
    const names = [];
    for (const ct of cities) {
      names.push(ct.name);
    }
    if (names[0]) {
      $('.locations h4').text(names);
    } else {
      $('.locations h4').html('&nbsp;');
    }
  });
  $(document).on('click', '.revSpan', function () {
    if ($(this).text() === 'show') {
      $(this).text('hide');
    } else {
      $(this).text('show');
    }
    $(this).parent().next().toggle();
  });
  loadPlaces();
});
