$(function() {
  $("#search").click(function() {
    $.ajax({
      method: "GET",
      url: "https://data.kaohsiung.gov.tw/Opendata/DownLoad.aspx?Type=2&CaseNo1=AV&CaseNo2=2&FileType=1&Lang=C&FolderType=",
      dataType: "json"
    })
      .done(function(data) {
        var markers = [];
        deleteMarkers();
        $.each(data, function(i, e) {
          if($("#dist :selected").attr("data-i") == e.Zipcode) {
            var latLng = new google.maps.LatLng(e.Py, e.Px);
            var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              title: e.Name
            });
            markers.push(marker);
          }
        });
        function deleteMarkers() {
          markers.forEach(function(e) {
            e.setMap(null);
          });
          markers = [];
        }
        var site = $('select option:selected').val().split(',');
        map.setCenter(new google.maps.LatLng(site[0], site[1]));
        map.setZoom(13);
      });
  });
});
var map;
function initMap() {
  map = new google.maps.Map(document.querySelector("#map"), {
    center: {lat: 22.7025199, lng:120.4126757},
    zoom: 10
  });
}