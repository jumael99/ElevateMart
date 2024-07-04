// components/Layout.js
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');

  if (isAdminPage) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
