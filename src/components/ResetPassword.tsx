"use client";

// import { resetPassword } from "@/app/api/auth/auth";

import cn from "@/app/lib/cn";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  return (
    <div className="w-full h-screen flex justify-center items-center  px-20  text-inherit ">
      <div className="w-[35rem] h-fit  flex flex-col items-center py-4 my-4 text-gray-100 bg-gray-800 dark:bg-gray-50/5 rounded-md ">
        <h1 className="text-2xl font-bold text-center py-4  ">
          Reset Password
        </h1>
        <Form />
      </div>
    </div>
  );
}

function Form() {
  const router = useRouter();
  type Status = "idle" | "loading" | "success" | "error";
  type Error = "email";

  // form state
  const [email, setEmail] = useState("");
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
    const Email = email.trim();
    if (!emailRegex.test(Email)) {
      setError("email");
      return;
    }

    // if all states are valid submit the form

    type FormData = {
      email: string;
    };

    const data = {
      email: Email,
    } as FormData;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      console.log(data);
      // redirect to OTP verify page
      // add security token to the url + cookie
      router.push("/reset/verify");
    }, 2000);

    // // send data to server
    // (async () => {
    //   setStatus("loading");
    //   setError(null);
    //   try {
    //     const response = await resetPassword(data);
    //     // do something with the response
    //     setStatus("success");
    //     console.log(response);
    // add security token to the url + cookie
    // router.push("/reset/verify?");
    //   } catch (error) {
    //     setStatus("error");
    //     console.error(error);
    //   }
    // })();
  }

  return (
    <form
      className="flex w-[80%] flex-col px-3 pt-4"
      onSubmit={handleSubmit}
      onChange={resetErrors}
    >
      <Input
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error === "email"}
        errMsg="Please enter a valid email address"
      />

      {/* Error status module */}
      {status === "error" && (
        <Error
          text="Invalid email address !"
          className="text-md font-bold h-fit pt-5 "
        />
      )}

      <button
        disabled={status === "loading"}
        type="submit"
        className={cn(
          "w-full py-2 mt-8 mb-5  bg-sky-600 text-lg font-semibold text-gray-200 rounded-md disabled:cursor-not-allowed",
          {
            "bg-gray-900 text-gray-500  ": status === "loading",
          }
        )}
      >
        {status === "loading" ? "Loading..." : "Send OTP"}
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

function Error({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-14 text-md font-semibold   text-pink-800 block text-center ",
        className
      )}
    >
      {text}
    </div>
  );
}
