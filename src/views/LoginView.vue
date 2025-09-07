<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            v-model="email"
            required
          />
          <!-- <span>此欄位不可留空</span> -->
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            v-model="password"
            required
          />
          <input class="formControls_btnSubmit" type="button" @click="handleLogin" value="登入" />
          <router-link class="formControls_btnLink" to="/register">註冊帳號</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { login } from '../utils/api';

const router = useRouter();

// 表單資料
const email = ref('admin@gmail.com');
const password = ref('');

// 處理登入
const handleLogin = async () => {
  if (!email.value || !password.value) {
    Swal.fire({
      icon: 'warning',
      title: '請完整填寫表單',
    });
    return;
  }

  try {
    const res = await login(email.value, password.value);

    // 後端回傳的 token / exp
    const { token, exp } = res.data || {};

    // 如果後端有 exp 就直接用，否則自動計算 8 小時後
    let expiresAt;
    if (exp) {
      expiresAt = new Date(exp); // 確保 exp 是 ISO string 或 timestamp
    } else {
      expiresAt = new Date();
      expiresAt.setTime(expiresAt.getTime() + 8 * 60 * 60 * 1000);
    }

    Swal.fire({
      icon: 'success',
      title: '登入成功',
    }).then(() => {
      document.cookie = `vue3-todolist-token=${token}; expires=${expiresAt.toUTCString()}; path=/`;
      router.push('/todolist');
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '發生錯誤',
      text: error.response?.data?.message || error.message,
    });
  }
};
</script>
