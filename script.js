
const generateElement = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const generateArray = () => {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(generateElement());
  }
  return arr;
};

const generateContainer = () => {
  return document.createElement('div');
};

const fillArrContainer = (el, arr) => {
  el.innerHTML = "";
  arr.forEach(num => {
    const span = document.createElement('span');
    span.textContent = num;
    el.appendChild(span);
  });
};

const isOrdered = (a, b) => a <= b;

const swapElements = (arr, index) => {
  if (!isOrdered(arr[index], arr[index + 1])) {
    const temp = arr[index];
    arr[index] = arr[index + 1];
    arr[index + 1] = temp;
  }
};

const highlightCurrentEls = (el, index) => {
  const children = el.children;
  if (children[index] && children[index + 1]) {
    children[index].style.border = "2px dashed red";
    children[index + 1].style.border = "2px dashed red";
  }
};

const generateBtn = document.getElementById('generate-btn');
const sortBtn = document.getElementById('sort-btn');
const startingArrayContainer = document.getElementById('starting-array');
const arrayContainer = document.getElementById('array-container');

generateBtn.addEventListener("click", () => {
  // 17-shart: #starting-array dan boshqa hamma narsani tozalash
  const extraDivs = arrayContainer.querySelectorAll('div:not(#starting-array)');
  extraDivs.forEach(div => div.remove());
  
  // starting-array borderlarini tozalash
  startingArrayContainer.innerHTML = "";
  
  const arr = generateArray();
  fillArrContainer(startingArrayContainer, arr);
});

sortBtn.addEventListener("click", () => {
  const spans = startingArrayContainer.querySelectorAll('span');
  if (spans.length === 0) return;

  let currentArr = Array.from(spans).map(span => parseInt(span.textContent));
  
  // 21-shart: Boshlang'ich arrayning birinchi 2 ta elementini belgilash
  highlightCurrentEls(startingArrayContainer, 0);

  let len = currentArr.length;
  let swapped;

  // 18-shart uchun optimallashgan Bubble Sort
  for (let i = 0; i < len; i++) {
    swapped = false;
    for (let j = 0; j < len - 1; j++) {
      // Har bir taqqoslash uchun yangi qadam (div) yaratish
      // FAQAT birinchi qadamni (i=0, j=0) tashlab o'tamiz, chunki u #starting-array'ning o'zi
      if (!(i === 0 && j === 0)) {
        const stepDiv = generateContainer();
        fillArrContainer(stepDiv, [...currentArr]);
        highlightCurrentEls(stepDiv, j);
        arrayContainer.appendChild(stepDiv);
      }

      // Solishtirish va o'rin almashtirish
      if (!isOrdered(currentArr[j], currentArr[j + 1])) {
        swapElements(currentArr, j);
        swapped = true;
      }
    }
    // Agar biror siklda almashish bo'lmasa, demak saralangan
    if (!swapped) break;
  }

  // Yakuniy saralangan holat divini qo'shish
  const finalDiv = generateContainer();
  fillArrContainer(finalDiv, currentArr);
  arrayContainer.appendChild(finalDiv);
});