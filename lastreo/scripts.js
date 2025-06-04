const users = [
  { username: "john", gender: "boy" },
  { username: "jane", gender: "girl" },
  { username: "sam", gender: "random" },
];

function createAvatarUrl(username, gender) {
  const safeUsername = encodeURIComponent(username);
  if (gender === "boy" || gender === "girl") {
    return `https://avatar.iran.liara.run/public/${gender}?username=${safeUsername}`;
  }
  return `https://avatar.iran.liara.run/public?username=${safeUsername}`;
}

function createUsernameAvatar(username) {
  const safeUsername = encodeURIComponent(username);
  return `https://avatar.iran.liara.run/username?username=${safeUsername}`;
}

function renderUsers() {
  const container = document.getElementById("user-cards");
  container.innerHTML = "";

  users.forEach((user, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const avatars = document.createElement("div");
    avatars.className = "avatars";

    const genderImg = document.createElement("img");
    const usernameImg = document.createElement("img");

    const updateAvatars = () => {
      genderImg.src = createAvatarUrl(user.username, user.gender);
      usernameImg.src = createUsernameAvatar(user.username);
    };

    const usernameInput = document.createElement("input");
    usernameInput.value = user.username;
    usernameInput.placeholder = "Username";
    usernameInput.addEventListener("input", (e) => {
      user.username = e.target.value;
      updateAvatars();
    });

    const genderInput = document.createElement("input");
    genderInput.value = user.gender;
    genderInput.placeholder = "Gender (boy, girl, random)";
    genderInput.addEventListener("input", (e) => {
      const val = e.target.value.toLowerCase();
      user.gender = val === "boy" || val === "girl" ? val : "random";
      updateAvatars();
    });

    updateAvatars();

    avatars.appendChild(genderImg);
    avatars.appendChild(usernameImg);

    card.appendChild(avatars);
    card.appendChild(usernameInput);
    card.appendChild(genderInput);

    container.appendChild(card);
  });
}

renderUsers();
