"use client";

// import { resetPassword } from "@/app/api/auth/auth";

import cn from "@/app/lib/cn";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Verify() {
  return (
    <div className="w-full h-screen flex justify-center items-center px-20  ">
      <div className="w-[35rem] flex flex-col items-center py-4 my-4 text-gray-100 bg-gray-800 dark:bg-gray-50/5 rounded-md ">
        <h1 className="text-2xl font-bold text-center py-4  ">Verify OTP</h1>
        <Form />
      </div>
    </div>
  );
}

function Form() {
  const router = useRouter();
  type Status = "idle" | "loading" | "success" | "error";
  const OTP_SIZE = 6;
  // form state
  const [OTP, setOTP] = useState<string>("");
  // status
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // reset errors
    setStatus("idle");
    if (OTP.length !== OTP_SIZE) {
      setStatus("error");
      console.log(OTP.length);
      return;
    }

    // if all states are valid submit the form
    const data = {
      OTP,
    };

    setStatus("loading");
    setTimeout(() => {
      console.log(data);
      // redirect to verify page
      router.push("/");
      setStatus("success");
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
      onChange={() => setStatus("idle")}
    >
      <Input
        label="OTP"
        type="text"
        placeholder="Enter OTP"
        value={OTP}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "" || /^\d+$/.test(value)) {
            setOTP(value);
          }
        }}
      />

      {/* Error status module */}
      {status === "error" && (
        <Error text="Invalid OTP!" className="text-md font-bold h-fit pt-5 " />
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
        {status === "loading" ? "Loading..." : "Verify"}
      </button>
    </form>
  );
}

function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder?: string;
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
          "w-full p-2 pl-3   rounded-md bg-gray-50/5 outline-none focus:ring-1 focus:ring-sky-500"
        )}
      />
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
