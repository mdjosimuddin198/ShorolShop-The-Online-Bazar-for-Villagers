const OverViewLoading = () => {
  return (
    <main className="container px-4 py-8 animate-pulse">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-gray-200 rounded-lg shadow-md flex flex-col justify-center px-6"
          >
            <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
            <div className="h-8 w-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-gray-200 rounded-lg p-4">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-gray-500 pb-3"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default OverViewLoading;
