const fileInput = document.getElementById("fileInput");
const imagePreview = document.getElementById("imagePreview");
const image = document.getElementById("image");
const overlay = document.querySelector(".modal-section__overlay");
const deleteBtn = document.getElementById("deleteBtn");
const form = document.getElementById("form");

let modal = document.getElementById("modal");
let btn = document.getElementById("btn-modal-window");
let btnCancel = document.getElementById("btn-cancel");

btn.onclick = function () {
  modal.style.display = "block";
};

btnCancel.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

imagePreview.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
      image.style.display = "block";
      overlay.style.display = "none";
      deleteBtn.style.display = "block";
      imagePreview.style.backgroundImage = "none";
    };
    reader.readAsDataURL(file);
  }
});

deleteBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();

  image.src = "./img/image-preview.png";
  overlay.style.display = "flex";
  deleteBtn.style.display = "none";

  fileInput.value = "";
});

const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function (e) {
  let value = this.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  let formattedValue = "+7 ";
  if (value.length > 1) {
    formattedValue += value.slice(1, 4);
  }
  if (value.length > 4) {
    formattedValue += " " + value.slice(4, 7);
  }
  if (value.length > 7) {
    formattedValue += "-" + value.slice(7, 9);
  }
  if (value.length > 9) {
    formattedValue += "-" + value.slice(9, 11);
  }

  this.value = formattedValue.trim();
});

phoneInput.value = "+7 ";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  form.reset();

  image.src = "./img/image-preview.png";
  overlay.style.display = "flex";
  deleteBtn.style.display = "none";

  fileInput.value = "";

  modal.style.display = "none";

  alert("Форма успешно отправлена!");
});
