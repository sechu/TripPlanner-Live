$(document).ready(function() {
  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
    return marker;
  }

  function removeMarker(marker) {
    marker.setMap(null);
    console.log('removed');
  }

// --- POPULATE byNAME, main information bank
  hotels.forEach(function(hotel) {
    $('#hotel-choices').append('<option>'+hotel.name+'</option>');
    byName['hotel'][hotel.name] = hotel;
  });

  restaurants.forEach(function(restaurant) {
    $('#restaurant-choices').append('<option>'+restaurant.name+'</option>');
    byName['restaurant'][restaurant.name] = restaurant;
  });

  activities.forEach(function(activity) {
    $('#activity-choices').append('<option>'+activity.name+'</option>');
    byName['activity'][activity.name] = activity;
  });
// --

  var bounds = new google.maps.LatLngBounds();

  $('[data-action="add"]').on('click', function() {
    var type = $(this).prev().data('type');
    var selected = $(this).prev().val();
    var list = 'ul.'+type;

    var obj = byName[type][selected];

    if (itinerary[type].indexOf(obj) === -1) {
      var marker = drawMarker(type, obj.place.location);
      obj.marker = marker;
      itinerary[type].push(obj);

      bounds.extend(obj.marker.position);

      // SET NEW CENTER AND REPOSITION MAP BASED ON BOUNDS
      currentMap.setCenter(new google.maps.LatLng(obj.place.location[0], obj.place.location[1]));
      currentMap.fitBounds(bounds);
      // 

      if ((itinerary.hotel.length > 1) || (itinerary.restaurant.length > 3)) {
        var tobeRemoved = itinerary[type].shift();
        console.log(tobeRemoved);
        removeMarker(tobeRemoved.marker);
        $(list).children()[0].remove();
      }

      // appends information to days
      var newItem = '<li><div class="itinerary-item"><span class="title">'+selected+'</span><button class="btn '+ 'btn-xs btn-danger remove btn-circle">x</button></div></li>';
      $(list).append(newItem);
    }
  });

  $('.list-group').on('click', 'button', function() {
      var li = $(this).parent().parent();
      var type = li.parent().attr('class').split(' ')[1];
      var name = $(this).prev().text();
      console.log(li, type, name);

      var trash = itinerary[type].splice(itinerary[type].indexOf(name), 1);
      removeMarker(trash[0].marker);
      li.remove();

      //worry about later: removing bounds when remove marker
  });


  function changeItinerary (day) {
    currentDay = day;
  }
  // DAYS 
  $('div.day-buttons').on('click', 'button', function() {

    $('.current-day').removeClass('current-day');

    if ($(this).text() === '+') {
      $(this).prev().addClass('current-day');

    } else {
      $(this).addClass('current-day');
    }

    var child = $('#day-title').children()[0];
    console.log(child);
    child.innerHTML = 'Day ' + $('.current-day').text();
  });
 
 $('button#day-add').on('click', function() {

  var newButtonNum = $(this).parent().children().length;
  var newButton = $(this).prev().clone().text(newButtonNum);
  newButton.insertBefore($(this));

 });

});


