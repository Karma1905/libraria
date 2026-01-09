import { BookOpen, Code, Heart, Users } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const About = () => {
  const techStack = [
    { name: 'React', description: 'UI Library' },
    { name: 'TypeScript', description: 'Type Safety' },
    { name: 'Tailwind CSS', description: 'Styling' },
    { name: 'React Query', description: 'Data Fetching' },
    { name: 'React Router', description: 'Navigation' },
    { name: 'Vite', description: 'Build Tool' },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Rich Catalog',
      description: 'Browse thousands of books across multiple categories and genres.',
    },
    {
      icon: Users,
      title: 'Community Reviews',
      description: 'Read authentic reviews from fellow book lovers to guide your choices.',
    },
    {
      icon: Heart,
      title: 'Personalized',
      description: 'Get recommendations tailored to your reading preferences.',
    },
    {
      icon: Code,
      title: 'Modern Tech',
      description: 'Built with cutting-edge web technologies for the best experience.',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'About' }]} className="mb-6" />

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            About Libraria
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Libraria is a modern book discovery platform designed to help readers find their next 
            favorite read. Our mission is to connect book lovers with stories that inspire, 
            educate, and entertain.
          </p>
        </div>

        {/* Features */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground text-center mb-10">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-lg p-6 shadow-soft text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 bg-primary/10 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-card rounded-2xl p-8 lg:p-12">
          <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground text-center mb-4">
            Built With Modern Technology
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            This frontend-only application demonstrates modern web development practices 
            with a focus on performance, accessibility, and developer experience.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="bg-background rounded-lg p-4 text-center shadow-soft animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <p className="font-semibold text-foreground">{tech.name}</p>
                <p className="text-xs text-muted-foreground">{tech.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Project Info */}
        <section className="mt-16 text-center">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
            Project Architecture
          </h2>
          <div className="max-w-2xl mx-auto text-muted-foreground space-y-4">
            <p>
              This application uses a component-based architecture with mock data 
              simulating API responses. The codebase is structured to allow easy 
              integration with real backend services.
            </p>
            <p>
              Key features include client-side routing, data fetching with caching, 
              responsive design, skeleton loading states, and accessible UI components.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
