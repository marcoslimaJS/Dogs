import React from "react";
import { useState, useEffect } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import { PASSWORD_RESET } from "../../api";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const LoginPasswordReset = () => {
  const [login, setLogin] = useState("");
  const [key, setKey] = useState("");
  const password = useForm();
  const { loading, error, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");
    if (key) setKey((prevKey) => (prevKey = key));
    if (login) setLogin((prevLogin) => (prevLogin = login));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) {
        navigate("/login");
      }
    }
  };

  return (
    <section className="animeLeft">
      <Head
        title="Resete a senha"
        description="Página para resetar a senha da sua conta."
      />
      <h1 className="title">Reset a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
