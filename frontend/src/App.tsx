import type { FC } from 'react';
import React, { Suspense, useRef, useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { HiLightningBolt } from 'react-icons/hi';
import { HiMenuAlt1 } from 'react-icons/hi';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { DarkThemeToggle, Navbar, Sidebar, Spinner } from 'flowbite-react';
import { routes } from './routes';

const App: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Navbar className="border-b" fluid>
        <Link to="/">
          <div className="flex items-center">
            <HiMenuAlt1
              className="mr-6 h-6 w-6 cursor-pointer text-gray-600 dark:text-gray-400"
              onClick={() => setCollapsed(!collapsed)}
            />
            <HiLightningBolt className="h-7 w-7 mr-4 text-yellow-300" />
            <span className="text-xl font-semibold dark:text-white">LINK: Lightning Contacts</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <a
            className="cursor-pointer rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            href="https://github.com/toshmanuel/ln-link"
            title="Github Repository"
            target="_blank"
            rel="noreferrer"
          >
            <BsGithub className="h-5 w-5" />
          </a>
          <DarkThemeToggle />
        </div>
      </Navbar>
      <div className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
        <Sidebar collapsed={collapsed}>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {routes.map(({ href, icon, title }, key) => (
                <Sidebar.Item
                  key={key}
                  icon={icon}
                  as={Link}
                  to={href}
                  active={href === pathname}
                  onClick={() => mainRef.current?.scrollTo({ top: 0 })}
                >
                  {title}
                </Sidebar.Item>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <main className="flex-1 overflow-auto py-6 md:px-20" ref={mainRef}>
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <Routes>
              {routes.map(({ href, component: Component }) => (
                <Route key={href} path={href} element={Component} />
              ))}
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;
