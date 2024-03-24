import Lawyercard from "../../component/Lawyer/LawyerCard";
import { lawyer } from "../../assets/data/lawyer";

const Lawyers = () => {
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
              placeholder="Search Doctor"
            />
          <button className="btn mt-0 rounded-[0px] rounded-r-md">
            Search
          </button> 
          </div>
        </div>
      </section>
      <section>
        <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-[30px] lg:mt-[55px]">
            {lawyer.map(lawyer => (
                <Lawyercard key={lawyer.id} lawyer={lawyer} />
            ))}
        </div>

        </div>
      </section>
    </>
  );
};

export default Lawyers;
