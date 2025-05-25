

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
        const years = document.getElementById('years').value;
        const register=1;
        const log_in=0;
        let class_ ;
        const data = {
            username: username,
            password: password,
            email: email,
            firstName: fn,
            lastName: ln,
            workplace: workplace,
            register: register,
            years: years,
            class_:class_
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
            localStorage.setItem('first_name', fn);
                console.log(localStorage.getItem('first_name'));
                localStorage.setItem('email', email);
                console.log(localStorage.getItem('email'));
                localStorage.setItem('last_name', ln);
                console.log(localStorage.getItem('last_name'));
                localStorage.setItem('username', username);
                console.log(localStorage.getItem('username'));
                localStorage.setItem('workplace', workplace);
                console.log(localStorage.getItem('workplace'));
                localStorage.setItem('years', years);
                console.log(localStorage.getItem('years'));
                localStorage.setItem('class_', data.class_);
                console.log(localStorage.getItem('class_'));

                window.location.href = '/profile';
            if (data.error) {
                const divmessage = document.createElement('div');
                const errormessage = document.createElement('p');
                errormessage.textContent='Credentials must be unique and not blank';
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
            console.error('Error during registration:', error);
        });
    }


    function LogIn() {
        
        const passwordsn = document.getElementById('password').value;
        const usernamesn = document.getElementById('username').value;
        const register=0;
        const log_in=1;
        let class_;
    
        
        const data = {
            usernamesn: usernamesn,
            passwordsn: passwordsn,
            log_in: log_in,
            class_: class_
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
            if (data.message === 'Login successful!') {
                localStorage.setItem('first_name', data.first_name);
                console.log(localStorage.getItem('first_name'));
                localStorage.setItem('email', data.email);
                console.log(localStorage.getItem('email'));
                localStorage.setItem('last_name', data.last_name);
                console.log(localStorage.getItem('last_name'));
                localStorage.setItem('username', data.username);
                console.log(localStorage.getItem('username'));
                localStorage.setItem('workplace', data.workplace);
                console.log(localStorage.getItem('workplace'));
                localStorage.setItem('years', data.years);
                console.log(localStorage.getItem('years'));
                localStorage.setItem('class_', data.class_);
                console.log(localStorage.getItem('class_'));

                window.location.href = '/profile';
                }
            
            if (data.error === 'Invalid username or password.') {
                const divmessage = document.createElement('div');
                const errormessage = document.createElement('p');
                errormessage.textContent='Invalid username or password.';
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
            
            LogIn();
        });
        const button6 = document.getElementById("log_in_nav");
        button6.addEventListener("click", function() {
            console.log("to log in");
            scrol_to_section("page1");
        });
        const button7 = document.getElementById("about_us_nav");
        button7.addEventListener("click", function() {
            console.log("to about us");
            scrol_to_section("page2");
        });
        const button8 = document.getElementById("customers_nav");
        button8.addEventListener("click", function() {
            console.log("to our customers");
            scrol_to_section("page3");
        });
        const button9 = document.getElementById("faq_nav");
        button9.addEventListener("click", function() {
            console.log("to faq");
            scrol_to_section("page4");
        });

        
    });

    function scrol_to_section(id) {
        document.getElementById(id).scrollIntoView({
         behavior: 'smooth'
        });
      }

