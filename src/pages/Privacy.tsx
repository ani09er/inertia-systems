import AnimatedSection from "../components/AnimatedSection";

const Privacy = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-primary tracking-widest mb-4">LEGAL</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold">PRIVACY POLICY</h1>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto prose-sm">
            <div className="space-y-6 text-sm text-muted-foreground">
              <section>
                <h3 className="font-display text-foreground text-lg mb-2">Overview</h3>
                <p>SOHAN COMPUTER STORE (SCS) is committed to protecting user privacy. This policy outlines how we handle information in connection with INERTIA DEBT.</p>
              </section>

              <section>
                <h3 className="font-display text-foreground text-lg mb-2">Offline Functionality</h3>
                <p>INERTIA DEBT is designed to function primarily offline. Core gameplay does not require an internet connection and no personal data is transmitted during gameplay sessions.</p>
              </section>

              <section>
                <h3 className="font-display text-foreground text-lg mb-2">Data Collection</h3>
                <p>We do not collect, store, or transmit personal information. No accounts are required. No analytics tracking is embedded in the application beyond standard platform metrics provided by Google Play.</p>
              </section>

              <section>
                <h3 className="font-display text-foreground text-lg mb-2">No Data Selling</h3>
                <p>We do not sell, trade, or otherwise transfer personal data to third parties. This is a firm policy of SOHAN COMPUTER STORE.</p>
              </section>

              <section>
                <h3 className="font-display text-foreground text-lg mb-2">Platform Compliance</h3>
                <p>INERTIA DEBT complies with Google Play Developer Program Policies, including data handling, content guidelines, and user privacy requirements.</p>
              </section>

              <section>
                <h3 className="font-display text-foreground text-lg mb-2">Contact</h3>
                <p>For privacy-related inquiries, contact us at contact@scsstudio.com.</p>
              </section>

              <p className="text-xs text-muted-foreground/60 pt-4">Last updated: January 2025</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Privacy;
