(function(){

  // When DOM is ready
  $(function(){
    // Get selected value when DOM Loads
    $('.choosenCurrency').html($('select.historical-select').val());
    getSelectedCurrency();
  }());

  function execute(){
    
  }
  function requestCurrencyHistory(currency){
    // date format is YYYY / MM / DD
    let date = moment().format("YYYY-MM-DD");

    // Get 7 days later
    let date7Later = moment().subtract(7, 'd').format('YYYY-MM-DD');

    // request
    $.ajax(`https://api.exchangeratesapi.io/history?start_at=${date7Later}&end_at=${date}&symbols=${currency}`, {
      method: 'GET'
    }).done(function(data){
      $('#chart').empty();
      chart(data, currency);
    });
  }


  // Display last 7 days currency values
  function chart(data, currency){
    let dateArray = [];
    let valuesArray = [];

    function formatData(){
      $.each(data.rates, function(i, v){
        // Format date
        let year = i.substr(0,4);
        let month = i.substring(5,7);
        let day = i.substr(8,9)
        
        dateArray.push(day+"-"+month+"-"+year);

        // Push currency values to array
        valuesArray.push(v[`${currency}`]);
      });
    }

    formatData();

    let options = {
      chart: {
        type: 'line',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000,
          animateGradually: {
              enabled: true,
              delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 150
          }
        }
      },
      series: [{
        name: "1 EUR",
        data: valuesArray
      }],
      xaxis: {
        categories: dateArray.sort(),
        labels: {
          minHeight: 25,
          minWidth: 700
        }
      },
      theme: {
        palette: 'palette7'
      }
    }

    let apexChart = new ApexCharts(document.getElementById('chart'), options);
    
    apexChart.render();

    // Show EUR exchange
    $('.hystory-currency').removeClass('d-none').addClass('d-block');
  }


  // Get selected currency on change
  function getSelectedCurrency(){
    requestCurrencyHistory($('select.historical-select').val());

    let currency = "";

    switch($('select.historical-select').val()){
      case "USD" : {
        currency = `<span class="flag-icon flag-icon-us z-depth-1"></span> ${$('select.historical-select').val()}`;
        break;
      }
      case "GBP" : {
        currency = `<span class="flag-icon flag-icon-gb z-depth-1"></span> ${$('select.historical-select').val()}`;
        break;
      }
      case "CAD" : {
        currency = `<span class="flag-icon flag-icon-ca z-depth-1"></span> ${$('select.historical-select').val()}`;
        break;
      }
      case "AUD" : {
        currency = `<span class="flag-icon flag-icon-au z-depth-1"></span> ${$('select.historical-select').val()}`;
        break;
      }
      case "RON" : {
        currency = `<span class="flag-icon flag-icon-ro z-depth-1"></span> ${$('select.historical-select').val()}`;
        break;
      }
    }
    $('.choosenCurrency').html(currency);
  }

  $('select.historical-select').on('change', getSelectedCurrency);

}());