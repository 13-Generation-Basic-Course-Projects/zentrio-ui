export function StackedUser() {
  return (
    <div className="flex items-center space-x-[-14px]">
      <img
        src="https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg"
        alt="User 1"
        className="w-8 h-8 rounded-full border-2 border-white shadow"
      />
      <img
        src="https://i.pinimg.com/736x/24/da/2b/24da2becc842bf52b464a2dde81087b5.jpg"
        alt="User 2"
        className="w-8 h-8 rounded-full border-2 border-white shadow"
      />
      <img
        src="https://i.pinimg.com/736x/62/aa/2f/62aa2f605b932349808c41c6fadd76b6.jpg"
        alt="User 3"
        className="w-8 h-8 rounded-full border-2 border-white shadow"
      />
      <img
        src="https://i.pinimg.com/736x/b8/b4/d9/b8b4d9220922fffbd151103ef1c215f6.jpg"
        alt="User 4"
        className="w-8 h-8 rounded-full border-2 border-white shadow"
      />
      <div className="w-8 h-8 rounded-full bg-gray-300 text-btn-sm flex items-center justify-center border-2 border-white shadow">
        +4
      </div>
    </div>
  );
}
