import{b as N,d as y,r as u,e as I,j as s,R as x,C as a,B as C,T as p,L as E,l as P,f as S}from"./index-Zh4uuGdO.js";import{I as v,V as A,a as L}from"./VisibilityOff-Doyqg1vW.js";import{A as k}from"./Alert-Cen9E4my.js";function V(){var d,m,c;const i=N(),h=y(),[r,g]=u.useState(!1),{register:n,handleSubmit:f,setError:j,clearErrors:o,formState:{errors:e,isSubmitting:l}}=I();u.useEffect(()=>{localStorage.removeItem("CurrentUser")},[]);const b=async w=>{const t=await P(w);t.status==400?j("signIn",{type:"manual",message:t.message}):t.status==200&&(S(t.userId,h),i("/"))};return s.jsx(x,{className:"justify-content-center",children:s.jsxs(a,{children:[s.jsx("h3",{className:"welcome-text",children:"Welcome Back"}),s.jsxs("p",{className:"subtext",children:["Please Enter Your Credentials to ",s.jsx("strong",{children:"Log In"})]}),s.jsxs(C,{component:"form",noValidate:!0,autoComplete:"off",onSubmit:f(b),children:[s.jsx(p,{type:"text",label:"Email Address",...n("email",{required:"Email is required"}),variant:"standard",fullWidth:!0,margin:"dense",error:!!e.email,helperText:(d=e.email)==null?void 0:d.message,onChange:()=>o(),className:"input-field"}),s.jsx(p,{type:r?"text":"password",label:"Password",...n("password",{required:"Password is required"}),variant:"standard",fullWidth:!0,margin:"dense",error:!!e.password,helperText:(m=e.password)==null?void 0:m.message,onChange:()=>o(),className:"input-field",InputProps:{endAdornment:s.jsx(v,{position:"end",onClick:()=>g(!r),style:{cursor:"pointer"},children:r?s.jsx(A,{}):s.jsx(L,{})})}}),s.jsx(E,{to:"/resetPassword",className:"forgot-text",children:"Forgot Password?"}),e.signIn&&s.jsx(k,{variant:"outlined",severity:"error",className:"alert mt-1 ",children:(c=e.signIn)==null?void 0:c.message}),s.jsxs(x,{className:"mt-3",children:[s.jsx(a,{xs:12,md:6,className:"mb-2 mb-md-0",children:s.jsx("button",{type:"submit",className:"filled-button",disabled:l,children:"Login"})}),s.jsx(a,{xs:12,md:6,children:s.jsx("button",{type:"button",className:"outlined-button",disabled:l,onClick:()=>i("/register"),children:"Register"})})]})]})]})})}export{V as default};
