"use strict";

const API_KEY      = "i1EGZAByETwPSo5RtoyskAKnrNmFhi78";
const API_ENDPOINT = "/v1/gifs/search";
const API_BASE     = "https://api.giphy.com";

const $GifsDiv = $('#gifs');
const $FormInput = $('input');

//console.log("Let's get this party started!");

/**
 * get giphy API result for user input and then call appendGif on the gif url
 * if no gifs are found, catch the error and alert
 * @param {*} evt
 */
async function getSearchResult(evt) {
  evt.preventDefault();
  try {
    let userSearch = $FormInput.val();
    let response = await axios.get(
      `${API_BASE}${API_ENDPOINT}`,{params: {api_key: API_KEY, q : userSearch}}
      );
    let urls = response.data.data.map(image => image.images.original.url);
    appendOne(urls);
  }
  catch {
    alert("no gifs found :(");
  }

}
//TODO: function getGifs, returns images from api

/**
 *accepts a url string and appends a new image to the gifs div
 * @param {string} url
 */
function appendOne(urls) {
  let url = urls[Math.floor(Math.random()*(urls.length))];
  $GifsDiv.append($(`<img>`, { src: url }));
}

/**
 * removes all gifs from the page :,(
 */
function removeGifs() {
  $GifsDiv.empty();
}


$('#submit-btn').on("click", getSearchResult);
$('#remove-btn').on("click", removeGifs);