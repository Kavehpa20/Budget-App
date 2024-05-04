const formBudget = document.getElementById('form-budget');
const formExpenses = document.getElementById('form-expenses');
const budgetInput = document.getElementById('budget-input');
const budgetBtn = document.getElementById('budget-btn');
const expenses = document.getElementById('expenses');
const expensesAmount = document.getElementById('expenses-amount');
const expensesBtn = document.getElementById('expenses-btn');
const budgetNumber = document.getElementById('budget-number');
const expensesNumber = document.getElementById('expenses-number');
const balanceNumber = document.getElementById('balance-number');
const finalList = document.getElementById('final-list');

let myArray = [];
let budgetT = 0;
let expensesT = [];
let sumExpenses = 0;
let balanceT = 0;
let editMode = false;
let editId = "";


const renderList = (editMode) => {
  if (editMode) {
    const newObj = myArray.find(f => f.id === editId)
    newObj.expensesTitle = expenses.value;
    newObj.expensesValue = expensesAmount.value;
    editMode = false;
    expensesBtn.innerText = "Add Expenses";
    editId = "";
  }
  else {
    const myObj = {
      expensesTitle: expenses.value,
      expensesValue: expensesAmount.value,
      id: crypto.randomUUID()
    }
    myArray.push(myObj)
  }
}

const budgetRender = () => {
  if (budgetInput) {
    budgetNumber.innerText = `$ ${budgetInput.value}`
  }
}

const expensesRender = (arr) => {
  finalList.innerHTML = "";
  arr.map(item => {
    const ul = document.createElement('ul');
    ul.className = "d-flex justify-content-between align-items-center p-0";
    finalList.appendChild(ul);
    const li1 = document.createElement('li');
    li1.className = "d-flex fw-semibold text-danger";
    li1.innerText = Object.values(item).splice(0, 1);
    ul.appendChild(li1);
    const li2 = document.createElement('li');
    li2.className = "li-s d-flex gap-4 align-items-center text-danger fw-semibold"
    ul.appendChild(li2);
    const par = document.createElement('p');
    par.innerText = Object.values(item).splice(1, 1);
    par.className = "d-flex align-self-start m-0"
    li2.appendChild(par);
    const edit = document.createElement('button');
    edit.className = "btn d-flex align-items-center fs-3 p-0 border-0 text-success";
    edit.innerHTML = `<ion-icon name="create-outline"></ion-icon>`;
    li2.appendChild(edit);
    edit.addEventListener('click', () => editFunc(item))
    const remove = document.createElement('button');
    remove.className = "btn d-flex align-items-center fs-3 fw-bold border-0 p-0 text-danger";
    remove.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
    remove.id = item.id;
    li2.appendChild(remove);
    remove.addEventListener('click', () => removeFunc(item));
  })
  editMode = false;
}

formBudget.addEventListener('submit', (e) => {
  e.preventDefault();
  budgetT = budgetInput.value;
  budgetRender();
  clearForm2();
})

formExpenses.addEventListener('submit', (e) => {
  e.preventDefault();
  renderList(editMode);
  expensesRender(myArray);
  console.log("click")
  sumRender();
  renderExpenses(sumExpenses);
  renderBalance(sumExpenses);
  clearForm();
  console.log("sumExpenses");
})

const sumRender = () => {
  sumExpenses = 0;
  myArray.map(i => sumExpenses += Number(i.expensesValue))
}

const renderExpenses = (sum) => {
  expensesNumber.innerText = `$ ${sum}`;
}

const renderBalance = (sumBal) => {
  balanceNumber.innerText = `$ ${budgetT - sumBal}`;
}

const removeFunc = (obj) => {
  let sumNew = 0;
  myArray = myArray.filter(item => item.id !== obj.id);
  myArray.map(i => sumNew += Number(i.expensesValue))
  renderExpenses(sumNew);
  renderBalance(sumNew);
  expensesRender(myArray);
  console.log(sumNew);
}

const clearForm = () => {
  expenses.value = "";
  expensesAmount.value = "";
}

const clearForm2 = () => {
  budgetInput.value = "";
}

const editFunc = (item) => {
  editMode = true;
  expensesBtn.innerText = "Edit";
  expenses.value = item.expensesTitle;
  expensesAmount.value = item.expensesValue;
  editId = item.id;
}