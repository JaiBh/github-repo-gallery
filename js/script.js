// This div is where your profile information will appear.
const overview = document.querySelector(".overview");
// GitHub username
const username = "JaiBh";

// Async function to fetch information from your GitHub profile
const getProfileInfo = async function() {
	const profileInfo = await fetch(`https://api.github.com/users/${username}`)
	const info = await profileInfo.json();
	displayProfileInfo(info);
}

getProfileInfo();

// Fetch & Display User Information
const displayProfileInfo = function(info) {
	const displayInfo = document.createElement("div");
	displayInfo.classList.add("user-info");
	displayInfo.innerHTML = 
    `<figure>
      <img alt="user avatar" src=${info.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${info.name}</p>
      <p><strong>Bio:</strong> ${info.bio}</p>
      <p><strong>Location:</strong> ${info.location}</p>
      <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
    </div>`
    overview.append(displayInfo)
}
