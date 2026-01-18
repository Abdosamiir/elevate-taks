// import { ComponentExample } from "@/components/component-example";
import Header from "./components/header/Header";
import HomePage from "./pages/home/HomePage";
import photo from "@/app/assets/imgs/bg-main.jpg";

export function App() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${photo})`,
      }}
    >
      <div className="min-h-screen mx-auto w-3/4 py-4">
        <Header />
        <section className="container mx-auto px-4">
          <HomePage />
        </section>
      </div>
    </main>
  );
}

export default App;
