import Carousel from "../../components/Carousel/Carousel";

const Home = () => {
  return (
    <div className=" bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <img src="/images/slider.webp" alt="banner" className="w-full" />
      <div className="flex justify-center p-4 gap-10 flex-wrap">
        <Carousel category="beauty"/>
        <Carousel category="furniture"/>
        <Carousel category="groceries"/>
        <Carousel category="fragrances"/>
      </div>
    </div>
  );
};

export default Home;
