import React from "react";
import { services } from "../assets/data/services";
import ServiceCard from "../component/Services/ServiceCard";

const Services = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px]">
        {services.map((item, index) => (
          <ServiceCard item={item} index={index} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
