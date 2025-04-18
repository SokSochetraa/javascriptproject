const elem = document.getElementById("element");
const code = document.getElementById("code");
const sliders = document.querySelectorAll(".sliders input");
const shadowColorInput = document.getElementById("shadow-color");
const cardColorInput = document.getElementById("card-color");
const shadowOpacityInput = document.getElementById("shadow-color-opacity");
const shadowInsetInput = document.getElementById("shadow-inset");

cardColorInput.value = "#ffffff";
shadowColorInput.value = "#000000";
shadowOpacityInput.value = "1";

[
  ...sliders,
  shadowColorInput,
  cardColorInput,
  shadowOpacityInput,
  shadowInsetInput,
].forEach((input) => input.addEventListener("input", generateShadow));

function generateShadow() {
  const shadowParams = getShadowParams();
  const boxShadow = createBoxShadow(...shadowParams);

  applyShadow(elem, boxShadow);
  applyBackgroundColor(elem, shadowParams[7]);

  updateCode(boxShadow);
}

function getShadowParams() {
  const hShadow = parseInt(document.getElementById("h-shadow").value);
  const vShadow = parseInt(document.getElementById("v-shadow").value);
  const blurRadius = parseInt(document.getElementById("blur-radius").value);
  const spreadRadius = parseInt(document.getElementById("spread-radius").value);
  const shadowColor = shadowColorInput.value;
  const shadowColorOpacity = parseFloat(shadowOpacityInput.value).toFixed(1);
  const shadowInset = shadowInsetInput.checked;
  const cardColor = cardColorInput.value;

  return [
    hShadow,
    vShadow,
    blurRadius,
    spreadRadius,
    shadowColor,
    shadowColorOpacity,
    shadowInset,
    cardColor,
  ];
}

function createBoxShadow(h, v, blur, spread, color, opacity, inset) {
  const rgba = hexToRgba(color, opacity);
  return `${inset ? "inset" : ""} ${h}px ${v}px ${blur}px ${spread}px ${rgba}`;
}

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function applyShadow(element, boxShadow) {
  element.style.boxShadow = boxShadow;
}

function applyBackgroundColor(element, color) {
  element.style.backgroundColor = color;
}

function updateCode(text) {
  code.textContent = `box-shadow: ${text};`;
}

function copyCode() {
  navigator.clipboard.writeText(code.textContent).then(() => {
    alert("Code Copied to Clipboard");
  });
}

window.onload = generateShadow;
