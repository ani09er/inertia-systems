import AnimatedSection from "../components/AnimatedSection";

const Terms = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-primary tracking-widest mb-4">LEGAL</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold">TERMS OF SERVICE</h1>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="panel-glass rounded-lg p-8 max-w-3xl mx-auto">
            <div className="space-y-6 text-sm text-muted-foreground">
              <section>
                <h3 className="font-display text-foreground text-lg mb-2">Acceptance of Terms</h3>
                <p>By downloading, installing, or using INERTIA DEBT, you agree to these Terms of Service. If you do not agree, do not use the application.</p>
              </section>

              <section>
                <h3 className="font-display text-foreground text-lg mb-2">License</h3>
                <p>SOHAN COMPUTER STORE (SCS) grants you a limited, non-exclusive, non-transferable license to use INERTIA DEBT for personal, non-commercial purposes.</p>
              </section>

              <section>
                <h3 className="font-display text-foreground text-lg mb-2">Intellectual Property</h3>
                <p>All content, mechanics, visual assets, and code within INERTIA DEBT are the intellectual property of SOHAN COMPUTER STORE (SCS). Unauthorized reproduction or distribution is prohibited.</p>
              </section>

              <section>
                <h3 className="font-display text-foreground text-lg mb-2">User Conduct</h3>
                <p>Users agree not to reverse-engineer, decompile, or attempt to extract source code from the application. Modification or redistribution of the application is strictly prohibited.</p>
              </section>

              <section>
                <h3 className="font-display text-foreground text-lg mb-2">Disclaimer</h3>
                <p>INERTIA DEBT is provided "as is" without warranties of any kind. SCS is not liable for any damages arising from use of the application.</p>
              </section>

              <section>
                <h3 className="font-display text-foreground text-lg mb-2">Modifications</h3>
                <p>SCS reserves the right to modify these terms at any time. Continued use of the application constitutes acceptance of updated terms.</p>
              </section>

              <section>
                <h3 className="font-display text-foreground text-lg mb-2">Governing Law</h3>
                <p>These terms are governed by the laws of India. Any disputes shall be resolved in the appropriate courts of India.</p>
              </section>

              <p className="text-xs text-muted-foreground/60 pt-4">Last updated: January 2025</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Terms;
