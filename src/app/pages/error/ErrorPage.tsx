import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import photo from "@/app/assets/imgs/bg-main.jpg";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;
  let errorStatus: number | string = "Error";

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText || "Something went wrong";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "An unexpected error occurred";
  }

  return (
    <main
      className="min-h-screen bg-cover bg-top bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${photo})`,
      }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center mx-auto md:w-3/4 p-4">
        <div className="text-center backdrop-blur-md bg-white/30 p-8 sm:p-12 rounded-2xl shadow-lg max-w-md w-full border border-white/20">
          <h1 className="text-7xl sm:text-8xl font-bold text-[#2F80ED] mb-4 drop-shadow-lg">
            {errorStatus}
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            Oops! Page not found
          </h2>
          <p className="text-gray-700 mb-6">{errorMessage}</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-[#2F80ED] text-white font-medium rounded-full hover:bg-[#2563eb] transition-colors shadow-md"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
