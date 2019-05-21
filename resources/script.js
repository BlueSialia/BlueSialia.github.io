function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {lat: 42.5, lng: -2.8},
        mapTypeId: 'terrain'
    });
    var squareCoords = [
        {lat: 42.1, lng: -2.3},
        {lat: 43, lng: -2.3},
        {lat: 43, lng: -3.4},
        {lat: 42.1, lng: -3.4}
    ];
    var workArea = new google.maps.Polygon({
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