document.addEventListener("DOMContentLoaded", function(){
    

    
    const button11=document.getElementById("log_out_nav");
    button11.addEventListener("click",function(){
        console.log("log out");
        log_out();
    })
    const button12=document.getElementById("Rent_a_car_nav");
    button12.addEventListener("click",function(){
        window.location.href = '/rent_car';
    })

    const button13=document.getElementById("myprofile_nav");
    button13.addEventListener("click",function(){
    
        window.location.href = '/profile';
    })

    const button14=document.getElementById("rent_the_car");
    button14.addEventListener("click",function(){
    
        window.location.href = '/car_details';
    })

    const button15=document.getElementById("submit_btn2");
    button15.addEventListener("click",function(){
        complete_contract()
    })
})

function get_car_info(id_) {
                 
        const data = {
            id_: id_,
        };
    
        
        fetch('/car_details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Car found successfully!') {
                localStorage.setItem('cc', data.cc);
                console.log(localStorage.getItem('cc'));
                localStorage.setItem('color', data.color);
                console.log(localStorage.getItem('color'));
                localStorage.setItem('type', data.type);
                console.log(localStorage.getItem('type'));
                localStorage.setItem('model_name', data.model_name);
                console.log(localStorage.getItem('model_name'));
                localStorage.setItem('average_consumpt', data.average_consumpt);
                console.log(localStorage.getItem('average_consumpt'));
                localStorage.setItem('class_', data.class_);
                console.log(localStorage.getItem('class_'));

                }
        })
        
    }

    function details_form(){
    const cc = localStorage.getItem('cc');
    const type = localStorage.getItem('type');
    const color = localStorage.getItem('color');
    const model_car = localStorage.getItem('model_name');
    const avg_cons = localStorage.getItem('average_consumpt');
    const class_ = localStorage.getItem('class_');
    const a = document.getElementById("class_car");
    a.textContent=`Class: ${class_}`;
    const b = document.getElementById("model_car");
    b.textContent=`Car Name: ${model_car}`;
    const c = document.getElementById("model_type");
    c.textContent=`Type: ${type}`;
    const d = document.getElementById("car_color");
    d.textContent=`Color: ${color}`;
    const e = document.getElementById("car_cc");
    e.textContent=`CC: ${cc}`;
    const f = document.getElementById("avg_cons_car");
    f.textContent=`Avg Consumption: ${avg_cons}`;

}


    function complete_contract() {
            
            const start_date = document.getElementById('start_date_form').value;
            
            const end_date = document.getElementById('end_date_form').value;
            const pick_up_loc = document.getElementById('pickup_loc').value;
            const drop_off_loc = document.getElementById('dropoff_loc').value;
            const data = {
                start_date: start_date,
                end_date: end_date,
                pick_up_loc: pick_up_loc,
                drop_off_loc: drop_off_loc
            };
        
            
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            })
            .then(response => response.json())
            .then(data => {
                console.log('Contract Successful:', data);
                const a = document.getElementById("form_container");
                    localStorage.setItem('start_date', start_date);
                    console.log(localStorage.getItem('start_date'));
                    localStorage.setItem('end_date', end_date);
                    console.log(localStorage.getItem('end_date'));
                    localStorage.setItem('pick_up', pick_up_loc);
                    console.log(localStorage.getItem('pick_up'));
                    localStorage.setItem('drop_off', drop_off_loc);
                    console.log(localStorage.getItem('drop_off'));

                    window.location.href = '/profile';
                if (data.error) {
                    const divmessage = document.createElement('div');
                    const errormessage = document.createElement('p');
                    errormessage.textContent='Fill out everything';
                    errormessage.style.color= 'red';
                    errormessage.style.textAlign='center';
                    divmessage.style.opacity=0;
                    divmessage.style.transition = 'opacity 800ms ease-in-out';
                    divmessage.appendChild(errormessage);
                    a.appendChild(divmessage);
                    setTimeout(()=>{

                    
                        divmessage.style.opacity=1;
                        setTimeout(()=>{
                            divmessage.style.opacity=0;
                            setTimeout(()=>{
                                a.removeChild(divmessage);

                            },800);


                        },2000);
                    },50);
                    
    
                
                
                }
            })
            .catch(error => {
                console.error('Error Contract:', error);
            });
        }