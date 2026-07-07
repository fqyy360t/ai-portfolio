import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div>
      <NavBar />
      <Hero 
        title="关于我" 
        subtitle="了解更多关于我的技术背景和专业技能"
      />
      <About />
      <Footer />
    </div>
  )
}