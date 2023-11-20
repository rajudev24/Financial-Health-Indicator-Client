import SignIn from "../components/UI/SignIn";

export default function Login() {
  return (
    <div className="md:flex justify-around items-center md:mx-24">
      <img width={500} height={300} src="./img/login.png" alt="" />
      <SignIn />
    </div>
  );
}
