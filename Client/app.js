function getBathValue() {
  const uiBathrooms = document.getElementsByName("uiBathrooms");
  for (let i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  const uiBHK = document.getElementsByName("uiBHK");
  for (let i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  const sqft = document.getElementById("uiSqft");
  const bhk = getBHKValue();
  const bathrooms = getBathValue();
  const location = document.getElementById("uiLocations");
  const estPrice = document.getElementById("uiEstimatedPrice");

  const url = "http://127.0.0.1:5000/predict_home_price"; // Adjust if using nginx

  $.post(url, {
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bathrooms,
    location: location.value
  }, function(data, status) {
    console.log("Received estimate:", data.estimated_price);
    estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
  });
}

function onPageLoad() {
  console.log("Document loaded");
  const url = "http://127.0.0.1:5000/get_location_names"; // Adjust if using nginx

  $.get(url, function(data, status) {
    console.log("Received location list");
    if (data && data.locations) {
      const uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty();
      $('#uiLocations').append(new Option("Choose a Location", ""));
      for (let i in data.locations) {
        const opt = new Option(data.locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
