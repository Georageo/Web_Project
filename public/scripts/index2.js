function FourthAnimation (){
    
    const a = document.getElementById("log_in_message");
    
    setTimeout(() => {
        a.style.opacity=0;
        setTimeout(()=>{
            a.style.display="none";
        },1500)
        
    
    }, 1500);
    
    
}

function FifthAnimation (){
    
    const a = document.getElementById("rental_box3");
    const b = document.getElementById("rental_box4");
    const class_ = localStorage.getItem('class_');
    console.log(class_);
    if(class_==="1"){
        setTimeout(() => {
            a.style.display="none";
            b.style.display="none";
            },1500)
            
        
        }
     
}


function getFN(){
    const a = document.getElementById("welcome_fn");
    const b = localStorage.getItem('first_name');
    a.textContent = `${b}!`;
    a.style.paddingLeft = "15px";
}

function complete_profile(){
    const fn = localStorage.getItem('first_name');
    const ln = localStorage.getItem('last_name');
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    const workplace = localStorage.getItem('workplace');
    const years = localStorage.getItem('years');
    const class_user = localStorage.getItem('class_user');
    const start_date = localStorage.getItem('start_date');
    const end_date = localStorage.getItem('end_date');
    const pick_up = localStorage.getItem('pick_up');
    const drop_off = localStorage.getItem('drop_off');
    const car_model_name = localStorage.getItem('car_model_name');
    const car_cc = localStorage.getItem('car_cc');
    const car_avg_c = localStorage.getItem('car_avg_c');
    const car_type = localStorage.getItem('car_type');
    const car_color = localStorage.getItem('car_color');
    const car_class = localStorage.getItem('car_class');
    console.log(end_date);
    console.log(class_user);
    console.log(car_model_name);
    console.log(car_color);
    const a = document.getElementById("profilename_title");
    a.textContent=`${fn} ${ln}`;
    const b = document.getElementById("username_profile");
    b.textContent=`Username: ${username}`;
    const c = document.getElementById("email_profile");
    c.textContent=`Email: ${email}`;
    const d = document.getElementById("workplace_profile");
    d.textContent=`Workplace: ${workplace}`;
    const e = document.getElementById("years_profile");
    e.textContent=`Years Working: ${years}`;
    const f = document.getElementById("class_profile");
    f.textContent=`Class: ${class_user}`;
    const g = document.getElementById("sd_profile");
    g.textContent=`Start Date: ${start_date}`;
    const h = document.getElementById("ed_profile");
    h.textContent=`End Date: ${end_date}`;
    const i = document.getElementById("pu_profile");
    i.textContent=`Pick Up Location: ${pick_up}`;
    const j = document.getElementById("do_profile");
    j.textContent=`Drop Off Location: ${drop_off}`;
    const k = document.getElementById("Vehicle_profile");
    k.textContent=`Vehicle: ${car_model_name}`;

    const g1 = document.getElementById("car_sp_model_name");
    g1.textContent=`Model Name: ${car_model_name}`;
    const h1 = document.getElementById("car_sp_type");
    h1.textContent=`Type: ${car_type}`;
    const i1 = document.getElementById("car_sp_color");
    i1.textContent=`Color: ${car_color}`;
    const j1 = document.getElementById("car_sp_cc");
    j1.textContent=`cc: ${car_cc}`;
    const k1 = document.getElementById("car_sp_ag");
    k1.textContent=`Average Consumption: ${car_avg_c}`;
    const l = document.getElementById("car_sp_class");
    l.textContent=`Car Class: ${car_class}`;

}

function bark_popping(){
        
        const a = document.getElementById("bark_message");
        const b = document.getElementById("inside2");
        a.style.display ="flex";
        b.style.display ="none";
        a.style.opacity=1;
        setTimeout(() => {
            
            a.style.opacity=0;
            
            setTimeout(() => {
                a.style.display="none";
                b.style.display="grid";
            },250)
        }, 1000);

}

function log_out(){
    const log_out = 1;
    const data = {
        
        log_out: log_out

    };
    fetch('/profile', {
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

document.addEventListener("DOMContentLoaded", function() {
    console.log("JS2 loaded");
    FourthAnimation();
    getFN();
    complete_profile();
    const button10 = document.getElementById("profile_pic");
    button10.addEventListener("click", function() {
        console.log("bark");
        bark_popping();
        
    })
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


    
});