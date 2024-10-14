import axios from "axios";

import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";

import HomeHeader from "@/components/HomeHeader";
import { Flex, TextField, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

type FormValues = {
  id: string;
  password: string;
};

const schema = yup.object().shape({
  id: yup.string().required("아이디를 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});
export default function LoginPage() {
  const { t } = useTranslation("page");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const formData = {
      memberId: data.id,
      password: data.password,
    };
    try {
      const response = await axios.post(apiUrl + "/public/login", formData);
      console.log(response.headers.authorization);
      if (response.status === 200) {
        localStorage.setItem("token", response.headers.authorization);
        localStorage.setItem("nickname", response.data.name);
        alert("로그인 성공!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <HomeHeader />
      <div className="flex w-lvw h-lvh items-center">
        <form className="w-full" onSubmit={onSubmit}>
          <Flex direction="column" gap="2" className="w-full items-center">
            <h1 className="font-bold text-2xl mb-4 text-sky-400">
              {t("Login")}
            </h1>
            <TextField.Root
              placeholder={t("ID")}
              className="w-4/5 h-[50px] rounded-xl shadow-clay-white-sm"
              {...register("id")}
            />
            {errors.id && (
              <p className="text-xs text-red-500 text-left w-4/5 mb-2 px-2">
                {errors.id.message}
              </p>
            )}
            <TextField.Root
              placeholder={t("Password")}
              type="password"
              className="w-4/5 h-[50px] rounded-xl shadow-clay-white-sm"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500 text-left w-4/5 mb-2 px-2">
                {errors.password.message}
              </p>
            )}
            <Button
              variant="solid"
              className="w-4/5 h-[50px] mt-4 bg-sky-400 rounded-xl shadow-clay-blue-sm"
            >
              {t("Login")}
            </Button>
            <Link to="/signup" className="underline mt-2 text-slate-400">
              {t("SignUp")}
            </Link>
          </Flex>
        </form>
      </div>
    </>
  );
}
