const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

// show all product in UI 
const showProducts = (products) => {

  // const allProducts = products.map((pd) => pd);

  for (const product of products) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    let id = "${product.id}";
    div.innerHTML = `<div class="single-product m-2">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5 class = "card-title mt-3 fw-bold">${product.title}</h5>
      <hr class = "w-75 mx-auto">
      <p><span class="fw-bold"> Category </span>: ${product.category}</p>
      <h3>Price: $${product.price}</h3>
      <div class="d-flex justify-content-around bg-secondary rounded-pill mb-2">
      <span class = " m-1 text-warning fw-bold p-1 fs-6">Rating: ${product.rating.rate}</span>
      <span class = "m-1 text-white fw-bold p-1 fs-6">Total : ${product.rating.count}</span>
      </div>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="details(${product.id})" id="details-btn" class="btn btn-danger">Details</button>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};


let count = 0;

const addToCart = price => {
  count = count + 1;
  document.getElementById("total-Products").innerText = count;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
};

const details = id => {
  let productUrl = `https://fakestoreapi.com/products/${id}`
  fetch(productUrl)
    .then((response) => response.json())
    .then((data) => detailsProduct(data));
}

const detailsProduct = data => {
  console.log(data);
}


const getInputValue = id => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  let float = converted;
  return float;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

updateTotal();