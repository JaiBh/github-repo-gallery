// This div is where your profile information will appear.
const overview = document.querySelector(".overview");
// GitHub username
const username = "JaiBh";
// Selecting the unordered list to display repo list.
const repoDisplay = document.querySelector(".repo-list")

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
		repoDisplay.append(displayRepo);
	}
}
