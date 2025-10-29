const ManagProductsLoading = () => {
  return (
    <div className="py-2 animate-pulse">
      <div className="text-4xl text-center text-gray-400 font-semibold py-10">
        Loading Products...
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-3 text-left">Num</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td className="p-3">
                  <div className="w-4 h-4 bg-gray-700 rounded"></div>
                </td>
                <td className="p-3">
                  <div className="w-16 h-16 bg-gray-700 rounded"></div>
                </td>
                <td className="p-3">
                  <div className="w-32 h-4 bg-gray-700 rounded"></div>
                </td>
                <td className="p-3">
                  <div className="w-20 h-4 bg-gray-700 rounded"></div>
                </td>
                <td className="p-3 flex gap-3">
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagProductsLoading;
