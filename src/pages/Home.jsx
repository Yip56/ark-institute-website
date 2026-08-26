import Hero from '../components/home/Hero'
import ProgramCards from '../components/home/ProgramCards'
import InstructorTeaser from '../components/home/InstructorTeaser'
import Testimonials from '../components/home/Testimonials'
import CTABanner from '../components/shared/CTABanner'

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramCards />
      <InstructorTeaser />
      <Testimonials />
      <CTABanner
        eyebrow="First Lesson Free"
        title="Start playing. Start today."
        subtitle="Book your free trial class — no commitment, no pressure. Just music."
      />
    </>
  )
}
