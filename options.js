function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
      state: document.querySelector("#state").checked
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
      document.querySelector("#state").checked = result.state || false;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("state");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions); 
