"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Recycle,
  Smartphone,
  Laptop,
  Monitor,
  Leaf,
  Globe,
  Users,
  Target,
  Eye,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
} from "lucide-react"

export default function EWasteRecyclingWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "why-recycle", "how-it-works", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-green-100 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-green-800">EcoRecycle</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "Who We Are" },
                { id: "why-recycle", label: "Why Recycle" },
                { id: "how-it-works", label: "How It Works" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-green-600 ${
                    activeSection === item.id ? "text-green-600 border-b-2 border-green-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-green-100">
              <div className="flex flex-col space-y-2 pt-4 pr-4">
                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "Who We Are" },
                  { id: "why-recycle", label: "Why Recycle" },
                  { id: "how-it-works", label: "How It Works" },
                  { id: "contact", label: "Contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-right py-2 text-gray-700 hover:text-green-600 transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-green-800 mb-6 leading-tight">
              Recycle Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 animate-pulse">
                {" "}
                E-Waste
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join the movement to protect our planet by responsibly recycling electronic waste. Together, we can create
              a sustainable future.
            </p>
          </div>

          {/* Animated Icons */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="animate-bounce-slow">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors duration-300 cursor-pointer group">
                <Smartphone className="w-10 h-10 text-green-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="animate-bounce-slow" style={{ animationDelay: "0.2s" }}>
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center hover:bg-emerald-200 transition-colors duration-300 cursor-pointer group">
                <Laptop className="w-10 h-10 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="animate-bounce-slow" style={{ animationDelay: "0.4s" }}>
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200 transition-colors duration-300 cursor-pointer group">
                <Monitor className="w-10 h-10 text-teal-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Recycling Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Who We Are</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are passionate environmental advocates dedicated to making electronic waste recycling accessible and
              impactful.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-green-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To revolutionize electronic waste management by providing convenient, secure, and environmentally
                  responsible recycling solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-green-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  A world where electronic waste is completely eliminated through innovative recycling practices and
                  sustainable technology design.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-green-100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">Our Team</h3>
                <p className="text-gray-600">
                  Environmental scientists, technology experts, and sustainability advocates working together to create
                  positive environmental impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Recycle E-Waste Section */}
      <section id="why-recycle" className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Why Recycle E-Waste?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Electronic waste is one of the fastest-growing waste streams globally. Here's why recycling matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Protect Our Planet",
                description: "Prevent toxic materials from contaminating soil and water sources.",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: Recycle,
                title: "Recover Valuable Materials",
                description: "Extract precious metals and rare earth elements for reuse.",
                color: "from-emerald-500 to-teal-600",
              },
              {
                icon: Leaf,
                title: "Reduce Carbon Footprint",
                description: "Lower greenhouse gas emissions through responsible disposal.",
                color: "from-teal-500 to-green-600",
              },
              {
                icon: CheckCircle,
                title: "Data Security",
                description: "Ensure complete data destruction and privacy protection.",
                color: "from-green-600 to-emerald-700",
              },
              {
                icon: Users,
                title: "Create Jobs",
                description: "Support the growing green economy and sustainable employment.",
                color: "from-emerald-600 to-teal-700",
              },
              {
                icon: Target,
                title: "Legal Compliance",
                description: "Meet environmental regulations and corporate responsibility.",
                color: "from-teal-600 to-green-700",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-green-100"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 4-step process makes e-waste recycling easy and secure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Schedule Pickup",
                description: "Book a convenient pickup time through our online platform.",
                icon: Phone,
              },
              {
                step: "02",
                title: "Secure Collection",
                description: "Our certified team collects your devices with proper handling.",
                icon: CheckCircle,
              },
              {
                step: "03",
                title: "Data Destruction",
                description: "Complete data wiping and destruction with certification.",
                icon: Target,
              },
              {
                step: "04",
                title: "Responsible Recycling",
                description: "Materials are processed using environmentally safe methods.",
                icon: Recycle,
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-green-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start recycling? Get in touch with our team today.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl border-green-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-green-800 mb-6">Send us a message</h3>
                <form className="space-y-6">
                  <div>
                    <Input
                      placeholder="Your Name"
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={5}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <Card className="shadow-xl border-green-100">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-green-800 mb-6">Get in touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Email</p>
                        <p className="text-gray-600">info@ecorecycle.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Phone</p>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">Address</p>
                        <p className="text-gray-600">123 Green Street, Eco City, EC 12345</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="shadow-xl border-green-100">
                <CardContent className="p-0">
                  <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-green-600 mx-auto mb-2" />
                      <p className="text-green-800 font-semibold">Interactive Map</p>
                      <p className="text-gray-600 text-sm">Find our location</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-green-800" />
                </div>
                <span className="text-xl font-bold">EcoRecycle</span>
              </div>
              <p className="text-green-100">
                Leading the way in sustainable electronic waste recycling for a cleaner tomorrow.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-green-100">
                <li>Device Collection</li>
                <li>Data Destruction</li>
                <li>Material Recovery</li>
                <li>Certification</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-green-100">
                <li>About Us</li>
                <li>Our Process</li>
                <li>Sustainability</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-green-100">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Resources</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
            <p>&copy; 2024 EcoRecycle. All rights reserved. Building a sustainable future together.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
