import {Button} from "@/components/Button";
import {defaults} from "@/module/Button.module";
export default async function Home() {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return (
      <header className="dark:bg-gradient-to-r from-pink-500 to-violet-500 bg-gradient-to-r from-pink-500/80 to-violet-500/80 text-white flex flex-row justify-center text-center h-dvh">
          <section id="hero" className="py-40 space-y-20">
              <div>
                    <h2 className="text-6xl">
                  Welcome to Asto Shop
                    </h2>
              </div>
              <Button name={"Let Buy"} link={"/product"} button={defaults}/>
          </section>
      </header>
  );
}
