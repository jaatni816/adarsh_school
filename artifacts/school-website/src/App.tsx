import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import ChatBot from './components/ChatBot';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Gallery from './pages/Gallery';
import Faculty from './pages/Faculty';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center flex-col pt-[120px]">
      <h1 className="text-5xl font-bold text-primary font-serif mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found</p>
      <a href="/" className="px-6 py-2 bg-secondary text-white rounded-md font-semibold hover:bg-secondary/90 transition-colors">Return to Home</a>
    </div>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex flex-col">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/academics" component={Academics} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/faculty" component={Faculty} />
              <Route path="/admissions" component={Admissions} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
        <ChatBot />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
