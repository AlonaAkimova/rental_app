import SectionHeaders from "./SectionHeaders";
import MenuItem from "./menu/MenuItem";

interface HomeMenuProps {}
const HomeMenu: React.FC<HomeMenuProps> = (props) => {
  return (
    <>
      <section className="">
        <div className="text-center mb-4">
          <SectionHeaders subHeader={"Check Out"} mainHeader={"Store"} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
      </section>
    </>
  );
};

export default HomeMenu;
