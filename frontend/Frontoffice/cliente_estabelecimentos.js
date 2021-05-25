window.onload = () => {

    const renderPlaces = async () => {

        const response = await fetch(`http://localhost:5050/places`)
        const p = await response.json()
        const places = p.data

        x = navigator.geolocation;
        x.getCurrentPosition(success, failure);

        function success(position) {
            var myLat = position.coords.latitude;
            var myLong = position.coords.longitude;
            var coords = new google.maps.LatLng(myLat, myLong);

            var mapOptions = {
                zoom: 9,
                position: coords,
                center: coords,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            
            }

            var map1 = new google.maps.Map(document.getElementById("map1"), mapOptions);
            var map2 = new google.maps.Map(document.getElementById("map2"), mapOptions);
            var map3 = new google.maps.Map(document.getElementById("map3"), mapOptions);
            var map4 = new google.maps.Map(document.getElementById("map4"), mapOptions);
            var map5 = new google.maps.Map(document.getElementById("map5"), mapOptions);
            var map6 = new google.maps.Map(document.getElementById("map6"), mapOptions);

            var marker = new google.maps.Marker({ map: map1, position: coords          })

            var marker = new google.maps.Marker({ map: map2, position: coords });
            var marker = new google.maps.Marker({ map: map3, position: coords });
            var marker = new google.maps.Marker({ map: map4, position: coords });
            var marker = new google.maps.Marker({ map: map5, position: coords });
            var marker = new google.maps.Marker({ map: map6, position: coords });

            console.log(places);

            for (const place of places) {
                if (place["28d2372914521a41b8302b06aa14d81335911389"] == "Bancas Loiça") {
                    console.log(place);

                    var latDestino1 = place["7abcfc2737c4658269489646f1573be349ecc40a"];
                    var longDestino1 = place["6f41379348685c872fa808a8410012847366c214"];
                    var coordsDestino1 = new google.maps.LatLng(latDestino1, longDestino1);

                    var markerDestino1 = new google.maps.Marker({
                         map: map1, position: coordsDestino1,
                         icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" , 
                         });

                    //console.log(place);
                } 

                if (place["28d2372914521a41b8302b06aa14d81335911389"] == "Restauração") {
                    console.log(place);

                    var latDestino2 = place["7abcfc2737c4658269489646f1573be349ecc40a"];
                    var longDestino2 = place["6f41379348685c872fa808a8410012847366c214"];
                    var coordsDestino2 = new google.maps.LatLng(latDestino2, longDestino2);

                    var markerDestino2 = new google.maps.Marker({
                        map: map2, position: coordsDestino2,
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" , 
                        });

                    //console.log(place);
                } 
                if (place["28d2372914521a41b8302b06aa14d81335911389"] == "Palco secundário") {

                    var latDestino3 = place["7abcfc2737c4658269489646f1573be349ecc40a"];
                    var longDestino3 = place["6f41379348685c872fa808a8410012847366c214"];
                    var coordsDestino3 = new google.maps.LatLng(latDestino3, longDestino3);

                    var markerDestino3 = new google.maps.Marker({
                        map: map3, position: coordsDestino3,
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" , 
                        });

                } 
                if (place["28d2372914521a41b8302b06aa14d81335911389"] == "Palco principal") {

                    var latDestino4 = place["7abcfc2737c4658269489646f1573be349ecc40a"];
                    var longDestino4 = place["6f41379348685c872fa808a8410012847366c214"];
                    var coordsDestino4 = new google.maps.LatLng(latDestino4, longDestino4);

                    var markerDestino4 = new google.maps.Marker({
                        map: map4, position: coordsDestino4,
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" , 
                        });

                }
                if (place["28d2372914521a41b8302b06aa14d81335911389"] == "Aluguer de material") {

                    var latDestino5 = place["7abcfc2737c4658269489646f1573be349ecc40a"];
                    var longDestino5 = place["6f41379348685c872fa808a8410012847366c214"];
                    var coordsDestino5 = new google.maps.LatLng(latDestino5, longDestino5);

                    var markerDestino5 = new google.maps.Marker({
                        map: map5, position: coordsDestino5,
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" , 
                        });

                }

                if (place["28d2372914521a41b8302b06aa14d81335911389"] == "WC") {

                    var latDestino6 = place["7abcfc2737c4658269489646f1573be349ecc40a"];
                    var longDestino6 = place["6f41379348685c872fa808a8410012847366c214"];
                    var coordsDestino6 = new google.maps.LatLng(latDestino6, longDestino6);

                    var markerDestino6 = new google.maps.Marker({
                        map: map6, position: coordsDestino6,
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" , 
                        });

                } 

            }
            /* addMarker({ lat, long });
                function addMarker(coords) {
                }*/

            }
            function failure() { }
        }
        renderPlaces()
    }

