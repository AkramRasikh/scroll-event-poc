import React from "react";
import avatarImage from "../../avatar-man.png";

interface addYAxisToArr {
  id: string;
  name: string;
  yAxis: number;
  profileRef?: HTMLDivElement;
}

interface ProfileProps {
  id: string;
  name: string;
  age: number;
  occupation: string;
  image?: string;
  addYAxisToArr: ({ yAxis, profileRef, id, name }: addYAxisToArr) => void;
}

const Profile = ({
  id,
  name,
  age,
  occupation,
  addYAxisToArr,
}: ProfileProps) => {
  const profileRef = React.useRef(null);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (profileRef?.current && loaded) {
      const { height } = profileRef?.current?.getBoundingClientRect();
      const halvedHeight = height / 2;
      const finalScrollHeight = profileRef?.current.offsetTop - halvedHeight;
      const refReference = profileRef.current;

      setLoaded(false);
      addYAxisToArr({
        yAxis: finalScrollHeight,
        profileRef: refReference,
        id,
        name,
      });
    }
  }, [profileRef?.current, loaded]);

  return (
    <div
      className='profile-container'
      data-testid={`profile-${name}`}
      ref={profileRef}
    >
      <div>
        <img
          src={avatarImage}
          alt={`image-${name}`}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div>
        <p>
          name: <span>{name}</span>
        </p>
        <p>
          age: <span>{age}</span>
        </p>
        <p>
          occupation: <span>{occupation}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
