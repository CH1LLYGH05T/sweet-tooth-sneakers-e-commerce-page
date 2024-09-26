const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.querySelector(".close-btn");
const menu = document.querySelector(".nav_links");
const overlay = document.querySelector(".overlay");
const mainThumbnail = document.querySelector(".main-thumbnail");
const mainThumbnailLightBox = document.querySelector(".lightbox-container .main-thumbnail");
const images = document.querySelectorAll(".preview img");
const plusBtn = document.querySelector("#plus");
const minusBtn = document.querySelector("#minus");
const amount = document.querySelector(".amount");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const slider = document.querySelector(".mobile-thumb");
const thumbMob = document.querySelector(".thumb-mob");
const cartBtn = document.querySelector(".cart-btn");
const cart = document.querySelector(".cart-wrp");
const closeLightboxBtn = document.querySelector(".close-lightbox");
const lightbox = document.querySelector(".lightbox");
const addBtn = document.querySelector(".add_btn");
const indicator = document.querySelector(".indicator");
const wrp = document.querySelector(".cart-content");
let itemQuantity = 0;
let currentImg = 1;

indicator.style.display = "none";

// Image mapping for thumbnails to full images
const imageMap = {
  "./images/candy-corn-shoe-1-thumbnail.JPG": "./images/candy-corn-shoe-1.JPG",
  "./images/candy-corn-shoe-2-thumbnail.jpg": "./images/candy-corn-shoe-2.jpg",
  "./images/candy-corn-shoe-3-thumbnail.jpg": "./images/candy-corn-shoe-3.jpg",
  "./images/candy-corn-shoe-4-thumbnail.jpg": "./images/candy-corn-shoe-4.jpg"
};

function openMenu() {
  menu.classList.add("active");
  overlay.classList.add("active");
}

function closeMenu() {
  menu.classList.remove("active");
  overlay.classList.remove("active");
}

function handlePlus() {
  itemQuantity++;
  amount.innerText = itemQuantity;
}

function handleMinus() {
  if (itemQuantity > 0) {
    itemQuantity--;
    amount.innerText = itemQuantity;
  }
}

function nextImage() {
  currentImg = (currentImg % 4) + 1; // Loop back to 1 after 4
  updateImage();
}

function prevImage() {
  currentImg = (currentImg - 2 + 4) % 4 + 1; // Loop back to 4 if 1 is current
  updateImage();
}

function updateImage() {
  const newSrc = `./images/image-product-${currentImg}.jpg`;
  console.log(`Loading image: ${newSrc}`); // Debugging log
  thumbMob.src = newSrc;

  // Check if the image is loaded
  const img = new Image();
  img.src = newSrc;
  img.onload = () => {
    console.log(`Image loaded successfully: ${newSrc}`);
    thumbMob.src = newSrc; // Set the src only if the image loads
  };
  img.onerror = () => {
    console.error(`Failed to load image: ${newSrc}`);
  };
}


function toggleCart() {
  cart.classList.toggle("invisible");
}

function closeLightBox() {
  lightbox.classList.add("invisible");
}

function openLightBox() {
  lightbox.classList.remove("invisible");
}

function addItem() {
  if (itemQuantity > 0) {
    const total = (125.00 * itemQuantity).toFixed(2);
    wrp.classList.remove("empty");
    wrp.innerHTML = `
      <div class="product">
        <div>
          <img src="./images/candy-corn-shoe-1.JPG" class="product-img" alt="product">
          <div class="product-info">
            <p class="product-title">Fall Limited Edition Sneakers</p>
            <p><span>$125.00</span> × <span class="number">${itemQuantity}</span> <b>$${total}</b></p>
          </div>
          <button class="delete-btn" onclick="deleteItem()">
            <img src="./images/icon-delete.svg" alt="delete">
          </button>
        </div>
        <button class="checkout-btn">Checkout</button>
      </div>`;
    indicator.style.display = "block";
    indicator.innerText = itemQuantity;
  }
}

function deleteItem() {
  wrp.classList.add("empty");
  wrp.innerHTML = `<p>Your cart is empty</p>`;
  indicator.style.display = "none";
}

images.forEach((image) => {
  image.addEventListener("click", () => {
    const lastImg = document.querySelectorAll(".selected");
    if (lastImg) {
      lastImg[0].classList.remove("selected");
    }
    image.classList.add("selected");
    const selectedImgSrc = selectedImg.getAttribute("src");
    if (imageMap[selectedImgSrc]) {
      mainThumbnail.src = imageMap[selectedImgSrc];
      mainThumbnailLightBox.src = imageMap[selectedImgSrc];
    }
  });
});

menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
plusBtn.addEventListener("click", handlePlus);
minusBtn.addEventListener("click", handleMinus);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);
cartBtn.addEventListener("click", toggleCart);
closeLightboxBtn.addEventListener("click", closeLightBox);
mainThumbnail.addEventListener("click", openLightBox);
addBtn.addEventListener("click", addItem);
