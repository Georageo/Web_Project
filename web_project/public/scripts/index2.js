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
    const class_ = localStorage.getItem('class_');
    const start_date = localStorage.getItem('start_date');
    const end_date = localStorage.getItem('end_date');
    const pick_up = localStorage.getItem('pick_up');
    const drop_off = localStorage.getItem('drop_off');
    const model_name = localStorage.getItem('model_name');
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
    f.textContent=`Class: ${class_}`;
    const g = document.getElementById("sd_profile");
    g.textContent=`Start Date: ${start_date}`;
    const h = document.getElementById("ed_profile");
    h.textContent=`End Date: ${end_date}`;
    const i = document.getElementById("pu_profile");
    i.textContent=`Pick Up Location: ${pick_up}`;
    const j = document.getElementById("do_profile");
    j.textContent=`Drop Off Location: ${drop_off}`;
    const k = document.getElementById("Vehicle_profile");
    k.textContent=`Vehicle: ${model_name}`;

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