export default function Newsletter() {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
        <form className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-r-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    );
  }