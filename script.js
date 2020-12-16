// https://stackoverflow.com/questions/39899072/how-to-find-prime-factors-using-a-for-loop-in-javascript
const findPrimeFactors = (num) => {
  const factors = [];
  let divisor = 2;

  while (num >= 2) {
    if (num % divisor == 0) {
      factors.push(divisor);
      num = num / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
};

const findUniquePrimeFactors = (num) => {
  return [...new Set(findPrimeFactors(num))];
};

const numberToSignedString = (num, prefix = "", suffix = "") => {
  return num > 0
    ? `${prefix}+ ${num}${suffix}`
    : num === 0
    ? ""
    : `${prefix}- ${-num}${suffix}`;
};

const xDom = document.getElementById("x");
const yDom = document.getElementById("y");
const zDom = document.getElementById("z");
const fDom = document.getElementById("f");
const resultDom = document.getElementById("result");

const xErrorDom = document.getElementById("x-error");
const yErrorDom = document.getElementById("y-error");
const zErrorDom = document.getElementById("z-error");
const fErrorDom = document.getElementById("f-error");

const generate = () => {
  xErrorDom.innerText = "";
  yErrorDom.innerText = "";
  zErrorDom.innerText = "";
  fErrorDom.innerText = "";
  resultDom.innerText = "Fill x, y, z, f first";

  if (!xDom.value) {
    xErrorDom.innerText = "Input this first";
    return;
  }

  const x = parseInt(xDom.value);

  if (!yDom.value) {
    yErrorDom.innerText = "Input this first";
    return;
  }

  const y = parseInt(yDom.value);

  const xy = x * y;
  const uniquePrimeFactorsOfXY = findUniquePrimeFactors(xy);

  if (!zDom.value) {
    zErrorDom.innerText = "Input this first";
    return;
  }

  const z = parseInt(zDom.value);
  const uniquePrimeFactorsOfZ = findUniquePrimeFactors(z);

  if (
    !uniquePrimeFactorsOfZ.every((val) =>
      uniquePrimeFactorsOfXY.includes(val)
    )
  ) {
    zErrorDom.innerText = `the factor(s) of z should have at least one of these factors: [${uniquePrimeFactorsOfXY.join(
      ", "
    )}]`;
    return;
  }

  if (z > xy) {
    zErrorDom.innerText = `z should be less than ${xy}`;
    return;
  }

  const w = xy / z;

  if (w !== parseInt(w)) {
    zErrorDom.innerText = `z should be able to divide ${xy}`;
    return;
  }

  const e = Math.abs((x + y - w - z) / 2);

  if (!fDom.value) {
    fErrorDom.innerText = "Input this first";
    return;
  }

  const f = parseInt(fDom.value);

  if (f <= e) {
    fErrorDom.innerText = `f should be greater then ${e}`;
    return;
  }

  const g = f ** 2 - e ** 2;
  const h = (x + y + z + w) / 2;

  const abcd = [x, y, z, w].sort((a, b) => a - b);

  const result = `(x${numberToSignedString(
    abcd[0],
    " "
  )})(x${numberToSignedString(abcd[1], " ")})(x${numberToSignedString(
    abcd[2],
    " "
  )})(x${numberToSignedString(abcd[3], " ")})${numberToSignedString(
    -g,
    " ",
    "x^2"
  )} = (x^2${numberToSignedString(
    h - f,
    " ",
    "x"
  )}${numberToSignedString(xy, " ")})(x^2${numberToSignedString(
    h + f,
    " ",
    "x"
  )}${numberToSignedString(xy, " ")})`;

  resultDom.innerText = result;
};

fDom.addEventListener("input", generate);
xDom.addEventListener("input", generate);
yDom.addEventListener("input", generate);
zDom.addEventListener("input", generate);
