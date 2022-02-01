import React from "react";
import Profile from "../../components/profile";
import Sidebar from "../../components/sidebar";
import { getPeopleData } from "../../fakeAPI";
import usePageMidpoint from "../../hooks/use-page-midpoint";
import getClosest from "../../utils/get-closest-number";

interface AxisAndRefs {
  profileRef: HTMLDivElement;
  yAxis: number;
  id: string;
  name: string;
}

interface PeopleDataTypes {
  id: string;
  name: string;
  age: number;
  occupation: string;
  image: string;
}

const Home = () => {
  const [scrollYAndRefsArr, setScrollYArr] = React.useState<AxisAndRefs[]>([]);
  const [peopleData, setPeopleData] = React.useState<PeopleDataTypes[]>();
  const scrollY = usePageMidpoint();
  const numberOfPeople = peopleData?.length;

  const getData = async () => {
    try {
      const data = await getPeopleData();
      setPeopleData(data);
    } catch (error) {
      console.log("error!!!");
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const sortByYAxis = (a, b) => {
    if (a.yAxis < b.yAxis) {
      return -1;
    }
    if (a.yAxis > b.yAxis) {
      return 1;
    }
    return 0;
  };

  const addYAxisToArr = ({ yAxis, profileRef, id, name }: AxisAndRefs) => {
    setScrollYArr((prev?: AxisAndRefs[]) =>
      prev?.length
        ? [...prev, { yAxis, profileRef, id, name }].sort(sortByYAxis)
        : [{ yAxis, profileRef, id, name }]
    );
  };

  const scrollYArr =
    scrollYAndRefsArr?.length === numberOfPeople &&
    typeof numberOfPeople === "number" &&
    scrollYAndRefsArr?.map(({ yAxis }) => yAxis);

  const focusedSidebarName =
    scrollYArr?.length === numberOfPeople &&
    typeof numberOfPeople === "number" &&
    getClosest(scrollYArr, scrollY);

  return (
    <div className='home'>
      {scrollYAndRefsArr?.length === numberOfPeople ? (
        <Sidebar
          content={scrollYAndRefsArr}
          focusedSidebarName={focusedSidebarName}
        />
      ) : null}
      <div className='home-profiles'>
        {peopleData?.length
          ? peopleData.map((person, index) => (
              <Profile
                key={index}
                id={person.id}
                name={person.name}
                age={person.age}
                occupation={person.occupation}
                image={person.image}
                addYAxisToArr={addYAxisToArr}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Home;
