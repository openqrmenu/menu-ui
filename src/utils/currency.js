export function getSupportedCurrencies() {
  function $(amount, currency) {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'name'
    }).format(amount);
  }
  let ary = product('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), 3).map(a => a.join(''));
  return ary.reduce((currencies, cur) => {
    return (output => {
      return output.replace(/^[^ ]+ /, '') !== cur
        ? currencies.concat({ code : cur, name : output.match(/(?<= ).+/)[0] })
        : currencies;
    })($(0, cur).trim());
  }, []);
}

export function product(iterables, repeat) {
  var argv = Array.prototype.slice.call(arguments), argc = argv.length;
  if (argc === 2 && !isNaN(argv[argc - 1])) {
    var copies = [];
    for (var i = 0; i < argv[argc - 1]; i++) { copies.push(argv[0].slice()); }
    argv = copies;
  }
  return argv.reduce((accumulator, value) => {
    var tmp = [];
    accumulator.forEach(a0 => value.forEach(a1 => tmp.push(a0.concat(a1))));
    return tmp;
  }, [[]]);
}

export function getCurrencyArray()
{
    if ( typeof getCurrencyArray.arr == 'undefined' ) {
        // It has not... perform the initialization
        getCurrencyArray.arr = [];
        getSupportedCurrencies().map(c => getCurrencyArray.arr.push({code: c.code, name: c.name}));
    }
  
  return getCurrencyArray.arr;
  
}