import { UserPlus, ClipboardCheck, HelpCircle, GraduationCap } from 'lucide-react'

const Forms = () => {
  const forms = [
    {
      id: 1,
      title: 'ALS Enrollment Form',
      description: 'For new and returning ALS learners',
      icon: UserPlus,
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-500',
      url: 'https://forms.google.com/'
    },
    {
      id: 2,
      title: 'Learning Session Evaluation',
      description: 'Feedback for ALS teachers and sessions',
      icon: ClipboardCheck,
      iconColor: 'text-green-500',
      borderColor: 'border-green-500',
      url: 'https://forms.google.com/'
    },
    {
      id: 3,
      title: 'Needs Assessment Survey',
      description: 'Help us understand community learning needs',
      icon: HelpCircle,
      iconColor: 'text-yellow-500',
      borderColor: 'border-yellow-500',
      url: 'https://forms.google.com/'
    },
    {
      id: 4,
      title: 'A&E Test Registration',
      description: 'Register for the Accreditation & Equivalency Test',
      icon: GraduationCap,
      iconColor: 'text-red-500',
      borderColor: 'border-red-500',
      url: 'https://forms.google.com/'
    }
  ]

  const handleFormClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="forms" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-als-blue-900">
          Online Forms
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-700 mb-8">
            Access our online forms for enrollment, surveys, and evaluations. 
            Click on any of the buttons below to be directed to the corresponding Google Form.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forms.map((form) => {
              const IconComponent = form.icon
              
              return (
                <button
                  key={form.id}
                  onClick={() => handleFormClick(form.url)}
                  className={`bg-white p-6 rounded-lg shadow-md text-center card-hover border-l-4 ${form.borderColor} w-full text-left`}
                >
                  <div className={`${form.iconColor} mb-4 flex justify-center`}>
                    <IconComponent size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-als-blue-900 mb-2">
                    {form.title}
                  </h3>
                  <p className="text-gray-600">{form.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Forms
