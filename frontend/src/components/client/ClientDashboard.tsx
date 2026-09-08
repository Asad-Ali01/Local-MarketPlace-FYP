import React from 'react';

function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
            <p className="text-gray-500 mt-1">Manage your orders and discover new services.</p>
          </div>

          <button className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
            Browse Services
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h3 className="text-3xl font-bold mt-2">24</h3>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Active Orders</p>
            <h3 className="text-3xl font-bold mt-2">3</h3>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Completed</p>
            <h3 className="text-3xl font-bold mt-2">21</h3>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500">Total Spent</p>
            <h3 className="text-3xl font-bold mt-2">$1,240</h3>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <section className="lg:col-span-2 bg-white rounded-xl border">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">Recent Orders</h3>

              <button className="text-sm font-medium hover:underline">View All</button>
            </div>

            <div className="divide-y">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Website Development</h4>
                  <p className="text-sm text-gray-500 mt-1">Order #ORD-1024</p>
                </div>

                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                  In Progress
                </span>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Logo Design</h4>
                  <p className="text-sm text-gray-500 mt-1">Order #ORD-1023</p>
                </div>

                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                  Completed
                </span>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SEO Optimization</h4>
                  <p className="text-sm text-gray-500 mt-1">Order #ORD-1022</p>
                </div>

                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                  Pending
                </span>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="bg-white rounded-xl border p-6">
            <h3 className="text-xl font-semibold mb-5">Quick Actions</h3>

            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50">
                🔎 Find a Service
              </button>

              <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50">
                💬 Message a Provider
              </button>

              <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50">
                ❤️ View Favorites
              </button>

              <button className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50">
                📦 Track Orders
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ClientDashboard;
