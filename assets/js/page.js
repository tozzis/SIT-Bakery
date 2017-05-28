AOS.init()
var dessertData
$('#menu-detail').hide()
$('#first-parallax').parallax({
  imageSrc: './assets/media/images/first-page.jpg'
})
$('#second-parallax').parallax({
  imageSrc: './assets/media/images/second-page.jpg'
})
$('#third-parallax').parallax({
  imageSrc: './assets/media/images/third-page.jpg'
})
$('#four-parallax').parallax({
  imageSrc: './assets/media/images/four-bg.jpg'
})
$('#menu-detail').parallax({
  imageSrc: './assets/media/images/first-page.jpg'
})
$('.dropdown-item').click((a) => {
  $('#render').hide()
  $('#menu-detail').show()

  let dessertType = ''
  switch($(a.target).data('selector')) {
    case 1: 
      dessertType = 'cheesecake'
      break;
    case 2:
      dessertType = 'crepcake'
      break;
    case 3:
      dessertType = 'chipfon'
      break;
    case 4:
      dessertType = 'brownie'
      break;
    case 5:
      dessertType = 'macaron'
      break;
    case 6:
      dessertType = 'cookie'
  }
  console.log('./assets/json/'+dessertType+'.json')
  $.get('./assets/json/'+dessertType+'.json')
    .done((data) => {
      dessertData = data
      $($('#display-price').parent()).hide()
      $('#display-header').html(data.name + '<small></small>')
      $('#display-detail').html(data.detail)
      $('#display-button-parent').html('')
      let groupNode = document.createElement('div');
      for(i=0;i<data.taste.length;i++) {
        if(i%4 == 0) {
          groupNode = document.createElement('div');
          groupNode.className = 'btn-group btn-group-sm';
          groupNode.setAttribute('role', 'group');
          groupNode.setAttribute('aria-label', '...');
          $('#display-button-parent').append(groupNode);
          $(groupNode).append('<div class="btn btn-secondary card-outline-' + ((i == 0) ? 'white' : 'hidden') + ' white-text">Taste: </div>')
        }
        $(groupNode).append('<button class="btn btn-secondary" onclick="selectTaste(this)" data-index="'+ i +'">'+capitalizeFirstLetter(data.taste[i].name)+'</button>')
      }
      $('#image-showroom').attr('src', './assets/media/images/' + dessertData.directory + '/' + dessertData.taste[0].img)
      $('.valign-jquery').each(function () {
        let targetElement = this
        $(this).ready(function () {
          window.setTimeout(function () {
            $(targetElement).css({
              'margin-top' : ($(targetElement).parent().outerHeight() - $(targetElement).outerHeight())/2
              })
          }, 200)
        })
      });
      let clickedElement = $(a.target)
      clickedElement.parentsUntil('#navbarNavAltMarkup').find('.active').removeClass('active')
      clickedElement.parentsUntil('#dropdown-selector').parent().addClass('active')
  })
})
$('#home-click').click((a) => {
  $('#render').show()
  $('#menu-detail').hide()
  let clickedElement = $(a.target)
  clickedElement.parent().find('.active').removeClass('active')
  clickedElement.addClass('active')
})
$('#home-logo-click').click((a) => {
  $('#render').show()
  $('#menu-detail').hide()
  let clickedElement = $('#home-click')
  clickedElement.parent().find('.active').removeClass('active')
  clickedElement.addClass('active')
})

function selectTaste(a) {
  let tasteData = dessertData.taste[$(a).data('index')]
  $('#display-header small').html(' ' + capitalizeFirstLetter(tasteData.name))
  $('#display-detail').html(tasteData.detail)
  $('#display-price').html(tasteData.cost)
  $(a).parent().parent().find('.active').removeClass('active')
  $(a).addClass('active')
  $($('#display-price').parent()).show()
  $('#image-showroom').attr('src', './assets/media/images/' + dessertData.directory + '/' + tasteData.img)  
  $('.valign-jquery').each(function () {
    let targetElement = this
    $(this).ready(function () {
      window.setTimeout(function () {
        $(targetElement).css({
          'margin-top' : ($(targetElement).parent().outerHeight() - $(targetElement).outerHeight())/2
          })
      }, 200)
    })
  });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}