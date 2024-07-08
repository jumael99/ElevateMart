// components/Layout.js
import Header from "./Header";
import Footer from "./Footer";
import AdminNavbar from "./Admin/Admin-Nabvar";
import AdminFooter from "./Admin/Admin-Footer";
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');

  if (isAdminPage) {
    return (
      <div className="flex flex-col min-h-screen">
        <AdminNavbar />
        <main className="flex-grow">{children}</main>
        <AdminFooter />
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
