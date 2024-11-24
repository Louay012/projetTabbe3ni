import React from 'react'
import Sidebar from './sidebar';


function Income() {
    
  return <div className='flex flex-row  h-screen w-screen overflow-hidden gap-1 '>
              <Sidebar></Sidebar>

              <div className='bg-violet-100 flex-1 m-2 rounded-lg p-4 '>
              <div className=' flex flex-row flex-wrap gap-10'>

              </div>
              </div>
    </div>
}
export default Income;
