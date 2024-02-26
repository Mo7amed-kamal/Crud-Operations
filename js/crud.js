/* ----------------------- Crud System ----------------------- */

var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescraptionInput = document.getElementById("productDescraptionInput");

var searchInput = document.getElementById("searchInput")

var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("UpdateBtn")

var indexlist = 0;

var productList = [];

if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));

  displayData();  // اول ماافتح اعرض علي طول
}

// --------Add Data----------
function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescraptionInput.value,
  };

  productList.push(product); // Add end

  localStorage.setItem("products", JSON.stringify(productList));

  displayData();

  // clearForm();

  console.log(productList);
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescraptionInput.value = "";
}

function displayData() {
  var box = "";
  for (var i = 0; i < productList.length; i++) {
    box += `<tr>
        <td>${i}</td>
        <td scope="row">  ${productList[i].name}  </td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td><button class=" btn btn-outline-warning" onclick="updateProduct(${i})" ><i class="fa-regular fa-pen-to-square"></i></button></td>
        <td><button class=" btn btn-outline-danger" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></i></button></td>
    </tr>`;
  }

  document.getElementById("tableBody").innerHTML = box;
}


// Delete Function
function deleteProduct(index) {
    productList.splice(index, 1)

    localStorage.setItem("products", JSON.stringify(productList));
    displayData()
}

// Search function
function searchProduct() {
    var check = searchInput.value // value onInput 

    var box = "";
  for (var i = 0; i < productList.length; i++) {

      if(productList[i].name.toLowerCase().includes( check.toLowerCase()  )){ /// search filter

      box += `<tr>
      <td>${i}</td>
      <td scope="row">  ${productList[i].name}  </td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].desc}</td>
      <td><button class=" btn btn-outline-warning" onclick="updateProduct(${i})" ><i class="fa-regular fa-pen-to-square"></i></button></td>
      <td><button class=" btn btn-outline-danger" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></i></button></td>
  </tr>`;
  }

        document.getElementById("tableBody").innerHTML = box;
    }
    
    
}

// Update Product
function updateProduct(index) {
  indexlist = index;
    
    var current = productList[index]
   
    productNameInput.value = current.name;
    productPriceInput.value = current.price;
    productCategoryInput.value = current.category;
    productDescraptionInput.value = current.desc;

  addBtn.classList.add("d-none")
  updateBtn.classList.remove("d-none")
}

function setData() {

  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescraptionInput.value,
  };

  productList.splice(  indexlist, 1 , product  )

  localStorage.setItem("products", JSON.stringify(productList));

  addBtn.classList.remove("d-none")
  updateBtn.classList.add("d-none")

  displayData()

}