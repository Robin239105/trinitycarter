import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { RedirectManager } from './shared/components/RedirectManager'
import { LocaleProvider } from './shared/hooks/useLocale'

// Lazy loaded pages for performance enhancement
const TrinityElitePage = lazy(() => import('./trinity/pages/TrinityElitePage.jsx'))
const TrinityGiveawayPage = lazy(() => import('./trinity/pages/TrinityGiveawayPage.jsx'))
const TrinityFeedbackPage = lazy(() => import('./trinity/pages/TrinityFeedbackPage.jsx'))

// Loading fallback for non-blocking paint
const PageLoader = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-[500]">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
);

// Supported locale segments
const regions = ['us', 'uk', 'au', 'ca', 'fr', 'de'];

const AppLayout = () => (
  <LocaleProvider>
    <Suspense fallback={<PageLoader />}>
      <RedirectManager />
      <Outlet />
    </Suspense>
  </LocaleProvider>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // Trinity Carter (Root)
      { path: '/', element: <TrinityElitePage /> },
      ...regions.map(r => ({ path: `/${r}`, element: <TrinityElitePage /> })),
      
      // Trinity Additional
      { path: '/giveaway', element: <TrinityGiveawayPage /> },
      ...regions.map(r => ({ path: `/giveaway/${r}`, element: <TrinityGiveawayPage /> })),
      { path: '/feedback', element: <TrinityFeedbackPage /> },
      ...regions.map(r => ({ path: `/feedback/${r}`, element: <TrinityFeedbackPage /> })),
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
