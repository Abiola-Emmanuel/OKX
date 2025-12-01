const menuOverlay = document.getElementById('menuOverlay');

function menuOpen() {
  menuOverlay.classList.add('open')
}
function closeMenu() {
  menuOverlay.classList.remove('open')
}

const data = {
  overview: [
    {
      img: "/images/btc.png",
      name: "Mine13",
      long: "+1.40x",
      pnl: "+95.62%",
      amount: "+$96,721.15",
      nums: ["96 / 301", "$167,388.82", "46"]
    },
    {
      img: "/images/eth.png",
      name: "AlphaX",
      long: "+2.10x",
      pnl: "+82.10%",
      amount: "+$45,882.11",
      nums: ["120 / 420", "$210,000.22", "51"]
    },
    {
      img: "/images/sol.png",
      name: "SolKing",
      long: "+1.90x",
      pnl: "+72.44%",
      amount: "+$33,551.18",
      nums: ["88 / 300", "$98,500.12", "39"]
    }
  ],
  pnl_percent: [
    {
      img: "/images/xrp.png",
      name: "XrpMaster",
      long: "+3.10x",
      pnl: "+130.12%",
      amount: "+$120,882.55",
      nums: ["100 / 350", "$199,100.00", "57"]
    },
    {
      img: "/images/doge.png",
      name: "DogeDude",
      long: "+1.20x",
      pnl: "+55.20%",
      amount: "+$22,221.12",
      nums: ["68 / 265", "$66,720.00", "30"]
    }
  ],
  pnl: [
    {
      img: "/images/usdt.png",
      name: "StablePro",
      long: "+0.10x",
      pnl: "+10.21%",
      amount: "+$8,212.12",
      nums: ["23 / 102", "$32,119.20", "9"]
    }
  ]
};

function changeImages(filter) {
  const container = document.getElementById("image-grid");
  container.innerHTML = ""; // clear previous images

  const images = imageSets[filter];

  // Loop in chunks of 4 to make rows
  for (let i = 0; i < images.length; i += 4) {
    const row = document.createElement("div");
    row.classList.add("row");

    images.slice(i, i + 4).forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      row.appendChild(img);
    });

    container.appendChild(row);
  }
}

// --- Interactive filter buttons for .main2 section ---
(function wireMain2Buttons() {
  const buttonsContainer = document.querySelector('.main2 .buttons');
  if (!buttonsContainer) return;

  const buttons = Array.from(buttonsContainer.querySelectorAll('button'));
  const rows = Array.from(document.querySelectorAll('.main2 .ch-row'));

  // map button label -> dataset key in `data` object
  const mapping = {
    'Overview': 'overview',
    'PnL%': 'pnl_percent',
    'PnL': 'pnl',
    // fallback maps - reuse overview for the rest
    'Win rate': 'overview',
    'AUM': 'overview',
    'No. of copy traders': 'overview',
    'Copy trader PnL': 'overview'
  };

  function applyDataset(key) {
    const dataset = data[key] || data.overview;
    // for each ch-row, update image, name, long, pnl, amount and nums
    rows.forEach((rowEl, idx) => {
      const item = dataset[idx % dataset.length];
      if (!item) return;

      const img = rowEl.querySelector('.top-left img');
      const nameEl = rowEl.querySelector('.top-text .name');
      const longEl = rowEl.querySelector('.top-text .long');
      const pnlEl = rowEl.querySelector('.green');
      const amountEl = rowEl.querySelector('.amount');
      const numsEls = rowEl.querySelectorAll('.nums p');

      if (img) img.src = item.img || img.src;
      if (nameEl) nameEl.textContent = item.name || nameEl.textContent;
      if (longEl) longEl.textContent = item.long || longEl.textContent;
      if (pnlEl) pnlEl.textContent = item.pnl || pnlEl.textContent;
      if (amountEl) amountEl.textContent = item.amount || amountEl.textContent;

      // update the three nums if provided
      if (item.nums && numsEls.length) {
        numsEls.forEach((pEl, i) => {
          if (i < item.nums.length) {
            // if the first p contains a span for the second part, preserve markup
            if (i === 0 && pEl.querySelector('span')) {
              const parts = String(item.nums[i]).split('/');
              pEl.innerHTML = parts.length > 1 ? `${parts[0].trim()} / <span>${parts[1].trim()}</span>` : item.nums[i];
            } else {
              pEl.textContent = item.nums[i];
            }
          }
        });
      }
    });
  }

  function setActiveButton(clicked) {
    buttons.forEach(b => b.classList.toggle('active', b === clicked));
  }

  // wire events
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      const key = mapping[label] || mapping[btn.dataset.key] || 'overview';
      setActiveButton(btn);
      applyDataset(key);
    });
  });

  // set default: first button active
  if (buttons.length) {
    setActiveButton(buttons[0]);
    const defaultKey = mapping[buttons[0].textContent.trim()] || 'overview';
    applyDataset(defaultKey);
  }

})();

function createSparkline(id, data, color) {
  new Chart(document.getElementById(id), {
    type: "line",
    data: {
      labels: data.map(() => ""), // no labels shown
      datasets: [{
        data: data,
        borderColor: color,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        fill: false,
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      },
      responsive: false,
      maintainAspectRatio: false,
    }
  });
}

createSparkline("chart-btc", [2, 4, 3, 5, 4, 6], "#22c55e");
createSparkline("chart-eth", [5, 4, 4, 3, 3, 2], "#ef4444");
createSparkline("chart-xrp", [1, 2, 5, 2, 6, 5], "#22c55e");
