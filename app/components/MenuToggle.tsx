const MenuToggle = () => {
  const bars = (new Array(3) as any).fill();

  return (
    <ul className={`menu w-12 space-y-3`}>
      {bars.map((_bar, index) => {
        return (
          <li
            key={index}
            className={`menu-bar h-1 w-12 rounded-sm bg-gray-700 transition-all menu-bar-${
              index + 1
            }`}
          ></li>
        );
      })}
    </ul>
  );
};

export default MenuToggle;
