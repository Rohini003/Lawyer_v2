import { BASE_URL } from "../../../config";
import { lawyer } from "./../../assets/data/lawyer";
import useFetchData from "../../hooks/useFetchData";
import LawyerCard from "./LawyerCard";
import Loader from "../loader/Loading";
import Error from "../Error/Error";

const LawyerList = () => {
    const {
        data: lawyers,
        loading,
        error,
    } = useFetchData(`${BASE_URL}/lawyers`);

    return (
        <>
            {loading && <Loader />}
            {error && <Error />}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                    {lawyer.map((lawyer) => (
                        <LawyerCard key={lawyer.id} lawyer={lawyer} />
                    ))}
                </div>
            )}
        </>
    );
};

export default LawyerList;
