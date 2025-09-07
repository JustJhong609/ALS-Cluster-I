import { useState, useEffect } from 'react'
import { supabase, tables } from '../lib/supabase'
import { AlertCircle, Calendar, GraduationCap } from 'lucide-react'

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  // Static announcements as fallback
  const staticAnnouncements = [
    {
      id: 1,
      title: 'Enrollment Ongoing!',
      content: 'ALS Cluster 1 is now accepting enrollees for SY 2023-2024. Visit our office or fill out the online enrollment form.',
      date: 'June 15, 2023',
      type: 'enrollment',
      icon: AlertCircle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      iconColor: 'text-yellow-500'
    },
    {
      id: 2,
      title: 'Community Learning Session',
      content: 'Join our monthly community learning session on July 10, 2023 at Barangay Hall, Manolo Fortich. Topics: Financial Literacy and Basic Computer Skills.',
      date: 'June 5, 2023',
      type: 'event',
      icon: Calendar,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      iconColor: 'text-blue-500'
    },
    {
      id: 3,
      title: 'A&E Test Schedule',
      content: 'The next Alternative Learning System Accreditation and Equivalency (A&E) Test will be on August 26, 2023. Deadline for registration is July 31.',
      date: 'May 28, 2023',
      type: 'test',
      icon: GraduationCap,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      iconColor: 'text-green-500'
    }
  ]

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from(tables.ANNOUNCEMENTS)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) {
        console.log('Using static announcements as fallback')
        setAnnouncements(staticAnnouncements)
      } else {
        setAnnouncements(data || staticAnnouncements)
      }
    } catch (error) {
      console.log('Using static announcements as fallback')
      setAnnouncements(staticAnnouncements)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-als-blue-900">Announcements & Updates</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-24 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-als-blue-900">
          Announcements & Updates
        </h2>
        
        <div className="space-y-6">
          {announcements.map((announcement) => {
            const IconComponent = announcement.icon || AlertCircle
            return (
              <div
                key={announcement.id}
                className={`${announcement.bgColor || 'bg-yellow-50'} border-l-4 ${announcement.borderColor || 'border-yellow-500'} p-4`}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 ${announcement.iconColor || 'text-yellow-500'} mr-3`}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-als-blue-900 mb-2">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      {announcement.content}
                    </p>
                    <p className="text-sm text-gray-500">
                      Posted: {announcement.date || new Date(announcement.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Announcements
