import { FcGoogle } from "react-icons/fc";
import {
  FaDiscord,
  FaSteamSymbol,
  FaTwitch,
  FaTwitter,
  FaApple,
  FaGithub,
} from "react-icons/fa";
import Link from "next/link";
import {
  signInWithGithub,
  signInWithDiscord,
  signInWithGoogle,
  onAuthStateChange,
} from "../../firebase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useUser from "../../firebase/hook";

export default function Login() {
  const user = useUser();
  const router = useRouter();

  function showPassword() {
    const x = document.getElementById("pwd");
    const y = document.getElementById("show");
    if (x.type === "password") {
      x.type = "text";
      y.innerHTML = "Hide Password";
    } else {
      x.type = "password";
      y.innerHTML = "Show Password";
    }
  }

  const handleClickGitHub = () => {
    signInWithGithub();
  };

  const handleClickGoogle = () => {
    signInWithGoogle();
  };

  const handleClickDiscord = () => {
    signInWithDiscord();
  };

  useEffect(() => {
    user && router.replace("/");
  }, [user]);

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full h-screen overflow-hidden p-[16rem] bg-secondary text-white">
        <div className="font-medium text-8xl">
          <p>Hi!</p>
          <p>It's nice to see you!</p>
        </div>
        <div className="text-sm font-normal bg-primary w-96 p-7">
          <p className="mb-10 text-2xl font-medium">Log in</p>
          <div className="flex flex-col gap-4 ">
            <button
              onClick={handleClickGoogle}
              className="z-50 flex items-center w-full p-3 text-black bg-white hover:brightness-90"
            >
              <FcGoogle className="w-6 h-6" />
              <div className="grid w-full align-middle place-content-center">
                Continue with Google
              </div>
            </button>
            <button
              onClick={handleClickGitHub}
              className="z-50 flex items-center w-full p-3 text-white bg-gray-900 hover:brightness-90"
            >
              <FaGithub className="w-6 h-6" />
              <div className="grid w-full align-middle place-content-center">
                Continue with GitHub
              </div>
            </button>
            {/* <button onClick={handleClickDiscord} className=" z-50 flex items-center w-full p-3 text-white bg-[#5865f2] hover:brightness-90" disabled>
                        <FaDiscord className="w-6 h-6"/>
                        <div className="grid w-full align-middle place-content-center">Continue with Discord</div> 
                    </button> */}
          </div>
          {/* <div className="grid w-full grid-cols-4 mt-10 border-[1px] border-gray-500 h-14">
                    <button className="grid place-content-center hover:text-hover_color"><FaSteamSymbol className="w-6 h-6" disabled/></button>
                    <button className="grid place-content-center hover:text-hover_color"><FaTwitch className="w-6 h-6" disabled/></button>
                    <button className="grid place-content-center hover:text-hover_color"><FaTwitter className="w-6 h-6" disabled/></button>
                    <button className="grid place-content-center hover:text-hover_color"><FaApple className="w-6 h-6" disabled/></button>
                </div>
                <div className="opacity-[0.12] flex w-full mt-7 mb-4 place-content-center before:content-[''] before:w-full before:h-[1px] before:bg-white after:content-[''] after:w-full after:h-[1px] after:bg-white">
                    <span className="grid place-content-center -translate-y-[50%] bg-primary w-10 z-10">or</span>
                </div>
                <form className="flex flex-col gap-2">
                    <input type="text" name="email" id="email" placeholder="Email" className="p-4 cursor-pointer hover:bg-secondary focus:bg-secondary bg-tertiary"/>
                    <input type="password" name="pwd" id="pwd" placeholder="Password" className="p-4 cursor-pointer hover:bg-secondary focus:bg-secondary bg-tertiary"/>
                    <span onClick={showPassword} id="show" className="text-xs cursor-pointer select-none w-fit font-extralight text-hover_color">Show Password</span>
                    <button className="py-2 mt-3 font-bold text-black bg-hover_color">Sign In</button>
                </form>
                <div className="grid w-full place-content-center">
                    <Link href="/forgotPassword" className="mt-3 text-xs cursor-pointer select-none font-extralight text-hover_color">Forgot Password?</Link>
                </div> */}
        </div>
      </div>
    </>
  );
}
