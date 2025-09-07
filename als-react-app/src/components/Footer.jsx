const Footer = () => {
  return (
    <footer className="bg-als-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <img src="/ALSLOGO.png" alt="ALS Logo" className="h-12" />
              <img src="/BUKIDNONOLOGO.png" alt="Bukidnon Logo" className="h-12" />
              <div>
                <h2 className="font-bold text-lg">ALS Cluster I</h2>
                <p className="text-xs text-als-yellow-400">
                  Manolo Fortich, Libona, Baungon, Malitbog
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm mb-2">
              Department of Education - Alternative Learning System
            </p>
            <p className="text-xs text-gray-300">
              © {new Date().getFullYear()} ALS Cluster 1. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
