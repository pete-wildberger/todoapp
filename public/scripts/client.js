
$(onReady);

function onReady(){
  console.log('JS/JQ is loaded');
  displayToDo();

  $('#formDiv').hide();
//toggle form
  $('#addItem').on('click', function(){
    $('#formDiv').fadeIn(1000);
    $('#addItem').hide();
    });
//submit button
  $('#submitItem').on('click', function(){
    toDoInfo();
    $('#formDiv').fadeOut(1000);
    $('#addItem').fadeIn(1000);
    $('#toDoSquares').empty();
    displayToDo();
    emptyBoxes();
    });

    //delete buttons
  $('#toDoSquares').on('click', '#buttonX', function() {
      var id = $(this).data('id');
      if (confirm("Are you sure?")) {
      deleteInfo(id);
      displayToDo();
        }
      return false;
    });
    $('#completeSquares').on('click', '#buttonX', function() {
        var id = $(this).data('id');
        if (confirm("Are you sure?")) {
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
    url: '/todo',
    data: toDoToSend,
    success: function(response) {
      console.log('ribbet:', response);
    } //end success
  }); //end ajax post
};

var displayToDo = function() {
  $.ajax({
    type: 'GET',
    url: '/todo',
    success: function(response) {
      console.log('meow', response);

      $('#toDoSquares').empty();
      $('#completeSquares').empty();

      for(var i=0; i<response.length; i++){

        var color = '#'+Math.floor(Math.random()*16777215).toString(16);
        console.log(color);

        var $divBox = '<div class="toDoItem" >';
        if(response[i].complete == 'false'){
          $divBox += '<button data-id="' + response[i].id + '" id="compBtn">complete</button>';
        }
        $divBox += '<button data-id="' + response[i].id + '" id="buttonX">X</button>';
        $divBox += '<p>' + response[i].item + '</p>';
        $divBox += '<p>' + response[i].duedate.slice(0, 10) + '</p>';
        $divBox += '<p>' + response[i].description + '</p>';
        $divBox += '</div>';

        var $box = $($divBox);

        if(response[i].complete == 'false'){
          $('#toDoSquares').append($box);
          $($box).css('background-color', color);
        } else {
          $('#completeSquares').append($box);
          $($box).css('background-color', color);
      }

    }

  }
  }); //
}; //end displaytodo
var completeItem = function(id){
  var completeItem = {
    id: id
  };
  $.ajax({
    url: '/todo',
    type: 'PUT',
    data: completeItem,
    success: function(response) {
    console.log('back from server with:', response);
    }
  });
};

var deleteInfo = function(id) {
  var deleteRow = {
    id: id
  };
  $.ajax({
    type: 'DELETE',
    url: '/todo',
    data: deleteRow,
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
