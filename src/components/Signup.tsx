"use client";

// import { signup } from "@/app/api/auth/login";
import cn from "@/app/lib/cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  return (
    <div className="w-full min-h-dvh   sidePadding  text-inherit flex justify-center items-center">
      <div className="w-[40rem] flex flex-col items-center py-4 mt-14 my-4 text-gray-100 bg-gray-800 dark:bg-gray-50/5 rounded-md ">
        <h1 className=" text-xl md:text-2xl font-bold text-center py-4  ">
          Create new your account
        </h1>
        <Form />
      </div>
    </div>
  );
}

function Form() {
  const router = useRouter();
  type Status = "idle" | "loading" | "success" | "error";
  type Error = "email" | "name" | "username" | "pass" | "pass2" | "terms";

  // form state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [terms, setTerms] = useState(false);

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
    // triming the input values

    const Name = name.trim();
    const Username = username.trim();
    const Email = email.trim();
    const Pass = pass.trim();
    const Pass2 = pass2.trim();

    // checking state validity
    if (Name.length < 3) {
      setError("name");
      return;
    }
    if (Username.length < 3) {
      setError("username");
      return;
    }
    if (!emailRegex.test(Email)) {
      setError("email");
      return;
    }
    if (Pass.length < 8) {
      setError("pass");
      return;
    }
    if (Pass !== Pass2) {
      setError("pass2");
      return;
    }
    if (!terms) {
      setError("terms");
      return;
    }

    // if all states are valid submit the form

    type FormData = {
      name: string;
      username: string;
      email: string;
      pass: string;
    };

    const data: FormData = {
      name: Name,
      username: Username,
      email: Email,
      pass: Pass,
    };

    setStatus("loading");
    setTimeout(() => {
      console.log(data);
      setStatus("success");
      router.push("/");
    }, 2000);

    // // send data to server
    // (async () => {
    //   setStatus("loading");
    //   setError(null);
    //   try {
    //     const response = await signup(data);
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
      <Input
        label="Name"
        type="text"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error === "name"}
        errMsg="Name must be at least 3 characters long"
      />
      <Input
        label="Username"
        type="text"
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={error === "username"}
        errMsg="Username already taken"
      />
      <Input
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error === "email"}
        errMsg="Please enter a valid email address"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter a strong password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        error={error === "pass"}
        errMsg="Password must be at least 8 characters long"
      />
      <Input
        label="Confirm Password"
        type="password"
        value={pass2}
        onChange={(e) => setPass2(e.target.value)}
        error={error === "pass2"}
        errMsg="Passwords do not match"
      />
      <Check
        value={terms}
        onChange={(e) => setTerms(e.target.checked)}
        error={error === "terms"}
        errMsg="You must agree to our terms and conditions !"
      />

      {/* Error status module */}
      {status === "error" && (
        <Error text="There was an error while creating your account ! please try again later !" />
      )}

      <button
        disabled={status === "loading"}
        className={cn(
          "w-full py-2 bg-sky-600 text-lg font-semibold text-gray-200 rounded-md disabled:cursor-not-allowed",
          {
            "bg-gray-900 text-gray-500  ": status === "loading",
          }
        )}
      >
        {status === "loading" ? "Loading..." : "Sign Up"}
      </button>

      <div>
        <p className="text-center text-base font-semibold">
          Already have an account ?{" "}
          <Link
            className="text-sky-600 font-semibold hover:underline"
            href="/login"
          >
            Login
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
  error,
  errMsg,
  value,
  onChange,
}: {
  error: boolean;
  errMsg: string;
  value: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="terms"
          checked={value}
          onChange={onChange}
          className="h-4 w-4 rounded outline-offset-0 border-none text-green-600"
        />
        <label htmlFor="terms" className="text-base italic">
          I agree to the{" "}
          <Link
            className="text-sky-600 font-semibold hover:underline "
            href="/privacy-policy"
            target="_blank"
          >
            privacy policy
          </Link>{" "}
          and{" "}
          <Link
            className="text-sky-600 font-semibold  hover:underline "
            href="/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms of use
          </Link>
          .
        </label>
      </div>
      <p
        className={cn("mt-2 hidden  text-pink-600 text-sm", {
          block: error,
        })}
      >
        {errMsg}
      </p>
    </>
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
