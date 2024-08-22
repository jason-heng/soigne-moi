export default function page() {
  const testNumber = 10

  return (
    <div className='flex w-screen h-screen bg-red-200'>
      <div className='w-[200px] bg-blue-200 h-screen'>
        nav bar
      </div>
      <div className='flex-1 bg-green-200 flex p-5 flex-col gap-5'>
        <p>Title</p>
        <div className='flex flex-1 bg-yellow-200 gap-5 min-h-0'>
          <div className='flex flex-col flex-1 bg-orange-200 gap-3 overflow-y-auto'>
            {[...Array(testNumber)].map((_, i) => (
              <div key={i} className='bg-red-200 p-4'>test</div>
            ))}
          </div>
          <div className='bg-pink-200 h-full w-[200px]'></div>
        </div>
      </div>
    </div>
  )
}
