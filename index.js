// Script for to get Github contributors list
const contributors = document.getElementById("contributors");
const repo = "PetMe";
const owner = "akshitagupta15june";
const apiURL = `https://api.github.com/repos/${owner}/${repo}/contributors`;


function displayContributors(contributorsList) {
  contributorsList.forEach((contributor) => {
    // create anchor tag and set relevant attributes
    const link = document.createElement("a");
    link.setAttribute("href", contributor.html_url);
    link.setAttribute("target", "_blank");

    // create image element and set relevant attributes
    const avatar = document.createElement("img");
    avatar.setAttribute("class", "avatar");
    avatar.setAttribute("src", contributor.avatar_url);
    avatar.setAttribute("title", contributor.login);
    avatar.setAttribute("alt", contributor.login);

    link.appendChild(avatar);
    contributors.appendChild(link);
  });
}

function hideBackToTopButton() {
  const bttButton = document.getElementById("bttbutton");

  window.addEventListener("scroll", function() {
    if (window.pageYOffset > 0) {
      bttButton.style.opacity = "1";
      bttButton.style.transform = 'translateY(0px)';
    } else {
      bttButton.style.opacity = "0";
      bttButton.style.transform = 'translateY(500px)';
    }
  });
}

// get contributors list  from github API
async function getContributorsList() {
  try {
    const response = await fetch(apiURL);
    const contributors = await response.json();
    displayContributors(contributors);
  } catch (error) {
    console.log(error);
  }
}

hideBackToTopButton()
getContributorsList();

let translateDropdown = null;

/**
 * Toggles the visibility of the Google Translate dropdown menu when the SVG is clicked.
 */
function toggleTranslateDropdown() {
  const translateElement = document.getElementById('google_translate_element');

  if (!translateDropdown) {
    try {
      translateDropdown = new google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
      translateElement.style.display = 'block'; // Show the translate container
    } catch (error) {
      console.error('Error initializing Google Translate:', error);
      // Fallback mechanism goes here
    }
  } else {
    // If dropdown is open, close it
    translateElement.style.display = 'none'; // Hide the translate container
    translateElement.innerHTML = ''; // Clear its contents
    translateDropdown = null;
  }
}

// Get the SVG element by its ID
const svgElement = document.getElementById('mySvg');

// Add a click event listener to the SVG element
svgElement.addEventListener('click', toggleTranslateDropdown);

