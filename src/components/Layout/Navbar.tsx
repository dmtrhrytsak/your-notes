import ActionPanel from 'components/UI/ActionPanel';

type NavBarProps = {
  withActionPanel: boolean;
};

const Navbar: React.FC<NavBarProps> = ({ withActionPanel }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-1 lg:px-6 bg-white border-[1px] border-gray-200">
      <h1 className="text-2xl font-semibold">Notes</h1>

      {withActionPanel && <ActionPanel />}
    </nav>
  );
};

export default Navbar;
