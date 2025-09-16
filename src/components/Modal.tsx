import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExternalLinkAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { skillsData, projectsData, testimonialsData, servicesData, contactInfo } from '../data/portfolioData';

interface ModalProps {
  isOpen: boolean;
  content: any;
  onClose: () => void;
}

export const Modal = ({ isOpen, content, onClose }: ModalProps) => {
  if (!isOpen || !content) return null;

  const renderContent = () => {
    switch (content.title) {
      case 'About':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full gradient-primary p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <FontAwesomeIcon icon={faStar} className="text-4xl text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">About Me</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I'm a passionate full-stack developer with over 5 years of experience creating 
                beautiful, functional web applications. I specialize in React, Node.js, and 
                modern web technologies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {servicesData.map((service) => (
                <div key={service.id} className="glass-effect rounded-xl p-6 text-center">
                  <div className="text-2xl text-primary mb-4">
                    <FontAwesomeIcon icon={service.icon === 'code' ? faStar : faStar} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-1 text-sm">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-muted-foreground">{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Skills':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
              <p className="text-lg text-muted-foreground">
                My expertise spans across modern web technologies and frameworks
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {skillsData.map((skill, index) => (
                <div key={index} className="glass-effect rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{skill.name}</h3>
                      <span className="text-sm text-muted-foreground">{skill.category}</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="gradient-primary h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Projects':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-muted-foreground">
                A selection of my recent work and personal projects
              </p>
            </div>
            
            <div className="grid gap-8">
              {projectsData.map((project) => (
                <div key={project.id} className="glass-effect rounded-xl overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        <a 
                          href={project.github} 
                          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                        >
                          <FontAwesomeIcon icon={faGithub} />
                          <span>Code</span>
                        </a>
                        <a 
                          href={project.live} 
                          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                          <span>Live Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Testimonials':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
              <p className="text-lg text-muted-foreground">
                What my clients say about working with me
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className="glass-effect rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Contact':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-lg text-muted-foreground">
                Ready to work together? Let's discuss your next project
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <strong>Email:</strong>
                      <a href={`mailto:${contactInfo.email}`} className="block text-primary hover:text-primary/80">
                        {contactInfo.email}
                      </a>
                    </div>
                    <div>
                      <strong>Phone:</strong>
                      <a href={`tel:${contactInfo.phone}`} className="block text-primary hover:text-primary/80">
                        {contactInfo.phone}
                      </a>
                    </div>
                    <div>
                      <strong>Location:</strong>
                      <span className="block text-muted-foreground">{contactInfo.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
                  <div className="flex space-x-4">
                    <a href={contactInfo.social.github} className="text-2xl text-primary hover:text-primary/80 transition-colors">
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href={contactInfo.social.linkedin} className="text-2xl text-primary hover:text-primary/80 transition-colors">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href={contactInfo.social.twitter} className="text-2xl text-primary hover:text-primary/80 transition-colors">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Send Message</h3>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors"
                  />
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full p-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors resize-none"
                  />
                  <button 
                    type="submit" 
                    className="w-full gradient-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
            <p className="text-lg text-muted-foreground">{content.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative glass-effect rounded-3xl max-w-6xl max-h-[90vh] overflow-y-auto p-8 animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl text-muted-foreground hover:text-foreground transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        {renderContent()}
      </div>
    </div>
  );
};