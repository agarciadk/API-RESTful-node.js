$(document).ready(() => {
  $('li[class="active"]').toggleClass()
  $('a[href="/gallery/"]').parent().addClass('active')
  populateCarousel()
  confCarousel()
})

function populateCarousel () {
  let template1 = ''
  let template2 = ''
  $.getJSON('/api/product', data => {
    $.each(data.products, function (index) {
      template1 += `
      <li class='col-sm-3'>
        <a class='thumbnail' id='carousel-selector-${index}'>
          <img src='/images/${this.picture}'>
        </a>
      </li>
      `
      if (index === 0) {
        template2 += `
        <div class='active item' data-slide-number='${index}'>
          <img src='/images/${this.picture}'>
        </div>
        `
      } else {
        template2 += `
        <div class='item' data-slide-number='${index}'>
          <img src='/images/${this.picture}'>
        </div>
        `
      }
    })
    $('#carouselSelectors').html(template1)
    $('#myCarousel div.carousel-inner').html(template2)
  })
}

function confCarousel () {
  $('#myCarousel').carousel({ interval: 5000 })
  // When the carousel slides, auto update the text
  $('#myCarousel').on('slid.bs.carousel', function (e) {
    let id = $('.item.active').data('slide-number')
    $('#carousel-text').html($('#slide-content-' + id).html())
  })
  // Handles the carousel thumbnails
  $('#carouselSelectors').on('click', 'a[id^=carousel-selector-]', function () {
    let idSelector = $(this).attr('id')
    try {
      let id = /-(\d+)$/.exec(idSelector)[1]
      console.log(idSelector, id)
      $('#myCarousel').carousel(parseInt(id))
    } catch (e) { console.log('Regex failed!', e) }
  })
}
