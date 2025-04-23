const brands = [
  { name: "Vodafone image", image: "assets/images/brands/brand1.png" },
  { name: "Intel image", image: "assets/images/brands/brand2.png" },
  { name: "Tesla image ", image: "assets/images/brands/brand3.png" },
  { name: "AMD image", image: "assets/images/brands/brand4.png" },
  { name: "Talkit image", image: "assets/images/brands/brand5.png" },
];

const Brands = () => {
  return (
    <section className="py-10 ">
      <div className="container">
        <p className="font-normal text-[18px] leading-7 text-[#202430] opacity-50 text-left">
          Các công ty chúng tôi đã giúp phát triển
        </p>
        <div className="w-full mt-5 ">
          <div className="flex flex-wrap items-center justify-start gap-3 sm:justify-between">
            {brands.map((brand, index) => (
              <div key={index} className="w-24 ml-1 h-max">
                <img
                  className="md:h-[100px] h-12 opacity-80 object-contain"
                  src={brand.image}
                  alt={brand.name}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
