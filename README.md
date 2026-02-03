# EasyBank

A mini banking app built with plain HTML, CSS, and JavaScript. No frameworks, no build step just open the file and go. You can create accounts, deposit and withdraw cash, transfer between accounts, and delete accounts when you're done. Everything runs in your browser and data lives in localStorage, so it persists across sessions.

## What you can do

Create new accounts with an account number, holder name, and starting balance. There's a KYC checkbox too—handy for transfers, since only KYC-verified accounts can send money to others. Prevents random transfers from unverified accounts.

Deposits and withdrawals work the way you'd expect. Enter the account number, punch in the amount, hit the button. Withdrawals will stop you if the balance is too low. Transfers need both sender and receiver account numbers plus the amount, and again the sender has to be KYC verified.

The home page shows a quick overview of your accounts. Head over to the Accounts page for the full list. Each account card displays the number, holder name, balance, and KYC status. There's a delete button on each card if you want to remove one.

## Getting started

Double-click `index.html` or drag it into your browser. No server, no npm install, no config. It's a static site. Works fine in Chrome, Firefox, Edge, Safari—any modern browser.

## How it's put together

Each feature has its own page: create, deposit, withdraw, transfer, and the accounts list. Navigation sits at the top so you can hop between them. `script.js` holds all the logic—create, deposit, withdraw, transfer, delete, and the account display. `style.css` handles the dark theme, cards, buttons, and layout. The app reads and writes to localStorage under the key `accounts`, so your data stays put as long as you're on the same browser and device.

## Files

- `index.html`  Home with feature cards and a quick account preview
- `create.html`  New account form
- `deposit.html`  Deposit form
- `withdraw.html`  Withdraw form
- `transfer.html`  Transfer form
- `accounts.html`  Full account list
- `script.js`  Shared logic
- `style.css`  Styles

## A note on data

Everything is stored locally in your browser. No cloud, no database. That means your accounts are private and offline-friendly, but they're also tied to this browser on this machine. Clear site data or switch browsers and the accounts go away. Good for demos, practice, or personal use—not for anything that needs to stick around long-term or sync across devices.

