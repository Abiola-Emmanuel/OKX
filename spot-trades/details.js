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


const ctx = document.getElementById('weeklyPnL');
const ctx2 = document.getElementById("weeklyPnL2").getContext("2d");
const ctx3 = document.getElementById("portfolioChart").getContext("2d");
const ctx4 = document.getElementById("profitLossChart").getContext("2d");


new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['12W', '10W', '8W', '6W', '4W', '2W'],
    datasets: [{
      label: 'Weekly PnL',
      data: [2000, 0, 3000, 25000, 12000, 15000],
      backgroundColor: function (context) {
        const value = context.raw;
        return value < 0 ? '#e74c3c' : '#2ecc71';
      },
      borderRadius: 4,
      borderSkipped: false,
      barThickness: 28
    }]
  },

  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },

    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#666',
          font: { size: 10 }
        }
      },

      y: {
        grid: { color: '#eee' },
        ticks: {
          color: '#aaa',
          callback: function (value) {
            return value.toLocaleString();
          }
        }
      }
    }
  }
});


const gradient = ctx2.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(34,197,94,0.35)");
gradient.addColorStop(1, "rgba(34,197,94,0)");

// Build chart
new Chart(ctx2, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
      data: [0, 1, 1, 6, 6],
      borderColor: "rgb(34,197,94)",
      borderWidth: 3,
      backgroundColor: gradient,
      stepped: true,
      pointRadius: 0,
      fill: true
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(0,0,0,0.05)" } }
    }
  }
});


const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart) {
    const { ctx, width, height } = chart;

    ctx.save();
    ctx.font = "bold 22px Arial";
    ctx.fillStyle = "#111";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("80.00%", width / 2, height / 2 + 10);

    ctx.font = "12px Arial";
    ctx.fillStyle = "#888";
    ctx.fillText("WLFI", width / 2, height / 2 - 15);
    ctx.restore();
  }
};

new Chart(ctx3, {
  type: "doughnut",
  data: {
    labels: ["WLFI", "BNB"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#3b6ef5", "#2bb3c0"],
        borderWidth: 0
      }
    ]
  },
  options: {
    cutout: "72%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  },
  plugins: [centerTextPlugin]
});



const profitData = [{
  x: "1m",
  y: 3450.98
}];

const lossData = [];

new Chart(ctx4, {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Profit",
        data: profitData,
        backgroundColor: "#22c55e",
        pointRadius: 6
      },
      {
        label: "Loss",
        data: lossData,
        backgroundColor: "#f43f5e",
        pointRadius: 6
      }
    ]
  },
  options: {
    plugins: {
      legend: { display: false }, // we use custom legend
      tooltip: { enabled: false }
    },
    scales: {
      x: {
        type: "category",
        labels: ["1m", "24h", "5D", "15D"],
        grid: { display: false },
        ticks: { color: "#999" }
      },
      y: {
        min: 3450.92,
        max: 3451.02,
        grid: {
          color: "rgba(0,0,0,0.05)",
          borderDash: [4, 4]
        },
        ticks: {
          color: "#999"
        }
      }
    }
  }
});


// Tab buttons at the top
const tab1 = document.getElementById("tab1");

// Tab content sections
const content1 = document.getElementById("content1");
const content2 = document.getElementById("content2");

// Inner buttons inside Future Trades
const performanceBtn = document.getElementById("performance");
const historyBtn1 = document.getElementById("history1");
const copyBtn1 = document.getElementById("copy1");

const content3 = document.getElementById("content3"); // History
const content4 = document.getElementById("content4"); // Copy

// Spot buttons
const SpotPerformanceBtn = document.getElementById("SpotPerformance");
const historyBtn2 = document.getElementById("history2");
const copyBtn2 = document.getElementById("copy2");

// --- TOP TAB SWITCHING ---
tab1.addEventListener("click", () => {
  tab1.classList.add("active");

  content1.classList.remove("hidden");
  content2.classList.add("hidden");
  content3.classList.add("hidden");
  content4.classList.add("hidden");
});

// --- INNER TAB SWITCHING (Future Trades) ---
performanceBtn.addEventListener("click", () => {
  content1.classList.remove("hidden");
  content3.classList.add("hidden");
  content4.classList.add("hidden");
});

historyBtn1.addEventListener("click", () => {
  content3.classList.remove("hidden");
  content1.classList.add("hidden");
  content4.classList.add("hidden");
});

copyBtn1.addEventListener("click", () => {
  content4.classList.remove("hidden");
  content1.classList.add("hidden");
  content3.classList.add("hidden");
});
