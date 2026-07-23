const units = [
  { id: "mm", factor: 0.001, symbol: "mm", names: { th: "มิลลิเมตร", en: "Millimeter" }, result: { th: "มม.", en: "mm" } },
  { id: "cm", factor: 0.01, symbol: "cm", names: { th: "เซนติเมตร", en: "Centimeter" }, result: { th: "ซม.", en: "cm" } },
  { id: "m", factor: 1, symbol: "m", names: { th: "เมตร", en: "Meter" }, result: { th: "ม.", en: "m" } },
  { id: "km", factor: 1000, symbol: "km", names: { th: "กิโลเมตร", en: "Kilometer" }, result: { th: "กม.", en: "km" } },
  { id: "in", factor: 0.0254, symbol: "in", names: { th: "นิ้ว", en: "Inch" }, result: { th: "นิ้ว", en: "in" } },
  { id: "ft", factor: 0.3048, symbol: "ft", names: { th: "ฟุต", en: "Foot" }, result: { th: "ฟุต", en: "ft" } },
  { id: "yd", factor: 0.9144, symbol: "yd", names: { th: "หลา", en: "Yard" }, result: { th: "หลา", en: "yd" } },
  { id: "mi", factor: 1609.344, symbol: "mi", names: { th: "ไมล์", en: "Mile" }, result: { th: "ไมล์", en: "mi" } }
];

const messages = {
  th: {
    title: "แปลงระยะ",
    amount: "จำนวน",
    from: "จาก",
    to: "เป็น",
    result: "ผล",
    swap: "สลับหน่วย",
    installTitle: "พร้อมใช้ออฟไลน์",
    installDescription: "ติดตั้งบนมือถือหรือคอม แล้วเปิดใช้ได้แม้ไม่มีเน็ต",
    installButton: "ติดตั้ง",
    footer: "คำนวณบนอุปกรณ์ของคุณ ไม่มีการส่งข้อมูลออกจากเครื่อง",
    invalid: "กรุณาใส่ตัวเลข",
    formula: (value, from, to) => `${value} ${from} = ${to}`
  },
  en: {
    title: "Length converter",
    amount: "Value",
    from: "From",
    to: "To",
    result: "Result",
    swap: "Swap units",
    installTitle: "Works offline",
    installDescription: "Install on your phone or computer and use it without internet",
    installButton: "Install",
    footer: "Calculated on your device. No data is sent anywhere.",
    invalid: "Enter a number",
    formula: (value, from, to) => `${value} ${from} = ${to}`
  }
};

const amount = document.querySelector("#amount");
const fromUnit = document.querySelector("#fromUnit");
const toUnit = document.querySelector("#toUnit");
const resultValue = document.querySelector("#resultValue");
const resultUnit = document.querySelector("#resultUnit");
const formulaText = document.querySelector("#formulaText");
const swapButton = document.querySelector("#swapButton");
const langButtons = [...document.querySelectorAll(".lang-button")];

let language = localStorage.getItem("gukgu-language")
  || (navigator.language.toLowerCase().startsWith("th") ? "th" : "en");

function unitLabel(unit) {
  // The full label is intentionally one line: “เซนติเมตร (cm)”.
  return `${unit.names[language]} (${unit.symbol})`;
}

function populateUnitSelects() {
  const currentFrom = fromUnit.value || "in";
  const currentTo = toUnit.value || "cm";

  for (const select of [fromUnit, toUnit]) {
    select.replaceChildren();
    units.forEach(unit => {
      const option = document.createElement("option");
      option.value = unit.id;
      option.textContent = unitLabel(unit);
      select.append(option);
    });
  }

  fromUnit.value = currentFrom;
  toUnit.value = currentTo;
}

function formatNumber(number) {
  if (!Number.isFinite(number)) return "";
  const magnitude = Math.abs(number);

  let maximumFractionDigits = 6;
  if (magnitude >= 1000) maximumFractionDigits = 3;
  if (magnitude >= 1000000) maximumFractionDigits = 2;

  return new Intl.NumberFormat(language === "th" ? "th-TH" : "en-US", {
    maximumFractionDigits,
    useGrouping: true
  }).format(number);
}

function convert() {
  const numericValue = Number(amount.value);
  const from = units.find(unit => unit.id === fromUnit.value);
  const to = units.find(unit => unit.id === toUnit.value);

  if (!Number.isFinite(numericValue)) {
    resultValue.textContent = "—";
    resultUnit.textContent = "";
    formulaText.textContent = messages[language].invalid;
    return;
  }

  const converted = numericValue * from.factor / to.factor;
  resultValue.textContent = formatNumber(converted);
  resultUnit.textContent = to.result[language];
  formulaText.textContent = messages[language].formula(
    formatNumber(numericValue),
    from.symbol,
    `${formatNumber(converted)} ${to.symbol}`
  );
}

function applyLanguage(nextLanguage) {
  language = nextLanguage;
  localStorage.setItem("gukgu-language", language);
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = messages[language][element.dataset.i18n];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach(element => {
    element.setAttribute("aria-label", messages[language][element.dataset.i18nAria]);
  });

  langButtons.forEach(button => {
    const active = button.dataset.lang === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  document.title = language === "th"
    ? "gukgu — แปลงระยะ"
    : "gukgu — Length converter";

  populateUnitSelects();
  convert();
}

amount.addEventListener("input", convert);
fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);

swapButton.addEventListener("click", () => {
  const currentValue = Number(amount.value);
  const from = units.find(unit => unit.id === fromUnit.value);
  const to = units.find(unit => unit.id === toUnit.value);

  if (Number.isFinite(currentValue)) {
    const converted = currentValue * from.factor / to.factor;
    amount.value = Number(converted.toPrecision(12)).toString();
  }

  [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];

  swapButton.classList.remove("is-swapping");
  void swapButton.offsetWidth;
  swapButton.classList.add("is-swapping");

  window.setTimeout(() => swapButton.classList.remove("is-swapping"), 220);
  convert();
});

langButtons.forEach(button => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

applyLanguage(language);
