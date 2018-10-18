function initMap(){
    /*
        Expects: diseases (list)
        [(name, district)]
    */

    diseases = [
        {
            name: "alcohol",
            district: "quarry bay"
        },
        {
            name: "bipolar",
            district: "central"
        },
        {
            name: "suicidal",
            district: "kai tak"
        }
        /*
        {
            name: "depression",
            district: "central"
        }
        avoid having multiple centers of top of each other during demo
        */
    ]

    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(22.3104586,114.1827152),
        zoom: 14
    });

    var colors = {
        "alcohol": '#FF0000',
        "bipolar": '#00FF00',
        "depression": '#0000FF',
        "suicidal": '#FF7F27'
    };

    var districtCenters = {
        "quarry bay": new google.maps.LatLng(22.2807441,114.2123564),
        "chai wan": new google.maps.LatLng(22.2670363,114.2355394),
        "wan chai": new google.maps.LatLng(22.2773499,114.1696255),
        "central": new google.maps.LatLng(22.2821282,114.1554406),
        "sheung wan": new google.maps.LatLng(22.2872886,114.1474316),
        "sai ying pun": new google.maps.LatLng(22.2873157,114.1408086),
        "tsim sha tsui": new google.maps.LatLng(22.2625258,114.0695733),
        "to kwa wan": new google.maps.LatLng(22.3161392,114.1853441),
        "kai tak": new google.maps.LatLng(22.3192832,114.1955903),
        "kowloon bay": new google.maps.LatLng(22.3270809,114.2038707),
        "kwun tong": new google.maps.LatLng(22.3120123,114.2193389)
    };

    for(var disease in diseases){
        var color = colors[diseases[disease].name];
        var district = districtCenters[diseases[disease].district];
        var heatCircle = new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            map: map,
            center: district,
            radius: 500,
            infoString: "Disease: "+diseases[disease].name+"<br>"+"District: "+diseases[disease].district
        });
        

        var infoWindow = new google.maps.InfoWindow({});
        var marker = new google.maps.Marker({
            map: map
        });

        google.maps.event.addListener(heatCircle, 'mouseover', function(){
            marker.setPosition(this.getCenter());
            infoWindow.setContent(this.infoString);
            infoWindow.open(map, marker);
            marker.setVisible(false);
        });

        google.maps.event.addListener(heatCircle, 'mouseout', function(){
            infoWindow.close();
        })
    }
}


    