import axios from "axios";

import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";

import { Flex, TextField, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

type FormValues = {
  nickname: string;
  id: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  nickname: yup
    .string()
    .required("닉네임을 입력해주세요.")
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10자 이하여야 합니다."),

  id: yup
    .string()
    .required("아이디를 입력해주세요.")
    .min(4, "아이디는 최소 4자 이상이어야 합니다.")
    .max(20, "아이디는 최대 20자 이하여야 합니다.")
    .matches(/^[a-zA-Z\d]+$/, "아이디에는 영문과 숫자만 입력할 수 있습니다."),

  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
      "비밀번호는 8자 이상, 영문, 숫자를 포함해야 합니다."
    ),

  confirmPassword: yup
    .string()
    .required("비밀번호 확인을 입력해주세요.")
    .oneOf([yup.ref("password")], "비밀번호와 일치하지 않습니다."),
});

export default function SignupPage() {
  const { t } = useTranslation("page");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const formData = {
      memberId: data.id,
      password: data.password,
      name: data.nickname,
    };
    try {
      const response = await axios.post(apiUrl + "/public/signup", formData);
      console.log(response);
      if (response.status === 200) {
        alert("회원가입 성공!");
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error);
      const response = error.response.data;
      if (response.status === 409 && response.message === "Member EXISTS") {
        setError("id", {
          type: "manual",
          message: "이미 존재하는 아이디입니다.",
        });
      }
    }
  });

  return (
    <>
      <div className="flex w-lvw h-lvh items-center">
        <form className="w-full" onSubmit={onSubmit}>
          <Flex direction="column" gap="2" className="w-full items-center">
            <h1 className="font-bold text-2xl mb-4 text-sky-400">
              {t("SignUp")}
            </h1>
            <TextField.Root
              placeholder={t("Nickname")}
              className="w-4/5 h-[50px] rounded-xl shadow-clay-white-sm"
              {...register("nickname")}
            />
            {errors.nickname && (
              <p className="text-xs text-red-500 text-left w-4/5 mb-2 px-2">
                {errors.nickname.message}
              </p>
            )}
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
              className="w-4/5 h-[50px] rounded-xl shadow-clay-white-sm"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500 text-left w-4/5 mb-2 px-2">
                {errors.password.message}
              </p>
            )}
            <TextField.Root
              placeholder={t("ConfirmPassword")}
              className="w-4/5 h-[50px] rounded-xl shadow-clay-white-sm"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 text-left w-4/5 mb-2 px-2">
                {errors.confirmPassword.message}
              </p>
            )}
            <Button
              type="submit"
              variant="solid"
              className="w-4/5 h-[50px] mt-4 bg-sky-400 rounded-xl shadow-clay-blue-sm"
            >
              {t("SignUp")}
            </Button>
            <Link to="/login" className="underline mt-2 text-slate-400">
              {t("Login")}
            </Link>
          </Flex>
        </form>
      </div>
    </>
  );
}
