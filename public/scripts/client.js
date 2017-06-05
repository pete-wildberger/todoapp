
$(onReady);

function onReady(){
  console.log('JS/JQ is loaded');
  displayToDo();

  $('#formDiv').hide();
//toggle form
  $('#addItem').on('click', function(){
    $('#formDiv').fadeIn('slow');
    $('#addItem').hide();
    });
//submit button
  $('#submitItem').on('click', function(){
    if( $('#item').val() === '' || $('#item').val() === undefined ||
    $('#dueDate').val() === '' || $('#dueDate').val() === undefined ||
    $('#des').val() === '' || $('#des').val() === undefined ){
    } else {
    toDoInfo();
    $('#formDiv').fadeOut('fast');
    $('#addItem').fadeIn('slow');
    $('#toDoSquares').empty();
    displayToDo();
    emptyBoxes();
      }
    });

    //delete buttons
  $('#toDoSquares').on('click', '#buttonX', function() {
      var id = $(this).data('id');
      if (confirm("Are you sure?")) {
      $(this).parent().fadeOut('slow');
      deleteInfo(id);
      displayToDo();
        }
      return false;
    });
    $('#completeSquares').on('click', '#buttonX', function() {
        var id = $(this).data('id');
        if (confirm("Are you sure?")) {
        $(this).parent().fadeOut('slow');
        deleteInfo(id);
        displayToDo();
        }
      return false;
      });

    //complete button
    $('#toDoSquares').on('click', '#compBtn', function() {
        var id = $(this).data('id');
        completeItem(id);
        displayToDo();
      });
}

var toDoInfo = function() {
  var toDoToSend = {
    item: $('#item').val(),
    duedate: $('#dueDate').val(),
    des: $('#des').val()
  }; // end toDoToSend
  console.log(toDoToSend);
  $.ajax({
    type: 'POST',
    url: '/todo/post',
    data: toDoToSend,
    success: function(response) {
      console.log('ribbet:', response);
    } //end success
  }); //end ajax post
};

var displayToDo = function() {
  $.ajax({
    type: 'GET',
    url: '/todo/',
    success: function(response) {
      console.log('meow', response);

      $('#toDoSquares').empty();
      $('#completeSquares').empty();

      for(var i=0; i<response.length; i++){

        var number = randomNumber(1, 4);
        var color = randomColor(number);
        var date = new Date(response[i].duedate);

        var $divBox = '<div class="toDoItem" >';
        $divBox += '<p>' + response[i].item + '</p>';
        $divBox += '<p>' + date.toLocaleDateString() + '</p>';
        $divBox += '<p>' + response[i].description + '</p>';
        if(response[i].complete == 'false'){
          $divBox += '<button data-id="' + response[i].id + '" id="compBtn">&#x2714</button>';
        }
        $divBox += '<button data-id="' + response[i].id + '" id="buttonX">X</button>';
        $divBox += '</div>';

        var $box = $($divBox);

        if(response[i].complete == 'false'){
          $('#toDoSquares').append($box).hide().fadeIn('slow');
          $($box).css('background-color', color);
        } else {
          $('#completeSquares').append($box).hide().fadeIn('slow');
          $($box).css('background-color', color);
      }
    }
  }
  }); //
}; //end displaytodo
var completeItem = function(id){

  $.ajax({
    url: '/todo/'+ id,
    type: 'PUT',
    data: {completeItem: true},
    success: function(response) {
    console.log('back from server with:', response);
    }
  });
};

var deleteInfo = function(id) {

  $.ajax({
    type: 'DELETE',
    url: '/todo/'+ id,
    success: function(response) {
      console.log('back from server with:', response);
      }
    });
  };

var emptyBoxes = function() {
  $('#item').val('');
  $('#dueDate').val('');
  $('#des').val('');
};
//make random number

function randomNumber(min, max){
    return  Math.floor(Math.random() * (1 + max - min) + min);
}

//change color

function randomColor(number){
  switch (number) {
    case 1:
      return color = '#087E8B';
    case 2:
      return color = '#0B3954';
    case 3:
      return color = '#FF5A5F';
    case 4:
      return color = '#C81D25';
    }
}
