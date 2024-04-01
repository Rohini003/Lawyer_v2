import React, { useState } from "react";
import Loader from "../../component/loader/Loading";
import Error from "../../component/Error/Error.jsx";
import useGetProfile from "../../hooks/useFetchData.jsx";
import { BASE_URL } from "../../../config";
import Tabs from "../lawyer-account/Tabs.jsx";

const Dashboard = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/lawyers/profile/me`
  );

  const [tab,setTab] = useState('overview')

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
