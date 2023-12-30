'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account5 = {
  owner: 'Shreyas Damgude',
  movements: [-300, -3000, 4000, 100, 200, 1000],
  interestRate: 1.8,
  pin: 1001,

  movementsDates: [
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account6 = {
  owner: 'Sreeja Ronanki',
  movements: [1000, 800, 12, -200, 200],
  interestRate: 2.5,
  pin: 1812,

  movementsDates: [
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5, account6];

// // Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Display Transactions
function displayMovements(acc, sort = false) {
  containerMovements.innerHTML = '';
  let movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  movs.forEach(function (mov, i) {
    let act = mov > 0 ? 'deposit' : 'withdrawal';
    let formattedMovement = formatCurrency(mov, acc.locale, acc.currency);
    acc.movementsDates.push(new Date());
    let date = new Date(acc.movementsDates[i]);
    let displayDate = formatMovementsDates(date, acc.locale);
    let html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${act}">${i + 1} ${act}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMovement}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

//Creating username
accounts.forEach(function (acc) {
  acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(ini => ini[0])
    .join('');
});

//Calculate Balance
function calcBalance(acc) {
  return acc.movements.reduce((acc, amt) => acc + amt, 0);
}

//Calculate Total Deposits
function calcIn(acc) {
  return acc.movements
    .filter(amt => amt > 0)
    .reduce((acc, amt) => acc + amt, 0);
}

//Calculate Total Withdrawals
function calcOut(acc) {
  return acc.movements
    .filter(amt => amt < 0)
    .reduce((acc, amt) => acc + Math.abs(amt), 0);
}

//Calculate Interest
function calcInterest(movements, interestRate) {
  return movements
    .filter(amt => amt > 0)
    .map(amt => (amt * interestRate) / 100)
    .filter(amt => amt >= 1)
    .reduce((acc, amt) => acc + amt);
}

let currentUser, timer, userReceive, closeAccount;

//Update UI
function updateUI(acc) {
  displayMovements(acc);
  labelBalance.textContent = formatCurrency(
    calcBalance(acc).toFixed(2),
    acc.locale,
    acc.currency
  );
  labelSumIn.textContent = formatCurrency(
    calcIn(acc).toFixed(2),
    acc.locale,
    acc.currency
  );
  labelSumOut.textContent = formatCurrency(
    calcOut(acc).toFixed(2),
    acc.locale,
    acc.currency
  );
}

//Implementing dates
function formatMovementsDates(date, locale) {
  let calcDayPassed = (date1, date2) =>
    Math.trunc(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  let daysPassed = calcDayPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return Intl.DateTimeFormat(locale).format(date);
  }
}

//Formatting Numbers
function formatCurrency(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

//Logout Timer
function logoutTimer() {
  function tick() {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  }

  let time = 300;
  tick();
  let timer = setInterval(tick, 1000);
  return timer;
}

//Login button
btnLogin.addEventListener('click', function (e) {
  //Avoiding reload
  e.preventDefault();

  currentUser = accounts.find(
    acc => acc.username === inputLoginUsername.value.trim()
  );

  if (currentUser?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome back, ${
      currentUser.owner.split(' ')[0]
    }`;

    //Updating UI
    updateUI(currentUser);
    labelSumInterest.textContent = formatCurrency(
      calcInterest(currentUser.movements, currentUser.interestRate).toFixed(2),
      currentUser.locale,
      currentUser.currency
    );

    //Displaying Date
    let now = new Date();
    let opt = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    let locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(locale, opt).format(now);

    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    //Resetting timer
    if (timer) clearInterval(timer);
    timer = logoutTimer();
  } else {
    window.alert('No such user exists');
  }
});

//Transfer button
btnTransfer.addEventListener('click', function (e) {
  //Avoiding Reload
  e.preventDefault();

  userReceive = accounts.find(acc => acc.username === inputTransferTo.value);
  let transferAmount = +inputTransferAmount.value;
  if (
    transferAmount > 0 &&
    transferAmount <= calcBalance(currentUser) &&
    userReceive?.username !== currentUser.username
  ) {
    currentUser.movements.push(-transferAmount);
    userReceive.movements.push(transferAmount);

    //Updating UI
    updateUI(currentUser);
    labelSumInterest.textContent = formatCurrency(
      calcInterest(userReceive.movements, userReceive.interestRate).toFixed(2),
      userReceive.locale,
      userReceive.currency
    );

    currentUser.movementsDates.push(new Date().toISOString());
    userReceive.movementsDates.push(new Date().toISOString());
  }
  inputTransferTo.value = inputTransferAmount.value = '';

  //Resetting timer
  clearInterval(timer);
  timer = logoutTimer();
});

//Close button
btnClose.addEventListener('click', function (e) {
  //Avoiding Reload
  e.preventDefault();

  if (
    inputCloseUsername.value === currentUser.username &&
    +inputClosePin.value === currentUser.pin
  ) {
    let index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    accounts.splice(index, 1);

    //Updating UI
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
    labelWelcome.textContent = 'Log in to get started';
  } else {
    window.alert('Incorrect credentials');
  }
});

//Loan button
btnLoan.addEventListener('click', function (e) {
  //Avoiding Reload
  e.preventDefault();

  let loan = +inputLoanAmount.value;
  if (
    currentUser.movements.filter(mov => mov > 0).some(dep => dep > loan * 0.1)
  ) {
    setTimeout(function () {
      currentUser.movements.push(loan);
      currentUser.movementsDates.push(new Date().toISOString());

      //Updating UI
      updateUI(currentUser);
      labelSumInterest.textContent = calcInterest(
        currentUser.movements,
        currentUser.interestRate
      ).toFixed(2);

      //Resetting timer
      clearInterval(timer);
      timer = logoutTimer();
    }, 2500);
  } else {
    window.alert('You are not eligible for loan');
  }
  inputLoanAmount.value = '';
});

//Sort button
let sorted = false;
btnSort.addEventListener('click', function (e) {
  //Avoiding Reload
  e.preventDefault();
  displayMovements(currentUser, !sorted);
  sorted = !sorted;
});
