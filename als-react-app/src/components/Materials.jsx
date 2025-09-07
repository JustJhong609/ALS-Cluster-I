import { useState, useEffect } from 'react'
import { supabase, tables } from '../lib/supabase'
import { Download, Book, Flask, Calculator, Briefcase, Users, Laptop } from 'lucide-react'

const Materials = () => {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)

  // Static materials as fallback
  const staticMaterials = {
    elementary: [
      {
        id: 1,
        title: 'LS 1: Communication Skills',
        description: 'Develops listening, speaking, reading, and writing skills to communicate effectively.',
        icon: Book,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-700',
        downloadUrl: 'https://drive.google.com/'
      },
      {
        id: 2,
        title: 'LS 2: Scientific Literacy',
        description: 'Introduces basic science concepts and encourages curiosity and problem-solving.',
        icon: Flask,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-700',
        downloadUrl: 'https://drive.google.com/'
      },
      {
        id: 3,
        title: 'LS 3: Mathematical Skills',
        description: 'Builds numeracy, logical reasoning, and everyday math application.',
        icon: Calculator,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-700',
        downloadUrl: 'https://drive.google.com/'
      },
      {
        id: 4,
        title: 'LS 4: Life and Career Skills',
        description: 'Focuses on self-management, social skills, and preparation for simple work tasks.',
        icon: Briefcase,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-700',
        downloadUrl: 'https://drive.google.com/'
      },
      {
        id: 5,
        title: 'LS 5: Understanding the Self',
        description: 'Promotes awareness of self, family, community, and basic citizenship.',
        icon: Users,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-700',
        downloadUrl: 'https://drive.google.com/'
      },
      {
        id: 6,
        title: 'LS 6: Digital Citizenship',
        description: 'Encourages safe, responsible, and effective use of digital tools.',
        icon: Laptop,
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-700',
        downloadUrl: 'https://drive.google.com/'
      }
    ],
    secondary: [
      {
        id: 7,
        title: 'LS 1: Communication Skills',
        description: 'Enhances comprehension, writing, and critical communication skills.',
        icon: Book,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-700',
        downloadUrl: 'https://drive.google.com/'
      },
      {
        id: 8,
        title: 'LS 2: Scientific Literacy',
        description: 'Explores deeper science concepts, evidence-based reasoning, and environmental awareness.',
        icon: Flask,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-700',
        downloadUrl: 'https://drive.google.com/'
      },
      {
        id: 9,
        title: 'LS 3: Mathematical Skills',
        description: 'Strengthens higher-level numeracy and practical applications of mathematics.',
        icon: Calculator,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-700',
        downloadUrl: 'https://drive.google.com/'
      },
      {
        id: 10,
        title: 'LS 4: Life and Career Skills',
        description: 'Prepares learners for work, entrepreneurship, and decision-making.',
        icon: Briefcase,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-700',
        downloadUrl: 'https://drive.google.com/'
      },
      {
        id: 11,
        title: 'LS 5: Understanding the Self',
        description: 'Builds values, cultural awareness, and civic responsibility.',
        icon: Users,
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-700',
        downloadUrl: 'https://drive.google.com/'
      },
      {
        id: 12,
        title: 'LS 6: Digital Citizenship',
        description: 'Advances ICT skills, responsible use of technology, and digital literacy.',
        icon: Laptop,
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-700',
        downloadUrl: 'https://drive.google.com/'
      }
    ]
  }

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from(tables.MATERIALS)
        .select('*')
        .order('level', { ascending: true })

      if (error) {
        setMaterials(staticMaterials)
      } else {
        // Group materials by level
        const groupedMaterials = {
          elementary: data?.filter(m => m.level === 'elementary') || staticMaterials.elementary,
          secondary: data?.filter(m => m.level === 'secondary') || staticMaterials.secondary
        }
        setMaterials(groupedMaterials)
      }
    } catch (error) {
      setMaterials(staticMaterials)
    } finally {
      setLoading(false)
    }
  }

  const MaterialCard = ({ material }) => {
    const IconComponent = material.icon || Book
    
    return (
      <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden card-hover">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`${material.iconBg} p-3 rounded-full mr-4`}>
              <IconComponent className={`${material.iconColor} text-xl`} size={24} />
            </div>
            <h4 className="text-xl font-bold text-als-blue-900">{material.title}</h4>
          </div>
          <p className="text-gray-600 mb-4">{material.description}</p>
          <a
            href={material.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <section id="materials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-als-blue-900">
            Downloadable Learning Materials
          </h2>
          <div className="space-y-12">
            {[1, 2].map((section) => (
              <div key={section}>
                <div className="h-8 bg-gray-300 rounded mb-6 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-48 animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="materials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-als-blue-900">
          Downloadable Learning Materials
        </h2>
        
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-als-red-700 border-b-2 border-als-yellow-500 pb-2">
            Learning Activity Sheets (LAS) - Elementary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.elementary?.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-als-red-700 border-b-2 border-als-yellow-500 pb-2">
            Learning Activity Sheets (LAS) - Secondary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.secondary?.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-6 text-als-red-700 border-b-2 border-als-yellow-500 pb-2">
            Basic Literacy Program (BLP) Modules
          </h3>
          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                The BLP is for learners who are non-literate or have very limited literacy and numeracy skills.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                <li>Focus: Reading, writing, and basic math</li>
                <li>Daily life skills</li>
                <li>Foundation for entering ALS Elementary Level</li>
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((moduleNum) => (
                  <a
                    key={moduleNum}
                    href="https://drive.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-center inline-flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Module {moduleNum}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Materials
