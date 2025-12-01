const menuOverlay = document.getElementById('menuOverlay');

function menuOpen() {
  menuOverlay.classList.add('open')
}
function closeMenu() {
  menuOverlay.classList.remove('open')
}

const buttons = document.querySelectorAll(".trends button");
const rows = document.querySelectorAll(".crypto-row");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    const filter = btn.dataset.filter;

    if (filter === "favorites") {
      rows.forEach(row => row.style.display = "flex");
      resetImages();
      return;
    }

    rows.forEach((row, index) => {
      if (index > 3) {
        row.style.display = "none";
      } else {
        row.style.display = "flex";
      }
    });

    changeImages(filter);
  });
});

const iconMap = {
  top: {
    BTC: "/images/btc.png",
    ETH: "/images/eth.png",
    SOL: "/images/sol.png",
    DOGE: "/images/doge.png",
    XRP: "/images/xrp.png",
    USDT: "/images/usdt.png",
  },

  hot: {
    BTC: "/images/sol.png",
    ETH: "/images/eth.png",
    SOL: "/images/btc.png",
    DOGE: "/images/doge.png",
    XRP: "/images/xrp.png",
    USDT: "/images/usdt.png"
  },

  gainers: {
    BTC: "/images/eth.png",
    ETH: "/images/doge.png",
    SOL: "/images/sol.png",
    DOGE: "/images/btc.png",
    XRP: "/images/xrp.png",
    USDT: "/images/usdt.png"
  },

  new: {
    BTC: "/images/usdt.png",
    ETH: "/images/eth.png",
    SOL: "/images/btc.png",
    DOGE: "/images/doge.png",
    XRP: "/images/xrp.png",
    USDT: "/images/usdt.png"
  }
};

function changeImages(filter) {
  rows.forEach(row => {
    const name = row.querySelector(".name").textContent.replace("/USD", "");
    const img = row.querySelector("img.icon");

    if (iconMap[filter] && iconMap[filter][name]) {
      img.src = iconMap[filter][name];
    }
  });
}

function resetImages() {
  const originalIcons = {
    BTC: "/images/btc.png",
    ETH: "/images/eth.png",
    SOL: "/images/sol.png",
    DOGE: "/images/doge.png",
    XRP: "/images/xrp.png",
    USDT: "/images/usdt.png"
  };

  rows.forEach(row => {
    const name = row.querySelector(".name").textContent.replace("/USD", "");
    const img = row.querySelector("img.icon");

    if (img && originalIcons[name]) {
      img.src = originalIcons[name];
    }
  });
}

if (typeof TradingView !== 'undefined') {
  new TradingView.widget({
    autosize: true,
    symbol: "BINANCE:BTCUSDT",
    interval: "60",
    container_id: "tv_chart_container",
    timezone: "Etc/UTC",
    theme: "dark",
    style: "1",
    locale: "en",
    toolbar_bg: "#222",
    enable_publishing: false,
    allow_symbol_change: true,
    hide_side_toolbar: false
  });
}