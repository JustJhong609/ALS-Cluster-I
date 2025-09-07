import { useState, useEffect } from 'react'
import { supabase, tables } from '../lib/supabase'
import { Mail } from 'lucide-react'

const About = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  // Static teacher data as fallback
  const staticTeachers = [
    {
      id: 1,
      name: 'Alferdo G. De los Santos',
      position: 'EPS II - ALS BUKIDNON',
      experience: '20 years of ALS teaching experience',
      image: '/SIRgigi2.jpg',
      email: 'alferdo.delossantos@deped.gov.ph'
    },
    {
      id: 2,
      name: 'Juan Dela Cruz',
      position: 'ALS Teacher - Manolo Fortich I',
      specialization: 'Specializes in Elementary Level',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      email: 'juan.delacruz@deped.gov.ph'
    },
    {
      id: 3,
      name: 'Ana Reyes',
      position: 'ALS Teacher - Malitbog I',
      specialization: 'Specializes in Secondary Level',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      email: 'ana.reyes@deped.gov.ph'
    },
    {
      id: 4,
      name: 'Pedro Bautista',
      position: 'Community Facilitator',
      specialization: 'Outreach and Community Engagement',
      image: 'https://randomuser.me/api/portraits/men/71.jpg',
      email: 'pedro.bautista@deped.gov.ph'
    }
  ]

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from(tables.TEACHERS)
        .select('*')
        .order('order_index', { ascending: true })

      if (error) {
        setTeachers(staticTeachers)
      } else {
        setTeachers(data || staticTeachers)
      }
    } catch (error) {
      setTeachers(staticTeachers)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-als-blue-900">
          About ALS Cluster 1
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold mb-4 text-als-red-700">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              To provide all Filipinos the chance to have access to complete basic education through a viable alternative learning system that is relevant to their needs and within the context of their lives, their communities, and their environment.
            </p>
            
            <h3 className="text-2xl font-bold mb-4 text-als-red-700">Our Vision</h3>
            <p className="text-gray-700 mb-6">
              ALS Cluster 1 envisions literate, skilled, and self-reliant citizens who actively participate in community development and nation-building.
            </p>
            
            <h3 className="text-2xl font-bold mb-4 text-als-red-700">Coverage Area</h3>
            <p className="text-gray-700">
              ALS Cluster 1 serves the municipalities of Manolo Fortich, Libona, Baungon, and Malitbog, providing alternative learning opportunities to out-of-school youth and adults.
            </p>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden shadow-lg rounded-lg" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.9943838686486!2d125.11499416492886!3d8.162841780206133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ffa9ae356a2251%3A0x5a6b78ba44230eee!2sDepartment%20of%20Education-%20Division%20of%20Bukidnon!5e1!3m2!1sen!2sph!4v1755489382893!5m2!1sen!2sph"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DepEd Division of Bukidnon Location"
              ></iframe>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              DepEd Division of Bukidnon - ALS Office
            </p>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-6 text-center text-als-blue-900">
          Meet Our Team
        </h3>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-300"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-1"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white p-6 rounded-lg shadow-md text-center card-hover"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-als-yellow-500">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-als-blue-900 mb-1">
                  {teacher.name}
                </h4>
                <p className="text-als-red-700 mb-2">{teacher.position}</p>
                <p className="text-gray-600 text-sm mb-3">
                  {teacher.experience || teacher.specialization}
                </p>
                <div className="mt-3">
                  <a
                    href={`mailto:${teacher.email}`}
                    className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                  >
                    <Mail size={16} />
                    Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <button className="inline-block bg-als-blue-700 hover:bg-als-blue-800 text-white font-bold py-3 px-6 rounded transition-all">
            View All Cluster I ALS Teachers
          </button>
        </div>
      </div>
    </section>
  )
}

export default About
