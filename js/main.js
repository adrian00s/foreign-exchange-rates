(function(){

  // when DOM is ready
  $(function(){
    domReady();
    getCurrencyValues();
  }());

  // Instance momentjs and display current time
  setInterval(() => {
    const momjs = moment().format("dddd, MMMM Do YYYY, h:mm:ss A");
    $('.main__time').html(momjs);
  }, 1000);

  function domReady(){
    const momjs = moment().format("dddd, MMMM Do YYYY, h:mm:ss A");
    $('.main__time').html(momjs);
  }

  // Get currency values and show them. When DOM Loads
  function getCurrencyValues(){
    $.ajax('https://api.exchangeratesapi.io/latest?base=USD', {
      method: 'GET'
    }).done(function(data){
      printValues(data);
    }).fail(function(){
      console.log("AN ERROR OCCURED");
    });
  }

  function printValues(data){
    let $table = $('.oneUsdTable');
    $table.append(`
    <tbody>
      <tr class="text-dark bg-white text-center">
        <td class="font-weight-bold">EUR</td>
        <td class="text-success font-weight-bold">€${data.rates.EUR.toFixed(2)}</td>
      </tr>
      <tr class="text-dark bg-white text-center">
        <td class=font-weight-bold>CHF</td>
        <td class="text-success font-weight-bold">₣${data.rates.CHF.toFixed(2)}</td>
      </tr>
      <tr class="text-dark bg-white text-center">
        <td class=font-weight-bold>GBP</td>
        <td class="text-success font-weight-bold">£${data.rates.GBP.toFixed(2)}</td>
      </tr>
      <tr class="text-dark bg-white text-center">
        <td class=font-weight-bold>CAD</td>
        <td class="text-success font-weight-bold">$${data.rates.CAD.toFixed(2)}</td>
      </tr>
    </tbody>
    `);

    console.log(data.rates);
  }


}());