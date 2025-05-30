const Cta = () => {
  return (
    <section className="py-10">
      <div className="container overflow-hidden">
        <div className="w-full relative before:absolute before:content-[''] before:h-[700px] before:rotate-[60deg]  before:w-[100px] before:bg-white before:-top-[250px] before:-left-[200px] grid md:grid-cols-2 bg-primaryColor lg:pt-20 lg:px-20 before:conten-[''] after:absolute after:-bottom-[350px] after:-z-10 after:rotate-[60deg] after:right-0 after:h-[700px] after:w-[100px] after:bg-white z-10 pt-20 pb-0 px-9">
          {/* text  */}
          <div className="flex flex-col items-start w-full gap-2">
            <h2 className="font-semibold text-4xl lg:text-5xl font-clashDisplay leading-[1.085] text-blue-50">
              Bắt đầu đăng tải
              <br className="hidden sm:block" /> việc làm của bạn
              <br className="hidden sm:block" />
              ngay hôm nay
            </h2>
            <p className="w-5/6 text-base font-medium text-blue-50/80">
              Nếu bạn đang khó khăn chúng tôi tìm người giúp đỡ bạn.
            </p>
            <button className="py-3 px-5 text-primaryColor font-semibold hover:scale-[1.02] transition duration-300 hover:opacity-90 cursor-pointer bg-blue-50  rounded-sm">
              Đăng ký miễn phí
            </button>
          </div>
          {/* image  */}
          <div className="self-end">
            <div className="overflow-hidden">
              <img src={"assets/images/cta/findjob2.webp"} alt="Dashboard image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
