"use client";

// import { login } from "@/app/api/auth/auth";

import cn from "@/app/lib/cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  return (
    <div className="w-full h-dvh flex justify-center items-center sidePadding  ">
      <div className="w-[35rem] flex flex-col items-center py-4 my-4 text-gray-100 bg-gray-800 dark:bg-gray-50/5 rounded-md ">
        <h1 className="text-2xl font-bold text-center py-4  ">
          Login into your account
        </h1>
        <Form />
      </div>
    </div>
  );
}

function Form() {
  const router = useRouter();
  type Status = "idle" | "loading" | "success" | "error";
  type Error = "email" | "username" | "pass";
  type LoginMode = "username" | "email";

  // form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [terms, setTerms] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mode, setMode] = useState<LoginMode>("email");

  // status
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<Error | null>(null);

  function resetErrors() {
    setError(null);
    setStatus("idle");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // reset errors
    resetErrors();

    // checking state validity
    const Username = username.trim();
    const Email = email.trim();
    const Pass = pass.trim();

    if (mode === "username" && Username.length < 3) {
      setError("username");
      return;
    }
    if (mode === "email" && !emailRegex.test(Email)) {
      setError("email");
      return;
    }
    if (Pass.length < 8) {
      setError("pass");
      return;
    }

    // if all states are valid submit the form

    type FormData = {
      username: string;
      email: string;
      pass: string;
      remember: boolean;
      method: "username" | "email";
    };

    const data = {
      username: Username,
      email: Email,
      pass: Pass,
      remember: terms,
      method: mode,
    } as FormData;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      console.log(data);
      router.push("/");
    }, 2000);

    // // send data to server
    // (async () => {
    //   setStatus("loading");
    //   setError(null);
    //   try {
    //     const response = await login(data);
    //     // do something with the response
    //     setStatus("success");
    //     console.log(response);
    //   } catch (error) {
    //     setStatus("error");
    //     console.error(error);
    //   }
    // })();
  }

  return (
    <form
      className="flex w-[80%] flex-col space-y-4 px-1 md:px-3 "
      onSubmit={handleSubmit}
      onChange={resetErrors}
    >
      {mode === "username" && (
        <Input
          label="Username"
          type="text"
          placeholder="Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={error === "username"}
          errMsg="Invalid username"
        />
      )}
      {mode === "email" && (
        <Input
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error === "email"}
          errMsg="Please enter a valid email address"
        />
      )}
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        error={error === "pass"}
        errMsg="Invalid password"
      />

      <div className="flex flex-row w-full justify-between ">
        <Check
          label="Remember me"
          value={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        <Link href="/reset">
          <Check label="Forget password ?" hidden={true} />
        </Link>
      </div>

      <div className="py-2">
        <p className="text-sm w-full h-full italic  text-gray-400">
          By signing in, you are accepting our{" "}
          <a
            className="text-sky-600 font-semibold hover:underline "
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy policy
          </a>{" "}
          and{" "}
          <a
            className="text-sky-600 font-semibold  hover:underline "
            href="/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms of use
          </a>
          .
        </p>
      </div>

      {/* Error status module */}
      {status === "error" && (
        <Error text="There was an error while login into your account ! please try again later !" />
      )}

      <button
        disabled={status === "loading"}
        type="submit"
        className={cn(
          "w-full py-2 bg-sky-600 text-lg font-semibold text-gray-200 rounded-md disabled:cursor-not-allowed",
          {
            "bg-gray-900 text-gray-500  ": status === "loading",
          }
        )}
      >
        {status === "loading" ? "Loading..." : "Login"}
      </button>

      <div>
        <p className="text-center text-base font-semibold">
          Don&apos;t have an account ?{" "}
          <Link
            className="text-sky-600 font-semibold hover:underline"
            href="/signup"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}

function Input({
  label,
  type,
  placeholder,
  error,
  errMsg,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder?: string;
  errMsg?: string;
  error?: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="space-y-2 ">
      <label htmlFor={label} className="text-base font-semibold pl-1">
        {label}
      </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full p-2 pl-3   rounded-md bg-gray-50/5 outline-none focus:ring-1 focus:ring-sky-500",
          {
            "ring-1 focus:ring-1 ring-pink-600 focus:ring-pink-600 text-pink-600":
              error,
          }
        )}
      />
      <p
        className={cn("mt-2 hidden  text-pink-600 text-sm", {
          block: error,
        })}
      >
        {errMsg}
      </p>
    </div>
  );
}

function Check({
  label,
  value,
  onChange,
  hidden,
}: {
  label: string;
  value?: boolean;
  hidden?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex items-center space-x-2 mt-4">
      <input
        type={!hidden ? "checkbox" : "hidden"}
        id="terms"
        checked={value}
        onChange={onChange}
        className="h-4 w-4 rounded outline-offset-0 border-none text-green-600"
      />
      <label
        htmlFor="terms"
        className={cn("text-sm  sm:text-md", {
          "hover:underline underline-offset-2 cursor-pointer text-sky-500   hover:decoration-sky-500":
            hidden,
        })}
      >
        {label}
      </label>
    </div>
  );
}

function Error({ text }: { text: string }) {
  return (
    <div
      className={cn("w-full h-14 text-md font-semibold   text-pink-800 block")}
    >
      {text}
    </div>
  );
}
