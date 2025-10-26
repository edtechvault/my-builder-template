import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="relative w-full max-w-sm bg-[#D9D9D9] rounded-lg shadow-lg aspect-[278/207] flex flex-col items-center justify-between p-6">
        <div className="self-start mt-2 ml-4">
          <span className="text-black font-normal text-xs leading-normal" style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
            zobi
          </span>
        </div>
        
        <div className="mb-8">
          <svg 
            className="w-[73px] h-[28px]" 
            viewBox="0 0 73 28" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="36.5" cy="14" rx="36.5" ry="14" fill="#D73737"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default App
