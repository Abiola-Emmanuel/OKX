const menuOverlay = document.getElementById('menuOverlay');

function menuOpen() {
  if (menuOverlay) menuOverlay.classList.add('open');
}
function closeMenu() {
  if (menuOverlay) menuOverlay.classList.remove('open');
}

const users = {
  1: { name: "Mine13", following: 0, followers: 948, bio: "Only wish that your clothes are not stained with dust", image: '/images/pf1.jpg' },
  2: { name: "AlphaX", following: 20, followers: 500, bio: "Only wish that your clothes are not stained with dust", image: '/images/pf2.jpg' },
  3: { name: "SolKing", following: 80, followers: 900, bio: "Only wish that your clothes are not stained with dust", image: '/images/pf3.jpg' },
  4: { name: "XrpMaster", following: 50, followers: 1400, bio: "Only wish that your clothes are not stained with dust", image: '/images/pf4.jpg' },
  5: { name: "DogeDude", following: 50, followers: 1500, bio: "Only wish that your clothes are not stained with dust", image: '/images/pf5.jpg' },
  6: { name: "StablePro", following: 250, followers: 1000, bio: "Only wish that your clothes are not stained with dust", image: '/images/pf6.jpg' },
};

const params = new URLSearchParams(window.location.search);
const userId = params.get('id');

let user = users[userId];

if (!user && userId !== null) {
  const n = Number(userId);
  if (!Number.isNaN(n)) {
    if (users[String(n)]) user = users[String(n)];
    if (!user && users[String(n + 1)]) user = users[String(n + 1)];
    if (!user && users[String(n - 1)]) user = users[String(n - 1)];
  }
  if (!user) {
    const m = userId.match(/(\d+)/);
    if (m) {
      const mm = Number(m[1]);
      if (!Number.isNaN(mm) && users[String(mm)]) user = users[String(mm)];
    }
  }
}

if (!user) {
  console.warn(`details.js: no user found for id="${userId}" — defaulting to id 1`);
  user = users['1'];
}

const Uname = user.name || 'Unknown';
const Ufollowing = user.following ?? 0;
const Ufollowers = user.followers ?? 0;
const Ubio = user.bio || '';
const Uimage = user.image || '';

document.querySelectorAll('.username').forEach(el => el.textContent = Uname);
const imgEl = document.getElementById('user-image');
if (imgEl) imgEl.src = Uimage;
const followingEl = document.getElementById('following-num');
if (followingEl) followingEl.textContent = String(Ufollowing);
const followersEl = document.getElementById('followers-num');
if (followersEl) followersEl.textContent = String(Ufollowers);
const bioEl = document.getElementById('bio');
if (bioEl) bioEl.textContent = Ubio;




console.log(Uname);
// console.log(Ufollowing);
// console.log(Ufollowers);
// console.log(Ubio);

