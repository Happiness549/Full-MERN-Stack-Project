<div className="max-w-3xl mx-auto">

  <h1 className="text-3xl font-bold mb-6 text-center">Lost & Found</h1>

  {isLoggedIn ? (
    <>
      <ItemForm fetchItems={fetchItems} />

      
      <input
        type="text"
        placeholder="Search by item title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border p-2 rounded flex-1"
        >
          <option value="">All Types</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded flex-1"
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="returned">Returned</option>
        </select>
      </div>

      {/* Item List */}
      {!loading && <ItemList items={filteredItems} fetchItems={fetchItems} />}
    </>
  ) : (
    <div className="mb-6 p-4 bg-yellow-100 rounded shadow text-center">
      <p>
        Please{" "}
        <Link to="/login" className="text-blue-500 underline font-semibold">
          login
        </Link>{" "}
        to add items and see all listings.
      </p>
    </div>
  )}

  
  <section className="mt-10 p-4 bg-white rounded shadow">
    <h2 className="text-2xl font-bold mb-2">About Us</h2>
    <p>Welcome to the Lost & Found app! We help you recover lost items and manage found belongings safely.</p>
  </section>

  <section className="mt-6 p-4 bg-white rounded shadow">
    <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
    <p>For support or questions, contact us:</p>
    <ul className="mt-2 list-disc list-inside">
      <li>Email: support@lostfoundapp.com</li>
      <li>Phone: +27 123 456 789</li>
    </ul>
  </section>

</div>
