export default function ClockWeather() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
      {/* Large Blue Clock Widget */}
      <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-300 to-blue-500 rounded-2xl p-4 text-white flex flex-col justify-between shadow">
        <div className="text-sm">Thu 26</div>
        <div className="text-5xl font-bold leading-tight">20<br />08</div>
      </div>

      {/* Analog Clock */}
      <div className="bg-primary rounded-2xl flex items-center justify-center shadow p-4">
        🕒 {/* Replace with analog clock or image */}
      </div>

      {/* Date Box */}
      <div className="bg-primary rounded-2xl text-center shadow-sm p-4">
        <div className="text-red-500 text-sm">Thursday</div>
        <div className="text-2xl font-bold">26</div>
      </div>

      {/* Wide Clock Box */}
      <div className="col-span-3 bg-white shadow-sm rounded-2xl p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">20:08</div>
        <div className="text-sm text-right text-gray-600">
          <div>12/26</div>
          <div className="text-blue-500">Thursday</div>
        </div>
      </div>
    </div>
  );
}
