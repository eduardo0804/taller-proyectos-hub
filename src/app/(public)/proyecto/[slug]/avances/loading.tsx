import { TrendingUp } from "lucide-react";

export default function LoadingAdvances() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-pulse">
      
      {/* Skeleton del Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-center">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-4 bg-gray-200 rounded-full w-48"></div>
          <div className="h-12 bg-gray-200 rounded-xl w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-full w-full max-w-xl"></div>
          <div className="h-4 bg-gray-200 rounded-full w-5/6 max-w-xl"></div>
        </div>

        {/* Skeleton Card Porcentaje */}
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center justify-center h-48">
          <TrendingUp className="w-12 h-12 text-gray-200 mb-4" />
          <div className="w-24 h-8 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Skeleton de las Tarjetas de Reporte */}
      <div className="space-y-12">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-100 h-24 w-full"></div>
            <div className="p-8 space-y-6">
              <div className="h-4 bg-gray-200 rounded-full w-full"></div>
              <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="h-32 bg-gray-50 rounded-xl"></div>
                <div className="h-32 bg-gray-50 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}