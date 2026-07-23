(function () {
  "use strict";

  var units = {
    mm: { name: "มิลลิเมตร", short: "มม.", symbol: "mm", meters: 0.001 },
    cm: { name: "เซนติเมตร", short: "ซม.", symbol: "cm", meters: 0.01 },
    m:  { name: "เมตร", short: "เมตร", symbol: "m", meters: 1 },
    km: { name: "กิโลเมตร", short: "กม.", symbol: "km", meters: 1000 },
    in: { name: "นิ้ว", short: "นิ้ว", symbol: "in", meters: 0.0254 },
    ft: { name: "ฟุต", short: "ฟุต", symbol: "ft", meters: 0.3048 },
    yd: { name: "หลา", short: "หลา", symbol: "yd", meters: 0.9144 },
    mi: { name: "ไมล์", short: "ไมล์", symbol: "mi", meters: 1609.344 }
  };

  var valueInput = document.getElementById("valueInput");
  var fromUnit = document.getElementById("fromUnit");
  var toUnit = document.getElementById("toUnit");
  var resultNumber = document.getElementById("resultNumber");
  var resultUnit = document.getElementById("resultUnit");
  var equation = document.getElementById("equation");
  var allValues = document.getElementById("allValues");
  var status = document.getElementById("status");
  var installButton = document.getElementById("installButton");
  var installHelp = document.getElementById("installHelp");
  var deferredInstallPrompt = null;

  function addOptions() {
    Object.keys(units).forEach(function (key) {
      var unit = units[key];
      fromUnit.add(new Option(unit.name + " (" + unit.symbol + ")", key));
      toUnit.add(new Option(unit.name + " (" + unit.symbol + ")", key));
    });
    fromUnit.value = "in";
    toUnit.value = "cm";
  }

  function formatNumber(number) {
    if (!isFinite(number)) return "—";

    var absolute = Math.abs(number);

    if ((absolute !== 0 && absolute < 0.000001) || absolute >= 1000000000000) {
      return number.toExponential(6);
    }

    try {
      return new Intl.NumberFormat("th-TH", {
        maximumFractionDigits: 10
      }).format(number);
    } catch (error) {
      return String(Math.round(number * 10000000000) / 10000000000);
    }
  }

  function convert(value, from, to) {
    return (value * units[from].meters) / units[to].meters;
  }

  function showError(message) {
    resultNumber.textContent = "—";
    resultUnit.textContent = "";
    equation.textContent = message;
    allValues.innerHTML = "";
  }

  function renderAll(value, from) {
    var fragment = document.createDocumentFragment();

    Object.keys(units).forEach(function (key) {
      var unit = units[key];
      var row = document.createElement("div");
      var label = document.createElement("span");
      var converted = document.createElement("strong");

      row.className = "value-row";
      label.textContent = unit.name;
      converted.textContent = formatNumber(convert(value, from, key)) + " " + unit.symbol;

      row.appendChild(label);
      row.appendChild(converted);
      fragment.appendChild(row);
    });

    allValues.innerHTML = "";
    allValues.appendChild(fragment);
  }

  function saveState(raw, from, to) {
    try {
      localStorage.setItem("gukgu-length-v1", JSON.stringify({
        value: raw,
        from: from,
        to: to
      }));
    } catch (error) {
      /* Storage failure must never stop conversion. */
    }
  }

  function restoreState() {
    try {
      var saved = JSON.parse(localStorage.getItem("gukgu-length-v1"));
      if (!saved || !units[saved.from] || !units[saved.to]) return;

      valueInput.value = typeof saved.value === "string" ? saved.value : "1";
      fromUnit.value = saved.from;
      toUnit.value = saved.to;
    } catch (error) {
      /* Damaged saved data is ignored. */
    }
  }

  function update() {
    var raw = String(valueInput.value).trim();
    var value = Number(raw);
    var from = fromUnit.value;
    var to = toUnit.value;

    if (!units[from] || !units[to]) {
      fromUnit.value = "in";
      toUnit.value = "cm";
      showError("หน่วยไม่ถูกต้อง กรุณาเลือกใหม่");
      return;
    }

    if (raw === "") {
      showError("ใส่ตัวเลข");
      return;
    }

    if (!isFinite(value)) {
      showError("ตัวเลขไม่ถูกต้อง");
      return;
    }

    var result = convert(value, from, to);

    resultNumber.textContent = formatNumber(result);
    resultUnit.textContent = units[to].short;
    equation.textContent =
      "1 " + units[from].name + " = " +
      formatNumber(convert(1, from, to)) + " " + units[to].name;

    renderAll(value, from);
    saveState(raw, from, to);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (error) {
        reject(error);
      }

      document.body.removeChild(textarea);
    });
  }

  document.getElementById("swapButton").addEventListener("click", function () {
    var oldFrom = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = oldFrom;
    update();
  });

  document.getElementById("copyButton").addEventListener("click", function () {
    if (resultNumber.textContent === "—") return;

    var text =
      valueInput.value + " " + units[fromUnit.value].name +
      " = " + resultNumber.textContent + " " + units[toUnit.value].name;

    copyText(text).then(function () {
      status.textContent = "คัดลอกแล้ว";
    }).catch(function () {
      status.textContent = "คัดลอกไม่สำเร็จ";
    });

    window.setTimeout(function () {
      status.textContent = "";
    }, 1800);
  });

  document.getElementById("clearButton").addEventListener("click", function () {
    valueInput.value = "";
    update();
    valueInput.focus();
  });

  valueInput.addEventListener("input", update);
  fromUnit.addEventListener("change", update);
  toUnit.addEventListener("change", update);

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredInstallPrompt = event;
  });

  installButton.addEventListener("click", function () {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.finally(function () {
        deferredInstallPrompt = null;
      });
      return;
    }

    installHelp.hidden = !installHelp.hidden;
  });

  window.addEventListener("appinstalled", function () {
    installButton.textContent = "ติดตั้งแล้ว";
    installButton.disabled = true;
    installHelp.hidden = true;
  });

  addOptions();
  restoreState();
  update();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("service-worker.js").catch(function () {
        /* Offline installation failure must not affect the converter. */
      });
    });
  }
}());
