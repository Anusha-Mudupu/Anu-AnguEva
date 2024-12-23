var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 
function uncheckFirst() {
  //$("input[type='checkbox']:checked").prop("checked", false)
  /*$('input:checkbox[id^="all"]:checked')*/
	$('#termSheetPopup1').find('input[type=checkbox]:checked').removeAttr('checked');

  console.log("entered if");
}
$('.clear-all-first').on('click', uncheckFirst)

function uncheckSecond() {
  //$("input[type='checkbox']:checked").prop("checked", false)
  /*$('input:checkbox[id^="all"]:checked')*/
	$('#termSheetPopup2').find('input[type=checkbox]:checked').removeAttr('checked');

  console.log("entered if");
}
$('.clear-all-second').on('click', uncheckSecond)

function uncheckThird() {
  //$("input[type='checkbox']:checked").prop("checked", false)
  /*$('input:checkbox[id^="all"]:checked')*/
	$('#termSheetPopup3').find('input[type=checkbox]:checked').removeAttr('checked');

  console.log("entered if");
}
$('.clear-all-third').on('click', uncheckThird)


/*$('.reset').on('click', uncheckAll)*/
console.log("hi");
$('.categories-menu.menu.nested').each(function(){
  var filterAmount = $(this).find('li').length;
  if( filterAmount > 5){    
    $('li', this).eq(4).nextAll().hide().addClass('toggleable');
    $(this).append('<li class="more">More</li>');    
  }  
});

$('.categories-menu.menu.nested').on('click','.more', function(){
  if( $(this).hasClass('less') ){  
		console.log("entered into the function if");
    $(this).text('More').removeClass('less');    
  }else{
    $(this).text('Less').addClass('less'); 
  }
  $(this).siblings('li.toggleable').slideToggle(); 
}); 
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}