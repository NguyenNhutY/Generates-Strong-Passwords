const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numericCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()_+=";

function getRandomCharacter(characters) {
    return characters[Math.floor(Math.random() * characters.length)];
}

function generatePassword() {
    const len = lenEl.value;
    const selectedTypes = [upperEl, lowerEl, numberEl, symbolEl].filter(el => el.checked);

    if (selectedTypes.length === 0) {
        alert("Please select at least one character type.");
        return;
    }

    let password = "";
    selectedTypes.forEach(type => {
        password += getRandomCharacter(getCharacterSet(type.id));
    });

    for (let i = password.length; i < len; i++) {
        password += getRandomCharacter(getSelectedCharacterTypes());
    }

    pwEl.innerText = password;
}

function getCharacterSet(type) {
    switch (type) {
        case "upper":
            return upperLetters;
        case "lower":
            return lowerLetters;
        case "number":
            return numericCharacters;
        case "symbol":
            return symbolCharacters;
        default:
            return "";
    }
}

function getSelectedCharacterTypes() {
    const selectedTypes = [];
    if (upperEl.checked) selectedTypes.push(upperLetters);
    if (lowerEl.checked) selectedTypes.push(lowerLetters);
    if (numberEl.checked) selectedTypes.push(numericCharacters);
    if (symbolEl.checked) selectedTypes.push(symbolCharacters);

    return selectedTypes.join("");
}

generateEl.addEventListener("click", generatePassword);

copyEl.addEventListener("click", () => {
    const password = pwEl.innerText;

    if (!password) {
        alert("No password to copy.");
        return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
});
