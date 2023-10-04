import { useEffect, useState } from "react";

export const useLogin = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("data"));

    if (profile) {
      setData(profile);
    } else {
      window.location.href = "/";
    }
  }, []);

  return data;
};
