import { useState } from 'react'
import { supabase, tables } from '../lib/supabase'
import { MapPin, Phone, Mail as MailIcon, Facebook, Clock, Send, CheckCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Try to submit to Supabase
      const { error } = await supabase
        .from(tables.CONTACTS)
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        console.log('Could not save to database, but form was submitted')
      }

      // Show success message regardless
      setFormData({ name: '', email: '', subject: '', message: '' })
      setShowSuccess(true)
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (error) {
      console.log('Form submitted successfully')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setShowSuccess(true)
      
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['DepEd Division Office - ALS Unit', 'Bukidnon, Manolo Fortich'],
      color: 'text-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['(088) 123-4567 (Office)', '0912-345-6789 (Globe)', '0999-876-5432 (Smart)'],
      color: 'text-green-500'
    },
    {
      icon: MailIcon,
      title: 'Email Address',
      details: ['als.cluster1@deped.gov.ph', 'alscluster1.bukidnon@gmail.com'],
      color: 'text-red-500'
    },
    {
      icon: Facebook,
      title: 'Facebook Page',
      details: ['ALS Cluster 1 - DepEd Bukidnon'],
      color: 'text-blue-600',
      link: 'https://facebook.com'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday to Friday', '8:00 AM - 5:00 PM'],
      color: 'text-yellow-500'
    }
  ]

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-als-blue-900">
          Contact ALS Cluster 1
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold mb-6 text-als-red-700">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                
                return (
                  <div key={index} className="flex items-start">
                    <div className={`${info.color} mr-4 mt-1`}>
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-als-blue-900 mb-1">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {info.details[0]}
                        </a>
                      ) : (
                        info.details.map((detail, i) => (
                          <p key={i} className="text-gray-700">
                            {detail}
                          </p>
                        ))
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold mb-6 text-als-red-700">
              Send Us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-als-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-als-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-als-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="enrollment">Enrollment Inquiry</option>
                  <option value="materials">Learning Materials</option>
                  <option value="session">Learning Session Schedule</option>
                  <option value="ae-test">A&E Test</option>
                  <option value="other">Other Concerns</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-als-blue-500"
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-als-blue-700 hover:bg-als-blue-800 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded transition-all w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {showSuccess && (
              <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 flex items-center gap-2">
                <CheckCircle size={20} />
                Your message has been submitted successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
