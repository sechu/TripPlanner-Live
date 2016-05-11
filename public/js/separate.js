 // {% autoescape false %}
     
  
 
  $(document).ready(function() {
      hotels.forEach(function(hotel) {
        $('#hotel-choices').append('<option>'+hotel.name+'</option>');
      });

      restaurants.forEach(function(restaurant) {
        $('#restaurant-choices').append('<option>'+restaurant.name+'</option>');
      });

      activities.forEach(function(activity) {
        $('#activity-choices').append('<option>'+activity.name+'</option>');
      });
  });
  
 // {% endautoescape %}
