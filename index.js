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
     cleanForm();
      if (userName != "") {
       getUser(userName)
        .then(function(userData) {
           printUserDetails(userData);
           searchRepos(urlRepos);
         }, function(error) {
           //console.log(error);
           showError();
       })
     }
 }

/**
 * Searches an user on Github based on user name.
 *
 * @param {string} userName - User name from the input value, to be searched on Github.
 * @param {function} success - Callback when the fetch is successful.
 * @param {function} error - Callback when the fetch fails.
 */

 function getUser(userName) {
   const urlUser = `${GITHUB_USERS}${userName}`;

   const xhr = new XMLHttpRequest();
   return new Promise(function(success, error) {
    xhr.onreadystatechange = function() {
       if (xhr.readyState == 4) {
         if (xhr.status >= 300) {
           error();
         } else {
           const data = JSON.parse(xhr.response)
           success(data);
         }
       }
     }
     xhr.open('get', urlUser, true)
     xhr.send();
   });
 }


/**
 * Prints user's personal info from the users endpoint.
 * @param {object} data - user information.
*/

function printUserDetails(data) {
    const loginName = data.login;
    const fullName = data.name;
    const description = data.bio;
    const avatarUrl = data.avatar_url;

    console.log(typeof data);
    document.querySelector(".login-name").innerText = `@${loginName}`;
    document.querySelector(".full-name").innerText = fullName;
    document.querySelector(".description").innerText = description;
    document.querySelector("img").src = avatarUrl;
    document.querySelector("img").alt = loginName;
}

/**
 * searches user's repositories  from the repositories endpoint.
 * @param {string} urlRepos - user's repositories endpoint url.
*/



function searchRepos(urlRepos) {
  const xhr = new XMLHttpRequest();
  return new Promise(function(success, error) {
   xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status >= 300) {
          error();
        } else {
          const data = JSON.parse(xhr.response)
          printRepos(data);
        }
      }
    }
    xhr.open('get', urlRepos, true)
    xhr.send();
  });
}


/**
 * Prints a list of user's repositories from the repos endpoint - with stars and forks for each repo.
 * @param {object} repos - user information.
*/

function printRepos(repos) {
    const starImg = '<img src="src/star.svg" alt="star">';
    const forkImg = '<img src="src/fork.svg" alt="forks">';
    const tableElement = document.querySelector("table");

    tableElement.innerHTML = ''; // Clean up the table content.
    resultsDiv.style.display = "block";

    for (let i = 0; i < repos.length; i++) {
        //console.log(repos[i]["name"]);
        let repoName = repos[i].name;
        let stars = repos[i].stargazers_count;
        let forks = repos[i].forks_count;

        tableElement.innerHTML +=
        `<tr>
          <th scope="row">
          <a href="${repoUrl}">${repoName}</a>
          </th>
          <td>${starImg} ${stars} ${forkImg} ${forks}</td>
        </tr>`;
    }
}

/**
  * Displays the "user not found" result.
*/

function showError() {
    noResultsDiv.style.display = "block";
}

/**
  *  hides all previous results.
*/

function cleanForm() {
    resultsDiv.style.display = "none";
    noResultsDiv.style.display = "none";
}
