import classNames from "classnames";

interface SidebarButtonProps {
  text: string;
  isFocused?: boolean;
  onClick?: () => void;
}

const SidebarButton = ({
  text,
  isFocused = false,
  onClick,
}: SidebarButtonProps) => {
  const conditionalStyles = classNames({
    "sidebar-profile-selected": isFocused,
  });
  return (
    <div className='sidebar-button-container'>
      <button className={conditionalStyles} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default SidebarButton;
