import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header";
import  Footer  from "./components/Footer/Footer";
import { FloatingButton } from "./components/floating_Buttom/floating_buttom";
import  {SideBarShop}  from "./components/sideBarShop/SideBarShop";
import { useState } from "react";
import 'flowbite';

function App() {  

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow"> 
          <Outlet/>
        </main>
      <Footer />
      <FloatingButton onOpenSidebar={() => setIsSidebarOpen(true)} />
      <SideBarShop 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </div>
    
  )
}
export default App
