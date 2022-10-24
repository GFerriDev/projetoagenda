class Login {
    constructor(formClass) {
      this.form = document.querySelector(formClass);
    }
  
    init() {
      this.events();
    }
  
    events() {
      if(!this.form) return;
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        this.validate(e);
      });
    }
  
    validate(e) {
      const el = e.target;
      const emailInput = el.querySelector('input[name="email"]');
      const passwordInput = el.querySelector('input[name="password"]');
      const email_error = el.querySelector('.error-msgP')
      const password_error = el.querySelector('.error-msgE')
      let error = false;

      if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
        email_error.innerHTML = '<font color="red"> Senha inválida </font>'
        error = true;
      }


      if(!emailInput.value.includes('.com')){
        password_error.innerHTML = '<font color="red"> E-mail inválido </font>'
        error = true;
      }

      if(!error) el.submit();
    }

    
}
    

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

login.init();
cadastro.init();




