export const isEmail = (email)=>{
    const expresionRegular = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return expresionRegular.test(email);
}