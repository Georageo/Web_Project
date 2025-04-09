function FirstAnimation (){
    const a = document.getElementById("sign_in_initial");
    const b = document.getElementById("sign_in");
    a.style.opacity=0;
    setTimeout(() => {
        a.style.display="none";
        b.style.display = "grid";
        
        setTimeout(() => {
            b.style.opacity=1;
        },350)
    }, 350);
    
    
}

function SecondAnimation (){
    const a = document.getElementById("sign_in");
    const b = document.getElementById("register_page");
    a.style.opacity=0;
    setTimeout(() => {
        a.style.display="none";
        b.style.display = "grid";
        
        setTimeout(() => {
            b.style.opacity=1;
        },350)
    }, 350);
    
    
}

function ThirdAnimation (){
    const b = document.getElementById("sign_in");
    const a = document.getElementById("register_page");
    a.style.opacity=0;
    setTimeout(() => {
        a.style.display="none";
        b.style.display = "grid";
        
        setTimeout(() => {
            b.style.opacity=1;
        },350)
    }, 350);
    
    
}
    

