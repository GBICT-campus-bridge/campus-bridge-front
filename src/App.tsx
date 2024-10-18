import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import CameraPage from "@/pages/CameraPage";
import ResultPage from "@/pages/ResultPage";
import HistoryPage from "@/pages/HistoryPage";
import DocumentPage from "@/pages/DocumentPage";
import LoadingPage from "@/pages/LoadingPage";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PublicRoute } from "@/components/PublicRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <HomePage /> },

        {
          element: <PrivateRoute />,
          children: [
            { path: "camera", element: <CameraPage /> },
            { path: "loading", element: <LoadingPage /> },
            { path: "result", element: <ResultPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "history", element: <HistoryPage /> },
            { path: "document/:documentId", element: <DocumentPage /> },
          ],
        },
        {
          element: <PublicRoute />,
          children: [
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
          ],
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
