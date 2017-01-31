
// ProductList data array for filling in info box
var productListData = []
var userInfo = false
// DOM Ready =============================================================
$(document).ready(() => {
  // Populate the user table on initial page load
  populateTable()
  // Username link click
  $('#productTable table tbody').on('click', 'td a.linkshowProduct', showProductInfo)
  // Delete Product link click
  $('#linkdeleteProduct').click(deleteProduct)
  // Add Product button click
  $('#addProductForm').submit(addProduct)
  $('#updateProductForm').submit(updateProduct)
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
  // Ocultar botón
  $('#btnUpdateProduct').hide()
  // Mostrar barra de progreso
  $('#progressUpdate').show()

  let idToUpdate = $('#linkupdateProduct').attr('rel')
  let formData = new FormData($(this)[0])
  let xhr = new XMLHttpRequest()

  xhr.open('put', `/api/product/${idToUpdate}`, true)

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      let percentage = (e.loaded / e.total) * 100
      percentage = percentage.toFixed(0)
      // Actualizar barra de progreso
      setPercentage('#pbUpdateProduct', percentage)
    }
  }
  xhr.onerror = function (e) {
    // TODO: Mostrar modal de Error
    console.log('Error')
  }

  xhr.onload = function () {
    resetForm('#updateProductForm')
    $('#modalUpdateProduct').modal('toggle')
    populateTable()
    // Ocultar barra de progreso
    $('#progressUpdate').hide()
    // Establecer el % a 0
    setPercentage('#pbUpdateProduct', 0)
    // Mostrar botón
    $('#btnUpdateProduct').show()
  }

  xhr.send(formData)
}

function addProduct (event) {
  // TODO: Añadir validación de formularios
  event.preventDefault()
  // Ocultar botón
  $('#btnAddProduct').hide()
  // Mostrar barra de progreso
  $('#progressAdd').show()
  let formData = new FormData($(this)[0])
  let xhr = new XMLHttpRequest()

  xhr.open('post', '/api/product', true)

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      let percentage = (e.loaded / e.total) * 100
      percentage = percentage.toFixed(0)
      // Actualizar barra de progreso
      setPercentage('#pbAddProduct', percentage)
    }
  }

  xhr.onerror = function (e) {
    // TODO: Mostrar modal de error
    console.log('Error')
  }

  xhr.onload = function () {
    console.log('File is uploaded')
    resetForm('#addProductForm')
    $('#modalSaveProduct').modal('toggle')
    // Ocultar barra de progreso
    $('#progressAdd').hide()
    // Establecer el % a 0
    setPercentage('#pbAddProduct', 0)
    // Mostrar botón
    $('#btnAddProduct').show()
    populateTable()
    // TODO: Mostrar modal de éxito console.log(this.statusText)
  }

  xhr.send(formData)
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

function setPercentage (idPb, percentage) {
  $(idPb).css('width', `${percentage}%`)
  $(idPb).text(`${percentage}%`)
  $(idPb).attr('aria-valuenow', percentage)
}
