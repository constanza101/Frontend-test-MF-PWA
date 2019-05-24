/**
  icons for iOS (Web Clip)
  *https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
  */

const GITHUB_USERS = "https://api.github.com/users/";
const resultsDiv = document.querySelector(".results");
const noResultsDiv = document.querySelector(".no-results");
const searchForm = document.getElementById('searchForm');


searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
});

/**
 * Takes the value of the form input = login name of a Github user
 */

const searchButtonElement = document.getElementById('searchButton');
searchButtonElement.addEventListener('click', function(event) {
    search();
});



/**
 * Takes the value of the form input = login name of a Github user
 */


function search() {
    const userName = document.getElementById('searchInput').value;;
    const urlRepos = `${GITHUB_USERS}${userName}/repos`;
    if (userName === "") {
        cleanForm();
    } else if (userName != "") {
      getUserDataWithPromise()
      .then(function(userData) {
        console.log(result);
        printUserDetails(userData);
        searchRepos(urlRepos);
      }, function(error) {
        console.log(error);
        showError();
      })
    }
}


function getUser() {
  const urlUser = `${GITHUB_USERS}${userName}`;

  var xhr = new XMLHttpRequest();
  return new Promise(function(success, error) {
   xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status >= 300) {
          error(`Error : ${xhr.status}`)
        } else {
          success(xhr.responseText);
        }
      }
    }
    xhr.open('get', urlUser, true)
    xhr.send();
  });
}








/**
  *  hides all previous results.
*/

function cleanForm() {
    resultsDiv.style.display = "none";
    noResultsDiv.style.display = "none";
}
