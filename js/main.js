(function(){

  // when DOM is ready
  $(function(){
    domReady();
    getCurrencyValues();

    // Update currency values each hour and get the actual hour when it's been updated
    setInterval(() =>{
      getCurrencyValues();
    }, 3600000);

    // Enable material feature
    $('.mdb-select').materialSelect();
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
      lastUpdate();
    }).fail(function(){
      console.log("AN ERROR OCCURED");
    });
  }

  function lastUpdate(){
    let pLastUpdated = document.getElementById('last-updated');
    const momjs = moment().format("dddd, MMMM Do YYYY, h:mm:ss A");
    
    $(pLastUpdated).empty().html(function(i, c){
      return c+= `<strong class="text-warning font-weight-bold">${momjs}</strong>`;
    });
  }

  function printValues(data){
    let $table = $('.oneUsdTable');
    $table.empty().append(`
    <thead>
      <tr class="text-dark bg-white text-center">
        <th scope="col">Currency <i class="fas fa-usd-circle text-success"></i></th>
        <th scope="col">Value <i class="fal fa-sack-dollar text-success"></i></th>
      </tr>
    </thead>
    <tbody>
      <tr class="text-dark bg-white text-center">
        <td class="font-weight-bold"><span class="flag-icon flag-icon-eu z-depth-1"></span> EUR</td>
        <td class="text-success font-weight-bold">€${data.rates.EUR.toFixed(2)}</td>
      </tr>
      <tr class="text-dark bg-white text-center">
        <td class=font-weight-bold><span class="flag-icon flag-icon-ch z-depth-1"></span> CHF</td>
        <td class="text-success font-weight-bold">₣${data.rates.CHF.toFixed(2)}</td>
      </tr>
      <tr class="text-dark bg-white text-center">
        <td class=font-weight-bold><span class="flag-icon flag-icon-gb z-depth-1"></span> GBP</td>
        <td class="text-success font-weight-bold">£${data.rates.GBP.toFixed(2)}</td>
      </tr>
      <tr class="text-dark bg-white text-center">
        <td class=font-weight-bold><span class="flag-icon flag-icon-ca z-depth-1"></span> CAD</td>
        <td class="text-success font-weight-bold">$${data.rates.CAD.toFixed(2)}</td>
      </tr>
      <tr class="text-dark bg-white text-center">
        <td class=font-weight-bold><span class="flag-icon flag-icon-au z-depth-1"></span> AUD</td>
        <td class="text-success font-weight-bold">$${data.rates.AUD.toFixed(2)}</td>
      </tr>
      <tr class="text-dark bg-white text-center">
        <td class=font-weight-bold><span class="flag-icon flag-icon-ro z-depth-1"></span> RON</td>
        <td class="text-success font-weight-bold">LEU ${data.rates.RON.toFixed(2)}</td>
      </tr>
    </tbody>
    `);
  }


  // Change caret and dropdown text color
  $('.caret, .select-dropdown').addClass('text-white');

}());