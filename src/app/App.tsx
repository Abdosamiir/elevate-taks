import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import photo from "@/app/assets/imgs/bg-main.jpg";

export function App() {
  return (
    <main
      className="min-h-screen bg-cover bg-top bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${photo})`,
      }}
    >
      <div className="min-h-screen flex flex-col gap-6 mx-auto w-3/4 py-4">
        <Header />
        <section className="container mx-auto">
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default App;
