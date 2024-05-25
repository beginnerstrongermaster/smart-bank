document.addEventListener("userRegionFetched", function () {
  //get regions and set them into options, value is the alpha-2-code
  for (region in regions) {
    // If the region we are iterating is the user's region, we set it be selected
    if (region === user_region) {
      document.getElementById("select-regions").innerHTML += `
        <option value=${region} selected>${regions[region]}</option>
        `;
    }

    //Else we set region only as an option
    else {
      document.getElementById("select-regions").innerHTML += `
        <option value=${region}>${regions[region]}</option>
        `;
    }
  }
});
