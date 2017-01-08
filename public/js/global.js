
// ProductList data array for filling in info box
var productListData = []
var userInfo = false
var e = {}
// DOM Ready =============================================================
$(document).ready(() => {
  // Populate the user table on initial page load
  populateTable()
  // Username link click
  $('#productTable table tbody').on('click', 'td a.linkshowProduct', showProductInfo)

  // Delete Product link click
  $('#productTable table tbody').on('click', 'td a.linkdeleteProduct', deleteProduct)
  $('#linkdeleteProduct').on('click', deleteProduct)
  // Add Product button click
  $('#addProductForm').submit(addProduct)
  $('#productTable table tbody').on('click', 'td a.linkupdateProduct', populateUpdateProductForm)
  $('#updateProductForm').submit(updateProduct)
  $('#productTable table tbody').change(() => { console.log('La tabla ha cambiado') })
})

// Functions
// Fill table with data
function populateTable () {
  // Empty content string
  let tableContent = ''
  // jQuery AJAX call for JSON
  $.getJSON('/api/product', data => {
    // Stick our product data array into a productlist variable in the global object
    productListData = data

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data.products, function () {
      tableContent += `<tr>
      <td>
        <a href='#' class='linkshowProduct' rel='${this.name}' data='${this._id}'> ${this.name}</a>
      </td>
      <td>${this.category}</td>
      <td>${this.price} €</td>
      </tr>`
    })

    // Inject the whole content string into our existing HTML table
    $('#productTable table tbody').html(tableContent)
    if (!userInfo) {
      $('td a.linkshowProduct:first').click()
      userInfo = true
    }
  })
}

function showProductInfo (event) {
  event.preventDefault()
  let thisProductName = $(event.target).attr('rel')
  // var idToUpdate = $(this).attr('data')
  console.log(productListData.products.map(function (arrayItem) {
    return arrayItem.name
  }).indexOf(thisProductName))
  let arrayPosition = productListData.products.map(function (arrayItem) {
    return arrayItem.name
  }).indexOf(thisProductName)

  let thisProductObject = productListData.products[arrayPosition]
  $('#productInfoName').text(thisProductObject.name)
  $('#productInfoPrice').text(thisProductObject.price)
  $('#productInfoCategory').text(thisProductObject.category)
  $('#productInfoPicture').text(thisProductObject.picture)
  $('#productInfoDescription').text(thisProductObject.description)
  $('#productInfoPath').attr('src', `/images/${thisProductObject.picture}`)
  $('#linkdeleteProduct').attr('rel', thisProductObject._id)
  $('#linkupdateProduct').attr('rel', thisProductObject._id)
  e = event
}

function deleteProduct (event) {
  event.preventDefault()

  // Pop up a confirmation dialog
  let confirmation = confirm('¿Estás seguro de que quieres eliminar este producto?')

  // Check and make sure the user confirmed
  if (confirmation === true) {
    // If the did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/api/product/' + $(this).attr('rel')
    }).done(response => {
      // Check for a successfull (blank) response
      if (response.msg === undefined) {} else alert('Error: ' + response.msg)

      populateTable()
      $('td a.linkshowProduct:first').click()
    })
  } else { return false }
}

function updateProduct (event) {
  event.preventDefault()
  let idToUpdate = $('#linkupdateProduct').attr('rel')
  let formData = new FormData($(this)[0])
  $.ajax({
    type: 'PUT',
    url: `/api/product/${idToUpdate}`,
    data: formData,
    contentType: false,
    processData: false
  }).done(data => {
    resetForm('#updateProductForm')
    $('#modalUpdateProduct').modal('toggle')
    populateTable()
  }).fail(data => {
    console.log('Error')
  })
}

function addProduct (event) {
  // Añadir validación de formularios
  console.log('File is uploading...')
  event.preventDefault()
  let formData = new FormData($(this)[0])
  console.log(`Parametro del FormData: ${$(this)[0]}`)
  console.log(formData)
  $.ajax({
    type: 'POST',
    url: '/api/product/',
    data: formData,
    contentType: false,
    processData: false
  }).done(data => {
    console.log(`File is uploaded`)
    resetForm('#addProductForm')
    $('#modalSaveProduct').modal('toggle')
    populateTable()
  }).fail(data => {
    console.log('Error')
  })
}

function resetForm (idForm) {
  $(`${idForm} input`).val('')
  if ($(`${idForm} textarea`) !== undefined) {
    $(`${idForm} textarea`).val('')
  } else {
    console.log(`No hay textarea`)
  }
  if ($(`${idForm} select`) !== undefined) {
    $(`${idForm} select`).prop('selectedIndex', 0)
  } else { console.log(`No hay select`) }
}

function populateUpdateProductForm (event) {
  event.preventDefault()

  let thisProductId = $(this).attr('rel')
  let arrayPosition = productListData.products.map(function (arrayItem) { return arrayItem.name }).indexOf(thisProductId)
  let thisProductObject = productListData.products[arrayPosition]
  console.log($(thisProductObject))

  $('#productInputName').val(thisProductObject.name)
  $('#productInputPrice').val(thisProductObject.price)
  // $('#productInputPhoto').val(thisProductObject.picture)
  $('#productInputDescription').val(thisProductObject.description)
  $('#productInputCategory').val(thisProductObject.category)
}
