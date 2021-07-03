// This div is where your profile information will appear.
const overview = document.querySelector(".overview");
// GitHub username
const username = "JaiBh";
// Selecting the unordered list to display repo list.
const repoList = document.querySelector(".repo-list");
// Selecting the section where all repos appear
const repoDisplay = document.querySelector(".repos")
// Selecting the section where the individual repo data will appear
const individualRepos = document.querySelector(".repo-data")
// Selecting the back-to-repo-gallery button
const backToGalleryButton = document.querySelector(".view-repos")
// Selecting the input element to search for repos
const filterInput = document.querySelector(".filter-repos")

// Fetch information from your GitHub profile
const getProfileInfo = async function() {
	const fetchProfileInfo = await fetch(`https://api.github.com/users/${username}`)
	const profileInfo = await fetchProfileInfo.json();
	displayProfileInfo(profileInfo);
	getRepoInfo();
}

getProfileInfo();

//Display User Information
const displayProfileInfo = function(profileInfo) {
	const displayProfile = document.createElement("div");
	displayProfile.classList.add("user-info");
	displayProfile.innerHTML = 
    `<figure>
      <img alt="user avatar" src=${profileInfo.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${profileInfo.name}</p>
      <p><strong>Bio:</strong> ${profileInfo.bio}</p>
      <p><strong>Location:</strong> ${profileInfo.location}</p>
      <p><strong>Number of public repos:</strong> ${profileInfo.public_repos}</p>
    </div>`
    overview.append(displayProfile)
};

// Fetch Your Repos
const getRepoInfo = async function() {
	const fetchRepoInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
	const repoInfo = await fetchRepoInfo.json();
	displayRepoInfo(repoInfo);
}

//Display Repo Information
const displayRepoInfo = function(repoInfo) {
	for(const repo of repoInfo) {
		const displayRepo = document.createElement("li");
		displayRepo.classList.add("repo");
		displayRepo.innerHTML = `<h3>${repo.name}</h3>`
		repoList.append(displayRepo);
// Display the Input Element
		filterInput.classList.remove("hide");
	}
}
// Displaying individual repo information
repoList.addEventListener("click", function(e) {
	if (e.target.matches("h3")) {
		const repoName = e.target.innerText;
		getIndividualRepoInfo(repoName);
	}
})

// Fetch information about each individual repo 
const getIndividualRepoInfo = async function(repoName) {
	const fetchIndividualRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
	const individualRepoInfo = await fetchIndividualRepoInfo.json();
// Grab languaages
	const fetchLanguages = await fetch(individualRepoInfo.languages_url)
	const languageData = await fetchLanguages.json();
// Creating an Array of Languages
	const langaugesArray = [];
	for (const language in languageData) {
		langaugesArray.push(language)
	}
	displayIndividualRepoInfo(individualRepoInfo, langaugesArray);
};

// A Function to Display Specific Repo Info
const displayIndividualRepoInfo = function(repoInfo, languages) {
	individualRepos.innerHTML = "";
	const displayIndividualRepo = document.createElement("div");
	displayIndividualRepo.innerHTML = `
	<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
	`;
	individualRepos.append(displayIndividualRepo)
	individualRepos.classList.remove("hide");
	repoDisplay.classList.add("hide")
	backToGalleryButton.classList.remove("hide")
}

// Adding a Click Event to the Back Button
backToGalleryButton.addEventListener("click", function() {
	repoDisplay.classList.remove("hide");
	individualRepos.classList.add("hide");
	backToGalleryButton.classList.add("hide");
});

// Add an Input Event to the Search Box
filterInput.addEventListener("input", function(e) {
	const userInput = e.target.value;
	const repos = document.querySelectorAll(".repo")
	const lowerCaseInput = userInput.toLowerCase();
	for(const repo of repos) {
		const repoLowerCase = repo.innerText.toLowerCase();
		if (repoLowerCase.includes(lowerCaseInput)) {
			repo.classList.remove("hide");
		} else {
			repo.classList.add("hide")
		}
	}
});