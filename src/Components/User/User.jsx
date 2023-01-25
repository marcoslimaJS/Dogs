import React from "react";
import { Route, Routes } from "react-router-dom";
import UserHeader from "./UserHeader";
import Feed from "../Feed/Feed";
import UserPhotoPost from "./UserPhotoPost";
import UserStats from "./UserStats";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import NotFound from "../NotFound";
import Head from "../Helper/Head";

const User = () => {
  const { data } = useContext(UserContext);

  return (
    <section className="container">
      <Head
        title="Minha Conta"
        description="Conta do site Dogs, Contendo um feed com todas as publicações do usuário."
      />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
