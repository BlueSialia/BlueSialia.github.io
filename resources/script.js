function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 51.91, lng: -8.18},
        mapTypeId: 'terrain'
	});
    const squareCoords = [
        {lat: map.center.lat() - 0.2, lng: map.center.lng() + 0.3},
        {lat: map.center.lat() + 0.2, lng: map.center.lng() + 0.3},
        {lat: map.center.lat() + 0.2, lng: map.center.lng() - 0.3},
        {lat: map.center.lat() - 0.2, lng: map.center.lng() - 0.3}
    ];
    const workArea = new google.maps.Polygon({
        paths: squareCoords,
        strokeColor: '#009999',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    workArea.setMap(map);
}

$(function(){
    $(".typed").typed({
        strings: ["Developer", "Engineer", "Architect"],
        typeSpeed: 30,
        startDelay: 1200,
        backSpeed: 20,
        backDelay: 2000,
        loop: true,
        loopCount: false,
        showCursor: true,
        cursorChar: "|",
    });
});