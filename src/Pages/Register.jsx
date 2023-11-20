import SignUp from "../components/UI/SignUp";

export default function Register() {
  return (
    <div className="md:flex justify-around items-center md:mx-24">
      <img width={500} height={300} src="./img/Signup.png" alt="" />
      <SignUp />
    </div>
  );
}
