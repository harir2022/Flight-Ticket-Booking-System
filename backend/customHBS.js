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


        // Register a custom helper called "json"
        hbs.registerHelper('json', function(context) {
          return JSON.stringify(context);
        });


}