import { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { to: '/user-dashboard/home', icon: HomeIcon, label: 'Home' },
        { to: '/user-dashboard/store', icon: StoreIcon, label: 'Store' },
        { to: '/user-dashboard/orders', icon: OrdersIcon, label: 'Orders' },
        { to: '/user-dashboard/reseller-referrals', icon: ReferralsIcon, label: 'Reseller Referrals' },
        { to: '/user-dashboard/balance', icon: BalanceIcon, label: 'Balance' },
        { to: '/user-dashboard/boost-request', icon: BoostIcon, label: 'Boost Request' },
        { to: '/user-dashboard/settings', icon: SettingsIcon, label: 'Settings' },
    ];

    return (
        <aside className='bg-[#f8fafc] col-span-2 h-screen sticky left-0 top-0 overflow-auto p-4 lg:p-5'>
            {/* Hamburger Menu Button for Mobile View */}
            <div className="lg:hidden flex justify-center mb-4">
                <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none">
                    {isOpen ? <CloseIcon className="text-2xl" /> : <MenuIcon className="text-2xl" />}
                </button>
            </div>
            <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
                {/* company name ------------ */}
                <div className='mb-10 hidden md:block'>
                    <a href='/' className='text-2xl font-semibold text-gray-800'>Elevate Mart</a>
                </div>
                <nav className="flex flex-col gap-2">
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <a
                            key={to}
                            href={to}
                            className="md:p-3 bg-white rounded-sm border shadow-sm font-semibold text-black transition-all flex gap-2"
                        >
                            <div className='mx-auto md:mx-0 md:truncate md:flex gap-2'>
                                <Icon className="shrink-0 size-6" />
                                <span className="truncate hidden md:block">{label}</span>
                            </div>
                        </a>
                    ))}
                </nav>
              
            </div>
        </aside>
    );
};

const HomeIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20v-6h4v6m5-3v-9a2 2 0 00-.854-1.617L12 3 6.854 6.383A2 2 0 006 8v9m0 0v6m5-6h4v6M5 20h14" />
    </svg>
);

const StoreIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16v2H4V6zM4 10h16v2H4v-2zM4 14h16v2H4v-2z" />
    </svg>
);

const OrdersIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 8h14M5 16h14" />
    </svg>
);

const ReferralsIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8V6m0 10v-2M12 3a9 9 0 110 18 9 9 0 010-18z" />
    </svg>
);

const BalanceIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8V6m0 10v-2m-6 4h12M6 8h12" />
    </svg>
);

const BoostIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11V5l7 7h-4v6H6v-6H2l7-7z" />
    </svg>
);

const SettingsIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 5.75L6.5 12h7l-3.25-6.25zm0 12.5L13 12H6.5l3.25 6.25zm9-7.5L15 12h7l-3.25-6.25zm-12.5 0L6.5 12h7l-3.25-6.25z" />
    </svg>
);

const QuestionMarkIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 14h.01m-.01-8a2 2 0 112 2c0 1-1 2-1 2h-1v1m0 4h.01" />
    </svg>
);

const MenuIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default Sidebar;
