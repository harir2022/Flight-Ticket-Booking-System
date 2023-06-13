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

    // Define Handlebars helper function to format date
    hbs.registerHelper('formatDate', function(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      const formattedDate = new Date(date);
      const year = formattedDate.getFullYear();
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const day = String(formattedDate.getDate()).padStart(2, '0');
      const hours = String(formattedDate.getHours()).padStart(2, '0');
      const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
      return formattedDateTime;
    });

    hbs.registerHelper('formatTime', function(time) {
      const formattedTime = time.substring(0, 5); // Extract the first 5 characters (HH:MM)
      return formattedTime;
    });



}