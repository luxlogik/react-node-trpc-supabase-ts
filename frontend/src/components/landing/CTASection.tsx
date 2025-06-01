import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="border-t bg-muted/40 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Transform Your World?
          </h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Join thousands of users who are already using Hello World!
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/docs">
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
