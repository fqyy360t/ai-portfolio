import NavBar from '@/components/NavBar'
import Hero from '@/components/Hero'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <div>
      <NavBar />
      <Hero 
        title="联系方式" 
        subtitle="Contact"
        description="欢迎随时联系我，一起探讨 AI 的无限可能。"
      />
      <Contact />
      <Footer />
    </div>
  )
}