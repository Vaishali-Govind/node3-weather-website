


   const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');
    const messageOne = document.querySelector('#message');
    const messageTwo = document.querySelector('#message-2');
    

    weatherForm.addEventListener('submit', (e) => {
   //to prevent refreshing of the page   
        e.preventDefault();
        const location = search.value;
        messageOne.textContent = 'Loading...'
        messageTwo.textContent= ''
        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                      
                if(data.error){
                    messageOne.textContent = data.error
                } else {
                    console.log(data.forecast)
                    messageTwo.textContent = 'temperature is :'+' '+data.forecast.temprature +  'C'  +', '+ 'climate is:' +data.forecast.summary  + 'with a high of:' +data.forecast.temperatureHigh  +  'C'  + ',' + 'with a low of:' +data.forecast.temperatureLow   +  'C' 
                   
                    messageOne.textContent = data.location
                 
                }
            })
        })
       
     })