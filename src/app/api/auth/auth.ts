type SignUP = {
  name: string;
  username: string;
  email: string;
  pass: string;
};
type LoginData = {
  username: string;
  email: string;
  pass: string;
  remember: boolean;
  method: "username" | "email";
};

export async function signup(data: SignUP) {
  try {
    const response = await fetch("/api/post", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    return error;
  }
}

export async function login(data: LoginData) {
  try {
    const response = await fetch("/api/post", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    return error;
  }
}

export async function resetPassword(data: { email: string }) {
  try {
    const response = await fetch("/api/post", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    return error;
  }
}
