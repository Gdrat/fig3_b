


let leftInput = document.querySelector(".sol-input");
let base;
let symbols;
let val;
let baseValue;
let symbolsValue;


//funksiya yaradag

//Adi function yox async funksiya olmalidir ki api dan melumati ceke bilek
async function getInf(b = "RUB", s = "USD", val = 1) {
  base = b;
  symbols = s;
//   val = leftInput.value; 
  let url = `https://api.exchangerate.host/latest?base=${b}&symbols=${s}&places=5&amount=${val}`;
  //.asyncinin icinde await olur.
  let res = await fetch(url);
  let data = await res.json();
  console.log(val);
  console.log(data);
  console.log(data.rates[symbols]);
  //print eleyek
  printVal(data.rates[symbols], val);
  printText(b, s, 1);
}
//soldaki inputu secirik 
leftInput.addEventListener("input", function (e) {
  val = parseFloat(leftInput.value); //
  console.log(val);
  getInf(baseValue, symbolsValue, val);
});
//ekrana cixartmaq
function printVal(p, val) {
  //Soldaki deyeri soldakina gosterir
  console.log(val);
  console.log(p);
  if (val == 0) {
    p = 0;
  } else if (val == " ") {
    p = " ";
  }
  document.querySelector(".sol-input").value = val;
  document.querySelector(".sag-input").value = p;
}
//Kursu bize cap etmek
async function printText(b = "RUB", s = "USD", val) {
  let url = `https://api.exchangerate.host/latest?base=${b}&symbols=${s}&places=2&amount=${val}`;
  let res = await fetch(url);
  let data = await res.json();
  document.querySelector(".kurs-sol").innerHTML = `1 ${base}=${
    Math.round((data.rates[symbols]) * 10000) / 10000
  } ${symbols}`;
  document.querySelector(".kurs-sag").innerHTML = `1 ${symbols}=${
    Math.round((1 / data.rates[symbols]) * 10000) / 10000
  } ${base}`;
}
// Soldaki Pullari secib isletmek
const baseRadioButtons = document.querySelectorAll("input[name=options]");
for (const baseRadioButton of baseRadioButtons) {
  baseRadioButton.addEventListener("change", function () {
    baseValue = this.value;
    getInf(baseValue, symbols, val);
  });
}
// Sagdaki pullari secib isletmek
const SymbolradioButtons = document.querySelectorAll('input[name="options2"]');
for (const symbolsRadioButton of SymbolradioButtons) {
  symbolsRadioButton.addEventListener("change", function () {
    console.log(this.value);
    symbolsValue = this.value;
    getInf(base, symbolsValue, val);
  });
}
getInf("RUB", "USD", 1);
