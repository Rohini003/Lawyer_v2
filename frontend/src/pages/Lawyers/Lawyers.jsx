import Lawyercard from "../../component/Lawyer/LawyerCard";
import { lawyer } from "../../assets/data/lawyer";
import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../component/loader/Loading";
import Error from "../../component/Error/Error";
import { useEffect, useState } from "react";

const Lawyers = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());

    console.log("handle search");
  };

  useEffect(() => {

    const timeout = setTimeout(() =>{
      setDebounceQuery(query)
    },700)

    return()=> clearTimeout(timeout)
  },[query])

  const { 
    data: lawyers, 
    loading, 
    error } = useFetchData(`${BASE_URL}/lawyers?query=${debounceQuery}`);
    console.log(lawyers)
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Lawyer</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer
                 placeholder:text-textColor"
              placeholder="Search Lawyer by name or specification"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-[30px] lg:mt-[55px]">
              {lawyer.map((lawyer) => (
                <Lawyercard key={lawyer.id} lawyer={lawyer} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Lawyers;

// import React, { useEffect, useState } from "react";
// import LawyerCard from "../../component/Lawyer/LawyerCard";
// import { BASE_URL } from "../../../config";
// import useFetchData from "../../hooks/useFetchData";
// import Loader from "../../component/loader/Loading";
// import Error from "../../component/Error/Error";

// const Lawyers = () => {
//   const [query, setQuery] = useState("");
//   const [debounceQuery, setDebounceQuery] = useState("");

//   const handleSearch = () => {
//     setDebounceQuery(query.trim());
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setDebounceQuery(query.trim());
//     }, 700);

//     return () => clearTimeout(timeout);
//   }, [query]);

//   const { data: lawyers, loading, error } = useFetchData(
//     `${BASE_URL}/lawyers?query=${debounceQuery}`
//   );

//   return (
//     <>
//       <section className="bg-[#fff9ea]">
//         <div className="container text-center">
//           <h2 className="heading">Find a Lawyer</h2>
//           <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
//             <input
//               type="search"
//               className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
//               placeholder="Search Lawyer by name or specification"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <button
//               className="btn mt-0 rounded-[0px] rounded-r-md"
//               onClick={handleSearch}
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </section>
//       <section>
//         <div className="container">
//           {loading && <Loader />}
//           {error && <Error />}
//           {!loading && !error && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-[30px] lg:mt-[55px]">
//               {lawyers.map((lawyer) => (
//                 <LawyerCard key={lawyer.id} lawyer={lawyer} />
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Lawyers;

