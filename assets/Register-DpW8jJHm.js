import{b as A,r as f,e as E,j as e,R as o,C as l,B as R,T as t,L as T,g as U}from"./index-Zh4uuGdO.js";import{I as g,V as j,a as w}from"./VisibilityOff-Doyqg1vW.js";import{A as I}from"./Alert-Cen9E4my.js";function F(){var d,m,u,c,p,x;const b=A(),[n,P]=f.useState(!1),[i,C]=f.useState(!1),{register:r,handleSubmit:y,setError:N,clearErrors:a,formState:{errors:s,isSubmitting:v}}=E(),S=async q=>{let h=await U(q,b);h&&N("signUp",{type:"manual",message:h})};return e.jsx(o,{className:"justify-content-center",children:e.jsxs(l,{children:[e.jsx("h3",{className:"welcome-text",children:"Join MeChat"}),e.jsxs("p",{className:"subtext",children:["Please Enter Your Credentials to ",e.jsx("strong",{children:"Register"})]}),e.jsxs(R,{component:"form",noValidate:!0,autoComplete:"false",onSubmit:y(S),children:[e.jsx(t,{type:"text",label:"Full Name",...r("username",{required:"Username is required"}),variant:"standard",fullWidth:!0,margin:"dense",onChange:()=>a(),error:!!s.username,helperText:(d=s.username)==null?void 0:d.message,className:"input-field"}),e.jsx(t,{type:"text",label:"Email Address",...r("email",{required:"Email is required"}),variant:"standard",fullWidth:!0,margin:"dense",onChange:()=>a(),error:!!s.email,helperText:(m=s.email)==null?void 0:m.message,className:"input-field"}),e.jsxs(o,{children:[e.jsx(l,{md:6,children:e.jsx(t,{type:n?"text":"password",label:"Password",...r("password",{required:"Password is required"}),variant:"standard",fullWidth:!0,margin:"dense",onChange:()=>a(),error:!!s.password,helperText:(u=s.password)==null?void 0:u.message,className:"input-field",InputProps:{endAdornment:e.jsx(g,{position:"end",onClick:()=>P(!n),style:{cursor:"pointer"},children:n?e.jsx(j,{}):e.jsx(w,{})})}})}),e.jsx(l,{md:6,children:e.jsx(t,{type:i?"text":"password",label:"Confirm Password",...r("confirmPassword",{required:"Confirm Password is required"}),variant:"standard",fullWidth:!0,margin:"dense",onChange:()=>a(),error:!!s.confirmPassword,helperText:(c=s.confirmPassword)==null?void 0:c.message,className:"input-field",InputProps:{endAdornment:e.jsx(g,{position:"end",onClick:()=>C(!i),style:{cursor:"pointer"},children:i?e.jsx(j,{}):e.jsx(w,{})})}})})]}),(s.confirmPassword||s.signUp)&&e.jsx(I,{variant:"outlined",severity:"error",className:"alert mt-1 ",children:((p=s.confirmPassword)==null?void 0:p.message)||((x=s.signUp)==null?void 0:x.message)}),e.jsxs(o,{className:"mt-1",children:[e.jsx("button",{type:"submit",className:"filled-button",disabled:v||s.username||s.password||s.confirmPassword,children:"Register"}),e.jsxs("p",{className:"subtext mt-3",children:["Already have an account? ",e.jsx(T,{to:"/login",children:"Login here"})]})]})]})]})})}export{F as default};
