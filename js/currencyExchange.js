(function(){

  let counter = 0;

  // When DOM is ready
  $(function(){
    setLabels();
  }());

  function requestCurrencyData(currency){
    $.ajax(`https://api.exchangeratesapi.io/latest?base=${currency}`, {
      method: 'GET'
    }).done(function(data){
      calculateOutputValue(data);
    });
  }

  function getSelectValueFirst(){
    requestCurrencyData($('select.first-select').val());
  }

  // Request everytime you click the button and set the labels when you change the select option
  $('.btn-floating').on('click', getSelectValueFirst);
  $('.col-md-2').on('change', 'select.first-select, select.second-select', setLabels);  

  // Calculations
  function calculateOutputValue(data){
    let secondSelect = $('select.second-select').val();
    let symbol;
   
    switch(secondSelect){
      case "EUR": {
        symbol = "€";
        break;
      }
      case "GBP": {
        symbol = "£";
        break;
      }
      case "RON": {
        symbol = "LEU ";
        break;
      }
      default: {
        symbol = "$";
        break;
      }
    }

    function performCalculations(input){
      let getUserInput = +input;
      let secondSelect = $('select.second-select').val();
      let whereToPrint = document.getElementById('returnValue');
      let calculate = (data.rates[secondSelect] !== undefined) ? data.rates[secondSelect] : data.rates[secondSelect] = 1.00;

      $(whereToPrint).html(`
      <strong class="text-success font-weight-bold">${symbol}${(getUserInput * calculate).toFixed(2)}</strong>`).hide().fadeIn(); 
    }
    // set pattern input
    function setPattern(){
      let fromInput = document.getElementById('fromSelect');
      let whereToPrint = document.getElementById('returnValue');
  
      let pattern = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.)\d+)?$/;

      if (fromInput.value.match(pattern) && $(fromInput).val().indexOf("-") < 0 && $('select.second-select').find(':selected').val() !== "disabled"){
        counter++;
        performCalculations(fromInput.value);
        exchangeHistoryTable(counter, $('select.first-select').val(), $('select.second-select').val(), $('input#fromSelect').val(), $('#returnValue').text(), formatDateOrder);
      }else if (!Number(fromInput.value) && $('select.second-select').find(':selected').val() === "disabled" || Number(fromInput.value) && $('select.second-select').find(':selected').val() === "disabled"){
        whereToPrint.innerHTML = `<strong class="text-danger font-weight-bold">Choose currency!</strong>`;
      }else if (fromInput.value === ""){
        whereToPrint.innerHTML = `Value in <span class="valueTo">${$('select.second-select').val()}</span>`;
      }else{
        whereToPrint.innerHTML = `<strong class="text-danger font-weight-bold">Only numbers and .!</strong>`;
      }     
     
      // Pass date accordingly
      function formatDateOrder(){
        const momjs = moment().format("DD-MM-YY, h:mm A");
        return momjs;
      }
    }

    setPattern();
  }

  // Set labels so users know what the input is referring to
  function setLabelFrom(){
    let $getLabel = $('.valueFrom');
    $getLabel.html($('select.first-select').val());
  }

  function setLabelTo(){
    let $getLabel = $('.valueTo');
    $getLabel.html($('select.second-select').val());
  }

  function setLabels(){
    setLabelFrom();
    setLabelTo();
  }

  // Create table to see all the exchanges you made
  function exchangeHistoryTable(counter, firstSelect, secondSelect,  fSelectInputVal, sSelectInputVal, dateFN){
    // Switch currency symobol
    let symbol;

    switch(firstSelect){
      case "EUR": {
        symbol = "€";
        break;
      }
      case "GBP": {
        symbol = "£";
        break;
      }
      case "RON": {
        symbol = "LEU ";
        break;
      }
      default: {
        symbol = "$";
        break;
      }
    }

    let from = firstSelect+ " " + symbol+fSelectInputVal;
    let to = secondSelect + " " +sSelectInputVal;
   
    // Set everything in localStorage
    localStorage.setItem("counter", counter);
    localStorage.setItem("date", dateFN());
    localStorage.setItem("exchangeFrom", from);
    localStorage.setItem("exchangeTo", to);

    let $tableBody = $('#table-body');

      let printTable = ` 
        <tr class="text-center">
          <th class="font-weight-bold pink-text">${localStorage.getItem("counter")}</th>
          <td class="font-weight-bold">${localStorage.getItem("date")}</td>
          <td class="font-weight-bold text-success">${localStorage.getItem("exchangeFrom")}</td>
          <td class="font-weight-bold text-success">${localStorage.getItem("exchangeTo")}</td>
        </tr>
    `;

    $tableBody.html(function(i, c){
      return c += printTable;
    });

  }
}());
