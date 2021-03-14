<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-block h-100">
        <v-row class="h-100" no-gutters>
          <v-col cols="5" class="h-100">          
            <div class="signup-bg">
              <div>
                <img src="../assets/finship/finship.png" />
                <div class="signup-str">
                  Don't have an account ? 
                </div>               
                <div class="signup-btn">  
                  <v-btn rounded outlined color="indigo">
                    Sign Up
                  </v-btn>               
                </div>                
              </div>
            </div>
          </v-col>
          <v-col cols="7" class="h-100">
            <div class="login-form">
              <div>
                <h2>Login to Dashboard</h2>
                <br>
                <v-text-field @keyup.enter="signin" v-model="username" 
                :rules="[() => !!username || 'Please enter username']"
                 filled label="Username" >
                </v-text-field>
                <v-text-field @keyup.enter="signin" v-model="password"
                 :rules="[() => !!password || 'Please enter password']"
                 :type="showPassword ? 'text': 'password'" filled label="Password">
                  <v-icon slot="append" @click="showPassword = !showPassword" color="black" v-if="showPassword"> mdi-eye-off </v-icon>
                  <v-icon slot="append" @click="showPassword = !showPassword" color="black" v-else> mdi-eye </v-icon>
                </v-text-field>
                <v-checkbox                  
                  label="Remember Me"
                ></v-checkbox>
                <div class="login-btns">
                  <v-btn :disabled="username.trim() == '' || password.trim() == ''" @click="signin" color="primary">Sign In</v-btn>
                  <v-btn plain color="primary">Forgot Password ?</v-btn>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'Login',
  data: () => ({
      username: "",
      password: "",
      showPassword: false,
      finShipLogo:  null
  }),
  computed: {
    ...mapState(["isLoggedIn", "username"])
  },
  mounted() {
    this.checkIfLoggedIn();
  },
  methods: {
    ...mapMutations(["updateIsLoggedIn", "updateUsername"]),
    checkIfLoggedIn() {
      if(this.isLoggedIn) {
        let redirectPath = 'Dashboard';
        let redirectAfterLogin = localStorage.getItem('redirectAfterLogin')
        if(redirectAfterLogin) {
            redirectPath = redirectAfterLogin;
        }
        localStorage.removeItem('redirectAfterLogin')
        this.$router.push({ name: redirectPath });
      }
    },
    signin() {
      if(this.username.trim() > "" && this.password.trim() > "") {
        let loginData = {
          isLoggedIn: 1,
          username: this.username
        }
        localStorage.setItem("loginData", JSON.stringify(loginData));
        this.updateUsername(this.username);
        this.updateIsLoggedIn(true);
        let redirectPath = 'Dashboard';
        let redirectAfterLogin = localStorage.getItem('redirectAfterLogin')
        if(redirectAfterLogin) {
            redirectPath = redirectAfterLogin;
        }
        localStorage.removeItem('redirectAfterLogin')
        this.$router.push({ name: redirectPath });
      }
    }
  }
  
}
</script>
<style scoped>
  .login-page {
    height: 100vh;
    background-color: #4055b2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .h-100 {
    height: 100%;
  }
  .login-card {
    height: 400px;
    width: 70%;
  }
  .login-form {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
  }

  .login-form > div {
    width: 70%;
  }
  .signup-bg {
    background-color: #112562;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .signup-bg button {
    text-align: center;
    background-color: white;
  }
  .login-btns {
    display: flex;
    justify-content: space-between;
  }
  .signup-str {
    color: white;
    font-size: 20px;
  }
  .signup-btn {
    text-align: center;
  }
</style>