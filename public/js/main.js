console.log("connected with javascript file");

function validateRegisterForm() {
  let password = document.getElementById('password').value;
  let passwordConfirmation = document.getElementById('passwordConfirmation').value;
  let passwordsMatch = document.querySelector('.passwordsMatch');
  if (password === passwordConfirmation) {
    return true;
  } else {
    passwordsMatch.style.display = "block";
    return false;
  }
}

function handleOriginForm() {
  let originSelectForm = document.getElementById('originSelectForm');
  let selected = originSelectForm.options[originSelectForm.selectedIndex];
  let index = selected.getAttribute('index');
  let originIndex = document.getElementById('originIndex');
  originIndex.value = index;
}

// Script written by user on snip...
$(document).ready(function () {
  $('.filterable .btn-filter').click(function () {
    let $panel = $(this).parents('.filterable'),
      $filters = $panel.find('.filters input'),
      $tbody = $panel.find('.table tbody');
    if ($filters.prop('disabled') == true) {
      $filters.prop('disabled', false);
      $filters.first().focus();
    } else {
      $filters.val('').prop('disabled', true);
      $tbody.find('.no-result').remove();
      $tbody.find('tr').show();
    }
  });

  $('.filterable .filters input').keyup(function (e) {
    let code = e.keyCode || e.which;
    if (code == '9') return;
    let $input = $(this),
      inputContent = $input.val().toLowerCase(),
      $panel = $input.parents('.filterable'),
      column = $panel.find('.filters th').index($input.parents('th')),
      $table = $panel.find('.table'),
      $rows = $table.find('tbody tr');
    let $filteredRows = $rows.filter(function () {
      let value = $(this).find('td').eq(column).text().toLowerCase();
      return value.indexOf(inputContent) === -1;
    });
    $table.find('tbody .no-result').remove();
    $rows.show();
    $filteredRows.hide();
    if ($filteredRows.length === $rows.length) {
      $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
    }
  });
});