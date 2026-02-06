import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
const api = "http://localhost:4000/api/v1";
export const AppContext = createContext();
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(false);
  const [allUserBlogs, setAllUserBlogs] = useState(null);
  const [userBlogs, setUserBlogs] = useState(null);
  const [authData, setAuthData] = useState({
    email: null,
    otp: null,
  });
  const mockInitialUser = {
    bio: "Full-stack developer passionate about performance and design.",
    about:
      "I thrive on building scalable and user-friendly web applications, focusing on clean code and user-centric design principles.",
    address: "456 Mockingbird Lane, Tech City, CA",
    socialMedia: [
      { mediaName: "Facebook", link: "https://facebook.com/janesmith" },
      { mediaName: "Twitter", link: "https://twitter.com/janesmithdev" },
    ],
  };
  const [emailA, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [yourBlogs, setYourBlogs] = useState(null);
  const navigate = useNavigate();

  // Load user data once on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUserData(parsedUser);
      setProfile(parsedUser.profile);
      console.log("Loaded User  data ", parsedUser);
    }
  }, []);

  // Stabilize fixedLogout function
  const fixedLogout = useCallback(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser?.token) return savedUser.token;
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!cookieToken) {
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    fixedLogout();
  }, [fixedLogout]); // Dependency is stable due to useCallback

  // 🛑 Memoized action functions using useCallback
  const signUp = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const res = await axios.post(`${api}/registere`, data);
        console.log("Respose of data signup: ", res);
        navigate("/login");
      } catch (e) {
        console.log("Error message : ", e.message);
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const loginFunction = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const res = await axios.post(`${api}/login`, data, {
          withCredentials: true,
        });
        console.log("Respose of data : ", res);
        if (res.request.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUserData(res.data.user);
          console.log(res.data.user, "logged in user");
        }
        console.log(res.message);
        navigate("/");
      } catch (e) {
        // console.log(e)
        console.log("Error message : ", e.response.data.message);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    localStorage.clear();
    sessionStorage.clear();
    setUserData(null);
    try {
      const res = await axios.post(
        `${api}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Respose of data : ", res);
      navigate("/login");
    } catch (e) {
      console.log("Error message : ", e.message);
    }
  }, [navigate]);

  // 🛑 Stabilized editProfile
  const editProfile = useCallback(async (data) => {
    try {
      setLoading(true);
      console.log("Data to set", data);
      const res = await axios.post(`${api}/profiles`, data, {
        withCredentials: true,
      });
      // 🛑 State Replacement: Directly set the profile to the response data
      setProfile(res.data);
      console.log("Respose of data : ", res);
    } catch (e) {
      console.log("Error message : ", e.message);
    } finally {
      setLoading(false);
    }
  }, []); // Stable function reference

  const changePassword = useCallback(async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${api}/changePassword`, data);
      console.log("Respose of data : ", res);
    } catch (e) {
      console.log("Error message : ", e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (data) => {
    try {
      setLoading(true);
      console.log("first");
      const res = await axios.post(`${api}/forgetPassword`, data);
      console.log("final end ");
      console.log("Respose of data : ", res.config);
      navigate("/varifyOTP"); // ✅ only after success
    } catch (e) {
      // console.log(e)
      console.log("Error message : ", e.response.data.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyPasswordOTP = useCallback(async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${api}/handleVarifyOtp`, data);
      console.log("Respose of data : ", res);
      navigate("/resetPassword");
    } catch (e) {
      console.log("Error message : ", e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${api}/handleResetPassword`, data);
        navigate("/login");
      console.log("Respose of data : ", res);
    } catch (e) {
      console.log("Error message : ", e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBlog = useCallback(async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${api}/create-blog`, data, {
        withCredentials: true,
      });
      console.log("Respose of data : ", res);
    } catch (e) {
      console.log("Error message : ", e.message);
    } finally {
      setLoading(false);
    }
  }, []);
  const getAllBlog = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/getAllBlogs`, {
        withCredentials: true,
      });
      setAllUserBlogs(res.data);
      console.log("response callback ", res);
      console.log("Respose of data : ", res.data);
    } catch (e) {
      console.log("Error message : ", e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getYourBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/usersBLog`, {
        withCredentials: true,
      });
      setYourBlogs(res.data.userAllBlog);
      console.log("Respose of data : ", res);
    } catch (e) {
      console.log("Error message : ", e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🛑 Memoize the context value object
  // This is the MOST important step to prevent unnecessary re-renders.
  const value = useMemo(
    () => ({
      getYourBlogs,
      getAllBlog,
      emailA,
      setEmail,
      authData,
      setAuthData,
      loading,
      color,
      setColor,
      setLoading,
      signUp,
      loginFunction,
      userData,
      logout,
      changePassword,
      forgotPassword,
      verifyPasswordOTP,
      resetPassword,
      editProfile,
      profile,
      setProfile,
      createBlog,
      setYourBlogs,
      yourBlogs,
      allUserBlogs,
    }),
    [
      authData,
      loading,
      color,
      userData,
      profile,
      allUserBlogs,
      yourBlogs,
      getAllBlog,
      // The setter functions (setEmail, setAuthData, setColor, etc.)
      // are intrinsically stable and don't strictly need to be listed.
      // The action functions (signUp, loginFunction, etc.) are stable due to useCallback.
      // We list all state variables that can change:
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
