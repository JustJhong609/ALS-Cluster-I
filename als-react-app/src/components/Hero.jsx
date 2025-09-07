import { Download, FileText, Mail } from 'lucide-react'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="hero-bg text-white pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Bukidnon ALS Cluster 1
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Empowering Lifelong Learners
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => scrollToSection('materials')}
            className="btn-primary flex items-center gap-2"
          >
            <Download size={20} />
            Download Materials
          </button>
          <button
            onClick={() => scrollToSection('forms')}
            className="btn-secondary flex items-center gap-2"
          >
            <FileText size={20} />
            Google Forms
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-outline flex items-center gap-2"
          >
            <Mail size={20} />
            Contact Us
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
