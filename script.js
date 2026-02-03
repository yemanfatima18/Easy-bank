let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

function save() {
    localStorage.setItem("accounts", JSON.stringify(accounts));
    const accountsEl = document.getElementById("accounts");
    if (accountsEl) displayAccounts();
}

function showMsg(text, isError = false) {
    const msg = document.getElementById("msg");
    if (!msg) return;
    msg.textContent = text;
    msg.className = "toast show " + (isError ? "error" : "success");
    msg.style.color = "";

    setTimeout(() => {
        msg.classList.remove("show");
    }, 3000);
}

function createAccount() {
    const accNoInput = document.getElementById("accNo");
    const nameInput = document.getElementById("name");
    const balanceInput = document.getElementById("balance");
    if (!accNoInput || !nameInput || !balanceInput) return;

    const accNo = Number(accNoInput.value);
    const name = nameInput.value.trim();
    const balance = Number(balanceInput.value);
    const isKYC = document.getElementById("kyc")?.checked || false;

    if (!accNo || !name || balance < 0) {
        return showMsg("Invalid input", true);
    }

    if (accounts.find(a => a.accountNo === accNo)) {
        return showMsg("Account already exists", true);
    }

    accounts.push({ accountNo: accNo, holderName: name, balance, isKYCVerified: isKYC });
    save();
    showMsg("Account created successfully");
}

function deposit() {
    const depAcc = document.getElementById("depAcc");
    const depAmt = document.getElementById("depAmt");
    if (!depAcc || !depAmt) return;

    const acc = findAccount(depAcc.value);
    const amt = Number(depAmt.value);

    if (!acc || amt <= 0) return showMsg("Invalid deposit", true);

    acc.balance += amt;
    save();
    showMsg("Deposit successful");
}

function withdraw() {
    const withAcc = document.getElementById("withAcc");
    const withAmt = document.getElementById("withAmt");
    if (!withAcc || !withAmt) return;

    const acc = findAccount(withAcc.value);
    const amt = Number(withAmt.value);

    if (!acc || amt <= 0) return showMsg("Invalid withdrawal", true);
    if (acc.balance < amt) return showMsg("Insufficient balance", true);

    acc.balance -= amt;
    save();
    showMsg("Withdrawal successful");
}

function transfer() {
    const sendAcc = document.getElementById("sendAcc");
    const recvAcc = document.getElementById("recvAcc");
    const transAmt = document.getElementById("transAmt");
    if (!sendAcc || !recvAcc || !transAmt) return;

    const sender = findAccount(sendAcc.value);
    const receiver = findAccount(recvAcc.value);
    const amt = Number(transAmt.value);

    if (!sender || !receiver || amt <= 0)
        return showMsg("Invalid transfer", true);

    if (!sender.isKYCVerified)
        return showMsg("Sender KYC not verified", true);

    if (sender.balance < amt)
        return showMsg("Insufficient balance", true);

    sender.balance -= amt;
    receiver.balance += amt;
    save();
    showMsg("Transfer successful");
}

function findAccount(accNo) {
    return accounts.find(a => a.accountNo === Number(accNo));
}

function deleteAccount(accountNo) {
    if (!confirm("Delete account #" + accountNo + "? This cannot be undone.")) return;

    const idx = accounts.findIndex(a => a.accountNo === Number(accountNo));
    if (idx === -1) return showMsg("Account not found", true);

    accounts.splice(idx, 1);
    save();
    showMsg("Account deleted successfully");
}

function displayAccounts() {
    const div = document.getElementById("accounts");
    if (!div) return;

    div.innerHTML = "";

    accounts.forEach(a => {
        const card = document.createElement("div");
        card.className = "account-card";
        card.innerHTML = `
            <div class="acc-card-top">
                <div class="acc-no">#${a.accountNo}</div>
                <button class="btn-delete" onclick="deleteAccount(${a.accountNo})" title="Delete account">×</button>
            </div>
            <div class="acc-name">${escapeHtml(a.holderName)}</div>
            <div class="acc-balance">₹${a.balance.toLocaleString()}</div>
            <span class="kyc-badge ${a.isKYCVerified ? "verified" : "pending"}">
                ${a.isKYCVerified ? "KYC ✓" : "KYC Pending"}
            </span>
        `;
        div.appendChild(card);
    });
}

function escapeHtml(text) {
    const el = document.createElement("div");
    el.textContent = text;
    return el.innerHTML;
}
