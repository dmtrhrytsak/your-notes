import { Navbar } from 'components/Layout/';
import { useRoutes } from 'utils/hooks/useRoutes';
import { useAuthContext } from 'utils/contexts/auth.context';

const App = () => {
  const { isAuthenticated, hasLoaded } = useAuthContext();
  const routes = useRoutes();

  if (!hasLoaded) {
    return (
      <p className="fixed z-10 top-2/4 left-2/4 text-4xl translate-y-[-50%] translate-x-[-50%] sm:text-5xl">
        Loading...
      </p>
    );
  }

  return (
    <>
      <Navbar withActionPanel={isAuthenticated} />
      <div className="container px-4 lg:px-6">
        <main>{routes}</main>
      </div>
    </>
  );
};

export default App;
