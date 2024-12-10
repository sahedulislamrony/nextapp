"use client";

export default function Error() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-4 space-y-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          Error
        </h1>
        <p className="text-center text-gray-800 dark:text-white">
          Something went wrong. Please try again.
        </p>
      </div>
    </div>
  );
}
