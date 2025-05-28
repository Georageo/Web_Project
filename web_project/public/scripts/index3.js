function FifthAnimation (){
    
    const a = document.getElementById("rental_box3");
    const b = document.getElementById("rental_box4");
    const class_ = localStorage.getItem('class_');
    console.log(class_);
    if(class_==="1"){
        setTimeout(() => {
            a.style.display="none";
            b.style.display="none";
            },0)
            
        
        }
     
}

function log_out(){
    const log_out = 1;
    const data = {
        
        log_out: log_out

    };
    fetch('/rent_car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Logout successful!') {
            localStorage.clear();
            window.location.href = '/';
            }

    })

}

document.addEventListener("DOMContentLoaded", function(){
         FifthAnimation();
    
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
})

