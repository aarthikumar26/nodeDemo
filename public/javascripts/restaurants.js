navigator.geolocation.getCurrentPosition(function (position) {
	$.ajax({
		url: "/restaurants",
		type: "post",
		data: {
			lat: position.coords.latitude,
			lon: position.coords.longitude
		},
		success: function (response) {
            if(response.length > 0){
                const errorWrapper = document.getElementById('errorWrapper');
                if(errorWrapper) {
                    errorWrapper.style.display = 'none';
                }
                const restaurantsWrapper = document.getElementById('restaurantsWrapper');
                if(restaurantsWrapper){
                    restaurantsWrapper.style.display = 'block';
                    restaurantsWrapper.innerHTML = "";
                }
                response.forEach(function(place){
                    console.log('place', place)
                    const li = document.createElement('li');
                    li.className = "list-group-item";
                    li.innerHTML = place.establishment.name;
                    restaurantsWrapper.appendChild(li);
                })
            }

		}
	});

});
