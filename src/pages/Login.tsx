import React,{ useEffect } from 'react';
import '@/assets/cssCollection/login.less'
function Login() {
  // useEffect(()=>{
  //   const appWrapper:any = document.querySelector('.login-wrapper')
  //   setInterval(()=>{
  //     if(appWrapper) {
  //       let imagePath = `@/assets/background${Math.floor(Math.random()*5+1)}.jpg`
  //       appWrapper.style.backgroundImage = `url(${imagePath})`
  //     }
  //   },10000)
  // },[])
  return (
    <div className="login-wrapper">
      <header className="login-header">
        这是登录页面的头部内容
      </header>
      <section>
        这是登录页的主要内容区域
      </section>
    </div>
  );
}

export default Login;