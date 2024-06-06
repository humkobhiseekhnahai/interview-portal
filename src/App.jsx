
import "./index.css"
import SideBar from './components/sidebar'
import SelfieCamera from "./components/selfiecamera"



function App() {


  return (
    <div className='w-screen h-screen bg-gradient-to-tr from-lime-200 from-0% via-neutral-900 via-25% to-teal-500'>
      {/* background div */}
      <div className='grid grid-cols-[10vh_165vh] grid-rows-[10vh_89vh]'>
        <SideBar/>
        <div className='col-start-2 row-start-2 rounded-md  backdrop-blur-xl bg-neutral-900/70 drop-shadow-xl border-neutral-900 border-2 '>
          {/* card component */}
          <SelfieCamera/>
          
        </div>

      </div>
    </div>
  )
}

export default App
