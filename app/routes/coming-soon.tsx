import type { Route } from "./+types/coming-soon";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Coming Soon - Health Insurance Dave" },
    { name: "description", content: "This page is coming soon" },
  ];
}

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          We're working on something amazing. Stay tuned!
        </p>
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4"></div>
        </div>
      </div>
    </div>
  );
}


