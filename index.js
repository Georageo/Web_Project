
    function FirstAnimation (){
        console.log("FirstAnimation called");
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

    function Register() {
        
        const password = document.getElementById('password2').value;
        const username = document.getElementById('username2').value;
        const email = document.getElementById('email').value;
        const fn = document.getElementById('fn').value;
        const ln = document.getElementById('ln').value;
        const workplace = document.getElementById('firms').value;
        const register=1;
        const log_in=0;
        
        const data = {
            username: username,
            password: password,
            email: email,
            firstName: fn,
            lastName: ln,
            workplace: workplace,
            register: register
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
            console.log('Registration successful:', data);
            const a = document.getElementById("register_page");
            if (data.error) {
                const divmessage = document.createElement('div');
                const errormessage = document.createElement('p');
                errormessage.textContent='Credentials must be unique and not blank';
                errormessage.style.color= 'red';
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
            console.error('Error during registration:', error);
        });
    }


    function LogIn() {
        
        const passwordsn = document.getElementById('password').value;
        const usernamesn = document.getElementById('username').value;
        const register=0;
        const log_in=1;
    
        
        const data = {
            usernamesn: usernamesn,
            passwordsn: passwordsn,
            log_in: log_in

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
            
            const a = document.getElementById("sign_in");
            
            if (data.error === 'Invalid username or password.') {
                const divmessage = document.createElement('div');
                const errormessage = document.createElement('p');
                errormessage.textContent='Invalid username or password.';
                errormessage.style.color= 'red';
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
            console.error('Error during sign in:', error);
        });
    }





    document.addEventListener("DOMContentLoaded", function() {
        console.log("JS loaded");
        const button1 = document.getElementById("button1");
        button1.addEventListener("click", function() {
            FirstAnimation();
        });
        const button2 = document.getElementById("r_b");
        button2.addEventListener("click", function() {
            SecondAnimation();
        });
        const button3 = document.getElementById("r_b2");
        button3.addEventListener("click", function() {
            Register();
        });
        const button4 = document.getElementById("si_b2");
        button4.addEventListener("click", function() {
            ThirdAnimation();
        });
        const button5 = document.getElementById("si_b");
        button5.addEventListener("click", function() {
            console.log("Sign In");
            LogIn();
        });
        
    });

