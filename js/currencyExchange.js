(function(){

  // When DOM is ready
  $(function(){
    requestCurrencyData($('select.first-select').val());

    setLabels();
  }());

  function requestCurrencyData(currency){
    $.ajax(`https://api.exchangeratesapi.io/latest?base=${currency}`, {
      method: 'GET'
    }).done(function(data){
      calculateOutputValue(data);
      console.log(data.rates)
    });
  }

  function getSelectValueFirst(e){
    requestCurrencyData($("select.first-select").val());

    setLabelFrom();

    // Stop event propagation
    e.stopPropagation();
  }

  // added select.second-select to retrieve data again when changing select option (bug)
  $('.col-md-2').on('change', 'select.first-select, select.second-select', getSelectValueFirst);
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

      whereToPrint.innerHTML = `
      <strong class="text-success font-weight-bold">${symbol}${(getUserInput * calculate).toFixed(2)}</strong>`;
    }

    // set pattern input
    function setPattern(){
      let fromInput = document.getElementById('fromSelect');
      let whereToPrint = document.getElementById('returnValue');
  
      let pattern = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.)\d+)?$/;
      
      $('.btn-floating').on('click', function(){
        if (fromInput.value.match(pattern)){
          performCalculations(fromInput.value);
        }else if (fromInput.value === ""){
          whereToPrint.innerHTML = `Value in <span class="valueTo">${$('select.second-select').val()}</span>`;
        }else{
          whereToPrint.innerHTML = `<strong class="text-danger font-weight-bold">Only numbers and .!</strong>`;
        }
      });
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
}());