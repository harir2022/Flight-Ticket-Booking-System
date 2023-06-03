exports.customHBS =(hbs)=>{
     
     hbs.registerHelper('ifDivisibleBy', function(index, divisor, options) {
          if ((index + 1) % divisor === 0) {
            return options.fn(this);
          } else {
            return options.inverse(this);
          }
        });
     
        hbs.registerHelper('not', function(value) {
          return !value;
        });

}