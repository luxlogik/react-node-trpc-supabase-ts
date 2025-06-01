import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_50%)]" />
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Hello World!
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Hello World!
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
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
          <div className="mt-8 w-full overflow-hidden rounded-lg border bg-muted/30 shadow-xl">
            <div className="flex h-8 items-center gap-2 border-b bg-muted/50 px-4">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <div className="ml-2 text-xs text-muted-foreground">
                Hello World!
              </div>
            </div>
            <div className="relative aspect-video w-full bg-background/95 p-4">
              <div className="grid h-full grid-cols-12 gap-4">
                <div className="col-span-2 rounded-md border border-border/50 bg-muted/20">
                  <div className="border-b p-2 text-xs font-medium">Files</div>
                  <div className="p-2 text-xs text-muted-foreground">
                    <div className="rounded px-1 py-0.5 hover:bg-accent">
                      src/
                    </div>
                    <div className="rounded px-1 py-0.5 hover:bg-accent">
                      - app/
                    </div>
                    <div className="rounded bg-accent px-1 py-0.5 text-accent-foreground">
                      - - page.tsx
                    </div>
                    <div className="rounded px-1 py-0.5 hover:bg-accent">
                      - components/
                    </div>
                    <div className="rounded px-1 py-0.5 hover:bg-accent">
                      public/
                    </div>
                    <div className="rounded px-1 py-0.5 hover:bg-accent">
                      package.json
                    </div>
                  </div>
                </div>
                <div className="col-span-7 rounded-md border border-border/50 bg-muted/20 p-2">
                  <div className="text-xs leading-relaxed"> 
                  </div>
                </div>
                <div className="col-span-3 rounded-md border border-border/50 bg-muted/20">
                  <div className="border-b p-2 text-xs font-medium">
                    Terminal
                  </div>
                  <div className="p-2 text-xs text-muted-foreground">
                    <div>$ npm run dev</div>
                    <div className="text-green-500">{'> Ready in 0.8s'}</div>
                    <div>{'> Local: http://localhost:3000'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
