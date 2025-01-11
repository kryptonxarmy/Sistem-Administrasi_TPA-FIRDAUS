import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 ml-64">
                <Navbar />
                <main className="p-8 flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;