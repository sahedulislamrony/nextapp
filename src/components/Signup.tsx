"use client";

import cn from "@/app/lib/cn";
import { useState } from "react";

export default function Signup() {
  return (
    <div className="w-full   px-20  text-inherit flex justify-center items-center">
      <div className="w-[40rem] flex flex-col items-center py-4 my-4 text-gray-100 bg-gray-800 dark:bg-gray-50/5 rounded-md ">
        <h1 className="text-2xl font-semibold text-center py-4  ">
          Create new your account
        </h1>
        <Form />
      </div>
    </div>
  );
}

function Form() {
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
    setError(null);
    setStatus("idle");

    // checking state validity
    if (name.length < 3) {
      setError("name");
      return;
    }
    if (username.length < 3) {
      setError("username");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("email");
      return;
    }
    if (pass.length < 8) {
      setError("pass");
      return;
    }
    if (pass !== pass2) {
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

    const data = {
      name,
      username,
      email,
      pass,
    } as FormData;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      console.log(data);
    }, 2000);

    // send data to server
    // async function postData() {

    // try {
    //   setStatus("loading");
    //    const response = await fetch("/api/post", {
    //     method: 'POST',
    //     mode: 'cors',
    //     cache: 'no-cache',
    //     credentials: 'same-origin',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     redirect: 'follow',
    //     referrerPolicy: 'no-referrer',
    //     body: JSON.stringify(data)
    //   });}
    //   catch (error) {
    //     setStatus("error");
    //   }
    //   finally {
    //     setStatus("success");
    //   }
    // }
  }

  return (
    <form
      className="flex w-[60%] flex-col space-y-4 px-3 pt-4"
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
        label="I agree to the terms and conditions"
        value={terms}
        onChange={(e) => setTerms(e.target.checked)}
        error={error === "terms"}
        errMsg="You must agree to the terms and conditions"
      />

      {/* Error status module */}
      <div
        className={cn(
          "w-full h-14 text-md font-semibold   text-pink-800 hidden",
          {
            block: status === "error",
          }
        )}
      >
        There was an error while creating your account ! please try again later
        !
      </div>

      <button
        disabled={false}
        className={cn(
          "w-full py-2 bg-sky-600 text-lg font-semibold text-gray-200 rounded-md disabled:cursor-not-allowed",
          {
            "bg-gray-900 text-gray-500  ": false,
          }
        )}
      >
        {status === "loading" ? "Signing Up..." : "Sign Up"}
      </button>
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
  error,
  errMsg,
  value,
  onChange,
}: {
  label: string;
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
        <label htmlFor="terms" className="text-md">
          {label}
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
