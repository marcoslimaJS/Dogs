import React from "react";
import Head from "../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import { useEffect } from "react";
import { STATS_GET } from "../../api";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");
      const { url, options } = STATS_GET(token);
      await request(url, options);
    };
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data) {
    return (
      <React.Suspense fallback={<div></div>}>
        <Head
          title="Estatísticas"
          description="Pagina contendo todas as estatísticas das publicações do usuário."
        />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  } else {
    return null;
  }
};

export default UserStats;
